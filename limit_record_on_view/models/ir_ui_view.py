import re
from odoo import models, fields, api


class IrUiView(models.Model):
    _inherit = 'ir.ui.view'

    limit = fields.Integer('Limit', default=80)
    
    @api.onchange('limit')
    def _onchange_limit(self):
        limit = ""
        view = ""
        if self.type == 'tree':
            limit = f"""<tree limit = "{self.limit}" """
            view = r'<tree '
        elif self.type == 'kanban':
            limit = f"""<kanban limit = "{self.limit}" """
            view = r'<kanban '

        self.arch_base = re.sub(view, limit, self.arch_base)
