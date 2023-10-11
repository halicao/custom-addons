from odoo import models, fields, api, _


class VonageSms(models.Model):
    _name = 'vonage.sms'

    name = fields.Char('Name', required=True, copy=False, readonly=True,
                       default=lambda self: _('New'))
    user_id = fields.Many2one('res.users', string='From', readonly=True)
    partner_id = fields.Many2one('res.partner', string='To', readonly=True)
    phone = fields.Char('Phone', related='partner_id.phone')
    message = fields.Char('Message', readonly=True)
    price = fields.Float('Price (€)', readonly=True)
    status = fields.Selection([('fail', 'Failed'), ('success', 'Success')], string='Status', readonly=True)
    state = fields.Selection([('draft', 'Draft'), ('send', 'Send')], string='State', default='draft', readonly=True)

    @api.model
    def create(self, vals):
        if vals.get('name', _('New')) == _('New'):
            vals['name'] = self.env['ir.sequence'].next_by_code('vonage.sms') or _('New')
        res = super(VonageSms, self).create(vals)
        return res
