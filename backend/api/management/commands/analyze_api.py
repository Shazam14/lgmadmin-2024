# api/management/commands/analyze_api.py
from django.core.management.base import BaseCommand
from pathlib import Path
from api.utils.analyzer import analyze_app_structure, generate_markdown_report


class Command(BaseCommand):
    help = 'Analyze LGMS API structure including models, serializers, and views'

    def add_arguments(self, parser):
        parser.add_argument(
            '--output',
            default='api_analysis.md',
            help='Output file name'
        )

    def handle(self, *args, **options):
        self.stdout.write("Starting API analysis...")

        try:
            # Run analysis
            analysis = analyze_app_structure()

            # Generate markdown report
            markdown = generate_markdown_report(analysis)

            # Save to file
            output_path = Path(options['output'])
            output_path.write_text(markdown)

            self.stdout.write(
                self.style.SUCCESS(
                    f'Analysis complete! Report saved to {output_path}'
                )
            )
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(
                    f'Error during analysis: {str(e)}'
                )
            )
