import base64

from django import template

register = template.Library()


@register.simple_tag
def generate_basic(user, password):
    return 'Basic {}'.format(base64.b64encode('{}:{}'.format(user, password).encode('utf-8')).decode())
