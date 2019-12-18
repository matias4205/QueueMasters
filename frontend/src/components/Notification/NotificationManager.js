import { EventEmitter } from 'events';

const CONSTANTS = {
  success: 'success',
  warning: 'warning',
  danger: 'danger',
};

class NotificationManager extends EventEmitter {
  danger(text) {
    this.trigger({ text, type: CONSTANTS.danger });
  }

  warning(text) {
    this.trigger({ text, type: CONSTANTS.warning });
  }

  success(text) {
    this.trigger({ text, type: CONSTANTS.success });
  }

  trigger({ text, type }) {
    this.emit('show', { text, type });
  }

  hide() {
    this.emit('hide');
  }
}

export default new NotificationManager();
