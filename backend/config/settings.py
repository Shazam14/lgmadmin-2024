"""
Django settings for config project.

Generated by 'django-admin startproject' using Django 5.0.4.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.0/ref/settings/
"""

from pathlib import Path
from dotenv import load_dotenv
from datetime import timedelta
from django.conf import settings
from corsheaders.defaults import default_headers
import os
import sys

load_dotenv()  # Assuming there is a .env file in the same directory as this script

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
print("Current Python Path:", sys.path)

load_dotenv(os.path.join(BASE_DIR, ".env"))

test_var = os.getenv("TEST_VARIABLE")
print("Test Variable:", test_var)

DJANGO_ENV = os.getenv("DJANGO_ENV", "development")
dotenv_file = f".env.{DJANGO_ENV}"

dotenv_path = BASE_DIR / dotenv_file
if dotenv_path.exists():
    # Quick-start development settings - unsuitable for production
    print(f"Loading environment-specific .env file: {dotenv_file}")
    load_dotenv(dotenv_path)
else:
    print(f"No environment-specific .env file found for: {DJANGO_ENV}")
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/


# SECURITY WARNING: don't run with debug turned on in production!
SECRET_KEY = os.getenv("SECRET_KEY")
if not SECRET_KEY:
    raise ValueError("SECRET_KEY environment variable not set")
else:
    print("SECRET_KEY is set")

DEBUG = os.getenv("DEBUG", "True") == "True"

# Get the ALLOWED_HOSTS environment variable
allowed_hosts = os.getenv("ALLOWED_HOSTS")

# Convert the comma-separated string to a list
ALLOWED_HOSTS = (
    [host.strip() for host in allowed_hosts.split(",")] if allowed_hosts else []
)
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')


INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "api",
    "apps.parents",
    "apps.teachers",
    "apps.applicants",
    "apps.courses",
    "apps.enrollments",
    "apps.students",
    "apps.grades",
    "apps.announcements",
    "apps.accounts",
    "apps.portal",
    "corsheaders",
    "rest_framework",
    "oauth2_provider",
    "rest_framework_simplejwt",
    "django_extensions",
    "phonenumber_field",
]


REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": ("rest_framework.permissions.AllowAny",),
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
}

OAUTH2_PROVIDER = {
    "ACCESS_TOKEN_EXPIRE_SECONDS": 36000,
    "AUTHORIZATION_CODE_EXPIRE_SECONDS": 600,
    "CLIENT_ID_GENERATOR_CLASS": "oauth2_provider.generators.ClientIdGenerator",
    "CLIENT_SECRET_GENERATOR_CLASS": "oauth2_provider.generators.ClientSecretGenerator",
    "REFRESH_TOKEN_EXPIRE_SECONDS": 864000,
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=15),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
    "ROTATE_REFRESH_TOKENS": False,
    "BLACKLIST_AFTER_ROTATION": True,
    "UPDATE_LAST_LOGIN": False,
    "AUTH_COOKIE_HTTP_ONLY": True,  # Enable HttpOnly cookies
    "AUTH_COOKIE_SECURE": True,  # Enable HTTPS for cookies (recommended)
    "AUTH_COOKIE_PATH": "/",  # Set the cookie path
    # Set the SameSite attribute for CSRF protection
    "AUTH_COOKIE_SAMESITE": "Strict",
}


MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # Add WhiteNoiseMiddleware
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    # Add BrokenLinkEmailsMiddleware
    'django.middleware.common.BrokenLinkEmailsMiddleware',
]


CORS_ALLOW_CREDENTIALS = True
CORS_ORIGIN_WHITELIST = [
    "https://systems.learninggardenmontessori.ph",
    "http://localhost:3001",
    "http://192.168.0.148:3001",

    # Update with your frontend's URL
]
CORS_ALLOW_ALL_ORIGINS = True

CORS_ALLOWED_ORIGINS = [
    "https://systems.learninggardenmontessori.ph",
    "http://localhost:3001",
    "http://192.168.0.148:3001",  # Include the scheme (http:// or https://)

]


CORS_ALLOWED_ORIGIN_REGEXES = [
    r"^https://\w+\.learninggardenmontessori\.ph$",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"

print("Database Name:", os.environ.get("DB_NAME"))
print("Database User:", os.environ.get("DB_USER"))
print("Database Password:", os.environ.get("DB_PASSWORD"))
print("Database Host:", os.environ.get("DB_HOST"))
print("Database Port:", os.environ.get("DB_PORT"))
# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases


DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.environ.get("DB_NAME"),
        "USER": os.environ.get("DB_USER"),
        "PASSWORD": os.environ.get("DB_PASSWORD"),
        "HOST": os.environ.get("DB_HOST"),
        "PORT": os.environ.get("DB_PORT"),
    }
}
# Apply environment-specific settings
if DJANGO_ENV == "production":
    DATABASES["default"]["OPTIONS"] = {
        "sslmode": "disable",
    }
elif DJANGO_ENV in ["development", "testing"]:
    DATABASES["default"]["HOST"] = "localhost"
    DATABASES["default"]["PORT"] = "5432"

# Ensure all necessary database configuration variables are set
required_db_vars = ["DB_NAME", "DB_USER", "DB_PASSWORD", "DB_HOST", "DB_PORT"]
for var in required_db_vars:
    if not os.getenv(var):
        raise ValueError(f"Environment variable {var} is required but not set")


# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = "/static/"
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")

MEDIA_URL = "/media/"
MEDIA_ROOT = os.path.join(BASE_DIR, "media")
# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


if DJANGO_ENV == "production":
    EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
    EMAIL_HOST = "smtp.gmail.com"
    EMAIL_PORT = 587
    EMAIL_USE_TLS = True
    EMAIL_HOST_USER = os.getenv("EMAIL_HOST_USER")
    EMAIL_HOST_PASSWORD = os.getenv("EMAIL_HOST_PASSWORD")
    DEFAULT_FROM_EMAIL = os.getenv("DEFAULT_FROM_EMAIL", EMAIL_HOST_USER)
elif DJANGO_ENV == "testing":
    EMAIL_BACKEND = "config.custom_email_backend.CustomEmailBackend"
    EMAIL_HOST = "localhost"
    EMAIL_PORT = 1025
    EMAIL_USE_TLS = False
    EMAIL_USE_SSL = False
    EMAIL_HOST_USER = ""
    EMAIL_HOST_PASSWORD = ""
    DEFAULT_FROM_EMAIL = "test@example.com"  # Use a default from email for testing
    EMAIL_OVERRIDE_RECIPIENT = "dummy@example.com"
else:  # development
    EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
    EMAIL_HOST = "smtp.gmail.com"
    EMAIL_PORT = 587
    EMAIL_USE_TLS = True
    EMAIL_HOST_USER = os.getenv("EMAIL_HOST_USER")
    EMAIL_HOST_PASSWORD = os.getenv("EMAIL_HOST_PASSWORD")
    DEFAULT_FROM_EMAIL = os.getenv("DEFAULT_FROM_EMAIL", EMAIL_HOST_USER)

print("ALLOWED", ALLOWED_HOSTS)
print("EMAIL_HOST_USER --:", EMAIL_HOST_USER)
print("EMAIL_HOST_PASSWORD--:", EMAIL_HOST_PASSWORD)
print("EMAIL_BACKEND --:", EMAIL_BACKEND)
print("EMAIL_HOST --:", EMAIL_HOST)
print("EMAIL_PORT --:", EMAIL_PORT)
print("EMAIL_USE_TLS --:", EMAIL_USE_TLS)
print("DEFAULT_FROM_EMAIL --:", DEFAULT_FROM_EMAIL)
print(
    "EMAIL_OVERRIDE_RECIPIENT --:",
    getattr(settings, "EMAIL_OVERRIDE_RECIPIENT", "None"),
)


# CACHES = {
#     'default': {
#         'BACKEND': 'django_redis.cache.RedisCache',
#         'LOCATION': 'redis://127.0.0.1:6379/1',
#         'OPTIONS': {
#             'CLIENT_CLASS': 'django_redis.client.DefaultClient',
#         }
#     }
# }


SESSION_ENGINE = "django.contrib.sessions.backends.cache"
SESSION_CACHE_ALIAS = "default"


CSRF_COOKIE_SECURE = False  # set to true if in Prod
CSRF_COOKIE_HTTPONLY = True
CSRF_COOKIE_SAMESITE = "Lax"
SESSION_COOKIE_SECURE = False  # set to true if in Prod


LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
        },
    },
    "root": {
        "handlers": ["console"],
        "level": "DEBUG",
    },
}
