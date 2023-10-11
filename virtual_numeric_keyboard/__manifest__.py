{
    'name': "Virtual Numeric Keyboard",
    'summary': """Dark And Light Mode""",
    'description': """""",
    'category': 'Uncategorized',
    "author": "Cao",
    'version': '0.1',
    'depends': [
        'web', 'base',
    ],
    'data': [
    ],
    'assets': {
        'web.assets_backend': [
            'virtual_numeric_keyboard/static/src/js/*.js',
            'virtual_numeric_keyboard/static/src/css/*.css',
        ],
    },
    'images': [
        'static/description/banner.png',
        'static/description/dark.png',
        'static/description/light.png',
        'static/description/icon.png',
    ],
    'installable': True,
    'application': True,
    'auto-install': True,
    'license': 'LGPL-3',
    'price': 0,
}
