from odoo import models, fields, api
import vonage


class VonageSMSWizard(models.TransientModel):
    _name = 'vonage.sms.wizard'
    _description = 'Vonage SMS Wizard'
    
    def _default_user_id(self):
        return self.env.user
    
    user_id = fields.Many2one('res.users', string='From', default=_default_user_id, readonly=True)
    partner_id = fields.Many2one('res.partner', string='To', readonly=True)
    phone = fields.Char('Phone', related='partner_id.phone')
    message = fields.Char('Message')

    def send_sms(self):
        api_key = self.env['res.config.settings']._get_api_key()
        api_secret = self.env['res.config.settings']._get_api_secret_key()
        from_by = self.user_id.name
        to_number = self.phone
        message = self.message
        
        client = vonage.Client(key=api_key, secret=api_secret)
        sms = vonage.Sms(client)
        
        responseData = sms.send_message(
            {
                "from": from_by,
                "to": to_number,
                "text": message,
            }
        )
        
        vonage_sms = self.env['vonage.sms'].create({
            'user_id': self.user_id.id,
            'partner_id': self.partner_id.id,
            'phone': self.phone,
            'message': self.message,
            'status': 'success' if responseData["messages"][0]["status"] == "0" else 'fail',
            'state': 'send',
            'price': responseData["messages"][0]["message-price"]
        })

        return True
