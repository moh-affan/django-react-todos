define(function (require) {
    'use strict';
    const React = require('../react');
    const e = require('./e');

    return class Scaffold extends React.Component {

        constructor(props) {
            super(props);
        }

        render() {
            return e('div', this.props, this.props.children);
        }
    };
});
