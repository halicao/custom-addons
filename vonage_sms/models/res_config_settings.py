from odoo import fields, models, api

CONFIG_PARAM_API_KEY = "api.key"
CONFIG_PARAM_API_SECRET_KEY = "api.secret.key"


class ResConfigSettings(models.TransientModel):
    _inherit = 'res.config.settings'

    api_key = fields.Char('API Key')
    api_secret_key = fields.Char('API Secret Key')

    @api.model
    def get_values(self):
        res = super(ResConfigSettings, self).get_values()
        ir_config = self.env['ir.config_parameter'].sudo()
        api_key = ir_config.get_param(CONFIG_PARAM_API_KEY)
        api_secret_key = ir_config.get_param(CONFIG_PARAM_API_SECRET_KEY)
        res.update(
            api_key=api_key,
            api_secret_key=api_secret_key
        )
        return res

    def set_values(self):
        super(ResConfigSettings, self).set_values()
        ir_config = self.env['ir.config_parameter'].sudo()
        ir_config.set_param(CONFIG_PARAM_API_KEY, self.api_key or '')
        ir_config.set_param(CONFIG_PARAM_API_SECRET_KEY, self.api_secret_key or '')

    def _get_api_key(self):
        api_key = self.env['ir.config_parameter'].sudo().get_param(CONFIG_PARAM_API_KEY)
        return api_key
    
    def _get_api_secret_key(self):
        api_secret_key = self.env['ir.config_parameter'].sudo().get_param(CONFIG_PARAM_API_SECRET_KEY)
        return api_secret_key
