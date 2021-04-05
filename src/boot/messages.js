import { Notify } from 'quasar';

export default function ({ Vue }) {
  Vue.messages = {
    success(message, timeout = 3000) {
      Notify.create({
        message,
        color: 'positive',
        position: 'top-right',
        icon: 'fas fa-smile-wink',
        timeout,
      });
    },

    warning(message, timeout = 3000) {
      Notify.create({
        message,
        color: 'mainpurple',
        position: 'top-right',
        icon: 'fas fa-exclamation-triangle',
        timeout,
      });
    },

    error(message, timeout = 3000) {
      Notify.create({
        message,
        color: 'red',
        position: 'top-right',
        icon: 'fas fa-sad-tear',
        timeout,
      });
    },

  };

  Vue.prototype.messages = Vue.messages;
}
