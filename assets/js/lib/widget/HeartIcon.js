define(function (require) {
    'use strict';
    var React = require('../../react');
    var e = require('../e');

    return class HeartIcon extends React.Component {
        constructor(props) {
            super(props);
            this.props.filled = false;
        }

        render() {
            var filled = !this.props.filled ? "fa-heart-o" : "fa-heart";
            return e('span', {className: "fa text-danger " + filled}, "");
        }
    };
});
