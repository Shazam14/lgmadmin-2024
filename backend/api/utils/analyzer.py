# api/utils/analyzer.py
from django.apps import apps
import inspect
from rest_framework import serializers, viewsets, views
from pathlib import Path


def analyze_app_structure():
    """Analyze serializers and views for each app"""
    analysis = {}

    relevant_apps = [
        'parents', 'students', 'portal', 'grades',
        'applicants', 'courses', 'enrollments'
    ]

    for app_label in relevant_apps:
        try:
            app = apps.get_app_config(app_label)

            try:
                serializer_module = __import__(
                    f"{app.name}.serializers", fromlist=['*'])
            except ImportError:
                serializer_module = None

            try:
                views_module = __import__(f"{app.name}.views", fromlist=['*'])
            except ImportError:
                views_module = None

            app_analysis = {
                'models': {},
                'serializers': {},
                'views': {},
            }

            # Analyze models
            for model in app.get_models():
                model_name = model._meta.model_name
                app_analysis['models'][model_name] = {
                    'fields': [f.name for f in model._meta.fields],
                    'relationships': [
                        {
                            'field': rel.name,
                            'model': rel.related_model._meta.model_name
                        }
                        for rel in model._meta.related_objects
                    ]
                }

            # Analyze serializers
            if serializer_module:
                for name, obj in inspect.getmembers(serializer_module):
                    if (inspect.isclass(obj) and
                        issubclass(obj, serializers.Serializer) and
                            obj != serializers.Serializer):

                        fields = {}
                        if hasattr(obj, 'Meta'):
                            if hasattr(obj.Meta, 'model'):
                                fields['model'] = obj.Meta.model._meta.model_name
                            if hasattr(obj.Meta, 'fields'):
                                fields['fields'] = obj.Meta.fields
                            if hasattr(obj.Meta, 'exclude'):
                                fields['exclude'] = obj.Meta.exclude

                        app_analysis['serializers'][name] = fields

            # Analyze views
            if views_module:
                for name, obj in inspect.getmembers(views_module):
                    if (inspect.isclass(obj) and
                        (issubclass(obj, viewsets.ViewSet) or
                         issubclass(obj, views.APIView))):

                        view_info = {
                            'type': obj.__base__.__name__,
                            'methods': [],
                            'serializer_class': None,
                            'queryset_model': None,
                        }

                        # Get methods
                        for method_name, method in inspect.getmembers(obj):
                            if inspect.isfunction(method) and not method_name.startswith('_'):
                                view_info['methods'].append(method_name)

                        # Get serializer class
                        if hasattr(obj, 'serializer_class'):
                            view_info['serializer_class'] = obj.serializer_class.__name__

                        # Get queryset model
                        if hasattr(obj, 'queryset') and obj.queryset is not None:
                            view_info['queryset_model'] = obj.queryset.model._meta.model_name

                        app_analysis['views'][name] = view_info

            analysis[app_label] = app_analysis

        except Exception as e:
            print(f"Error analyzing {app_label}: {str(e)}")
            continue

    return analysis


def generate_markdown_report(analysis):
    """Generate a Markdown report from the analysis"""
    md = ["# LGMS API Structure Analysis\n"]

    for app_name, app_data in analysis.items():
        md.append(f"\n## {app_name.title()} App\n")

        # Models
        if app_data['models']:
            md.append("\n### Models\n")
            for model_name, model_info in app_data['models'].items():
                md.append(f"\n#### {model_name}\n")
                md.append("**Fields:**\n")
                for field in model_info['fields']:
                    md.append(f"- {field}")

                if model_info['relationships']:
                    md.append("\n**Relationships:**\n")
                    for rel in model_info['relationships']:
                        md.append(f"- {rel['field']} → {rel['model']}")

        # Serializers
        if app_data['serializers']:
            md.append("\n### Serializers\n")
            for serializer_name, serializer_info in app_data['serializers'].items():
                md.append(f"\n#### {serializer_name}\n")
                if 'model' in serializer_info:
                    md.append(f"- Model: {serializer_info['model']}")
                if 'fields' in serializer_info:
                    if serializer_info['fields'] == '__all__':
                        md.append("- Fields: All")
                    else:
                        md.append("- Fields:")
                        for field in serializer_info['fields']:
                            md.append(f"  - {field}")

        # Views
        if app_data['views']:
            md.append("\n### Views\n")
            for view_name, view_info in app_data['views'].items():
                md.append(f"\n#### {view_name}\n")
                md.append(f"- Type: {view_info['type']}")
                if view_info['serializer_class']:
                    md.append(f"- Serializer: {view_info['serializer_class']}")
                if view_info['queryset_model']:
                    md.append(f"- Model: {view_info['queryset_model']}")
                if view_info['methods']:
                    md.append("- Methods:")
                    for method in view_info['methods']:
                        md.append(f"  - {method}")

        md.append("\n---\n")

    return "\n".join(md)
