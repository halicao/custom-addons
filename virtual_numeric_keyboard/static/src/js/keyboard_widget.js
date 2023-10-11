odoo.define('virtual_numeric_keyboard.keyboard_widget', function(require) {
	'use strict';

	var registry = require('web.field_registry');
	var BasicFields = require('web.basic_fields');
	var session = require("web.session");

	var KeyboardWidget = BasicFields.FieldInteger.extend({
		start: function() {
			this.$el.on('click', this.onClick.bind(this));
			this._super.apply(this, arguments);
			this.$el.attr('readonly', 'readonly');
			console.log(session);
		},

		onKeydown: function(event) {
			var separator = '';
			var lang = session.user_context.lang;
			if (lang === 'vi_VN') {
				separator = ',';
			} else if (lang === 'en_US') {
				separator = '.';
			} else {
				separator = '.';
			}

			if (event.keyCode === 13) {
				this.$el.next('.virtual-keyboard').hide();
				if ($('.keyboard_input').val() === "") {
					var value = '0';
					this.$el.val(value).trigger('change');
				} else {
					var value = $('.keyboard_input').val();
					this.$el.val(value).trigger('change');
				}
				this.$el.off('keydown');
			}

			else if (event.keyCode === 8) {
				var value = $('.keyboard_input').val();
				$('.keyboard_input').val(value.substr(0, value.length - 1));
			}

			else if (event.keyCode === 110 || event.keyCode === 190) {
				if ($('.keyboard_input').val() === "") {
					$('.keyboard_input').val('0' + separator);
				} else {
					var value = $('.keyboard_input').val();
					if (value.indexOf(separator) != -1) {
						return;
					}
					$('.keyboard_input').val(value + separator);
				}
			}

			else if (event.keyCode === 27) {
				this.$el.next('.virtual-keyboard').hide();
				this.$el.off('keydown');
			}

			else if (event.keyCode === 46) {
				$('.keyboard_input').val('');
			}

			else if (event.keyCode >= 48 && event.keyCode <= 57 || event.keyCode >= 96 && event.keyCode <= 105) {
				var value = $('.keyboard_input').val() + event.key;
				if (value.indexOf(separator) > 0) {
					value = value;
				} else {
					value = value.replace(/^00+/, '0');
				}
				$('.keyboard_input').val(value);
			}

			event.preventDefault();
		},

		onClick: function() {
			this.$el.next('.virtual-keyboard').remove();

			this.$el.after(input);
			var keyboard = $('<div>', {
				class: 'virtual-keyboard container-fluid'
			});

			var on_keyboard = $('<div>', {
				class: 'on_keyboard container-fluid'
			});

			var input_keyboard = $('<div>', {
				class: 'input_keyboard container-fluid'
			});

			var value_keyboard = $('<div>', {
				class: 'value_keyboard container-fluid'
			});

			var row0 = $('<div>', {
				class: 'row'
			});

			var fieldName = this.field.string;

			var label = $('<label>', {
				class: 'keyboard_label',
				text: fieldName,
			});

			var themeDark = true;

			var toggleButton = $('<button>', {
				class: 'toggle-button',
				text: themeDark ? '☀️' : '🌙',
				click: _.bind(function(e) {
					themeDark = !themeDark;

					if (themeDark) {
						$('link[href="virtual_numeric_keyboard/static/src/css/keyboard_widget.css"]').remove();
						var link = document.createElement('link');
						link.rel = 'stylesheet';
						link.type = 'text/css';
						link.href = 'virtual_numeric_keyboard/static/src/css/keyboard_widget_dark.css';
						document.head.appendChild(link);
					} else {
						$('link[href="virtual_numeric_keyboard/static/src/css/keyboard_widget_dark.css"]').remove();
						var link = document.createElement('link');
						link.rel = 'stylesheet';
						link.type = 'text/css';
						link.href = 'virtual_numeric_keyboard/static/src/css/keyboard_widget.css';
						document.head.appendChild(link);
					}

					toggleButton.text(themeDark ? '☀️' : '🌙');
				}, this),
			});

			row0.append(label);
			row0.append(toggleButton);

			var row1 = $('<div>', {
				class: 'row'
			});

			var input = $('<input>', {
				type: 'text',
				class: 'keyboard_input',
				readonly: 'readonly'
			});

			row1.append(input);

			var row2 = $('<div>', {
				class: 'row'
			});

			row2.append(this.createButton('1', '1'));
			row2.append(this.createButton('2', '2'));
			row2.append(this.createButton('3', '3'));
			row2.append(this.createButton('⤆', 'backspace'));

			var row3 = $('<div>', {
				class: 'row'
			});
			row3.append(this.createButton('4', '4'));
			row3.append(this.createButton('5', '5'));
			row3.append(this.createButton('6', '6'));
			row3.append(this.createButton('C', 'clear'));

			var row4 = $('<div>', {
				class: 'row'
			});
			row4.append(this.createButton('7', '7'));
			row4.append(this.createButton('8', '8'));
			row4.append(this.createButton('9', '9'));
			row4.append(this.createButton('✖', 'cancel'));

			var row5 = $('<div>', {
				class: 'row'
			});
			row5.append(this.createButton('0', '0'));
			row5.append(this.createButton('•', 'dot'));
			row5.append(this.createButton('✔', 'enter'));

			input_keyboard.append(row0);
			value_keyboard.append(row1);
			value_keyboard.append(row2);
			value_keyboard.append(row3);
			value_keyboard.append(row4);
			value_keyboard.append(row5);

			on_keyboard.append(input_keyboard);
			on_keyboard.append(value_keyboard);

			keyboard.append(on_keyboard);

			this.$el.after(keyboard);

			var value = this.$el.val();
			$('.keyboard_input').val(value);

			this.$el.on('keydown', this.onKeydown.bind(this));
		},
		createButton: function(label, value) {
			var separator = '';
			var lang = session.user_context.lang;
			if (lang === 'vi_VN') {
				separator = ',';
			} else if (lang === 'en_US') {
				separator = '.';
			} else {
				separator = '.';
			}

			return $('<button>', {
				class: 'keyboard-button btn ',
				type: 'button',
				text: label,
				value: value,
				click: _.bind(function(e) {
					var btnValue = $(e.target).val();
					if (btnValue === 'clear') {
						$('.keyboard_input').val('');
					} else if (btnValue === 'backspace') {
						var value = $('.keyboard_input').val();
						$('.keyboard_input').val(value.substr(0, value.length - 1));
					} else if (btnValue === 'enter') {
						this.$el.next('.virtual-keyboard').hide();
						if ($('.keyboard_input').val() === "") {
							var value = '0';
							this.$el.val(value).trigger('change');
						} else {
							var value = $('.keyboard_input').val();
							this.$el.val(value).trigger('change');
						}
						this.$el.off('keydown');
					} else if (btnValue === 'cancel') {
						this.$el.next('.virtual-keyboard').hide();
						this.$el.off('keydown');
					} else if (btnValue === 'dot') {
						if ($('.keyboard_input').val() === "") {
							var value = '0' + separator;
							$('.keyboard_input').val(value);
						} else {
							var value = $('.keyboard_input').val();
							if (value.indexOf(separator) != -1) {
								return;
							}
							$('.keyboard_input').val(value + separator);
						}
					} else {
						var value = $('.keyboard_input').val() + btnValue;

						if (value.indexOf(separator) > 0) {
							value = value;
						} else {
							value = value.replace(/^00+/, '0');
						}
						$('.keyboard_input').val(value);
					}
				}, this)
			});
		},
	});

	registry.add('keyboard', KeyboardWidget);

	return {
		KeyboardWidget: KeyboardWidget,
	};
});
