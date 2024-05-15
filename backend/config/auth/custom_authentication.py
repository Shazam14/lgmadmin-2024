# custom_authentication.py
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.core.cache import cache
from rest_framework.exceptions import AuthenticationFailed


class RedisBlacklistMixin:
    """
    A mixin to handle access_token blacklisting using redis
    """

    def is_token_blacklisted(self, token):
        """
        This method checks if a token is blacklisted.
        """
        if cache.get(token):
            return True
        return False

    def blacklist_token(self, token):
        """
        This method blacklists a token.
        """
        cache.set(token, "blacklisted", timeout=60*60*24*2)  # 2 days


class BlacklistJWTAuthentication(JWTAuthentication, RedisBlacklistMixin):
    def authenticate(self, request):
        """
        This method authenticates a user using the access_token.
        """
        try:
            user = super().authenticate(request)
            if user:
                if self.is_token_blacklisted(user[1]):
                    raise AuthenticationFailed("Token is blacklisted")
                return user
        except AuthenticationFailed as e:
            raise e
        except Exception as e:
            raise e
        return None
