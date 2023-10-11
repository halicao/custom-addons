{
    "name": "Vonage SMS",
    "summary": "Vonage SMS",
    "category": "Uncategorized",
    "author": "Hali",
    "license": "LGPL-3",
    "depends": ["base", "contacts"],
    "data": [
        "security/ir.model.access.csv",
        "data/ir_sequence_views.xml",
        "views/res_config_settings_views.xml",
        "views/vonage_sms_views.xml",
        "views/res_partner_views.xml",
        "wizard/vonage_sms_wizard.xml",
    ],
    'images': [
        'static/description/banner.png',
    ],
    "installable": True,
    "price": 12.04,
}
