from odoo import models, fields, api


class ResPartner(models.Model):
    _inherit = 'res.partner'

    count_vonage_sms = fields.Integer('Vonage SMS', compute="_compute_count_sms")

    @api.depends()
    def _compute_count_sms(self):
        for record in self:
            count = self.env['vonage.sms'].search([('partner_id', '=', record.id)])
            record.count_vonage_sms = len(count)

    def action_vonage_sms(self):
        action = self.env.ref('vonage_sms.action_vonage_sms').read()[0]
        data = self.env['vonage.sms'].search([('partner_id', '=', self.id)])
        action['domain'] = [('id', 'in', data.ids)]
        return action
    
    def action_send_sms_wizard(self):
        return {
            'name': 'Vonage SMS Wizard',
            'type': 'ir.actions.act_window',
            'res_model': 'vonage.sms.wizard',
            'view_mode': 'form',
            'view_id': self.env.ref('vonage_sms.vonage_sms_wizard_form').id,
            'target': 'new',
            'context': {'default_partner_id': self.id}
        }
