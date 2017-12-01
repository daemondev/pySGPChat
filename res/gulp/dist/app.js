'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('inh.js');

exports.default = React.createClass({
  displayName: 'app',
  getInitialState: function getInitialState() {
    return { num: this.getRandomNumber() };
  },
  getRandomNumber: function getRandomNumber() {
    return Math.ceil(Math.random() * 6);
  },
  render: function render() {
    return React.createElement(
      'div',
      null,
      'Your dice roll:',
      this.state.num,
      React.createElement(Inh, null)
    );
  }
});