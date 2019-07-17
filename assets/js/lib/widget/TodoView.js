define(function (require) {
    'use strict';
    const React = require('../../react');
    const e = require('../e');

    return class TodoView extends React.Component {
        constructor(props) {
            super(props);
            // this.state = {checked: false};
        }

        check() {
            if (this.props.todo.checked)
                return e('span', {className: "fa fa-check-circle-o text-success float-right"});
            else return e('span', {className: "fa fa-circle-o text-info float-right"});
        }

        render() {
            return e(
                'button',
                {
                    onClick: () => {
                        this.props.onCheckChanged(this.props.todo, this.props.index);
                    },
                    className: 'btn btn-dark',
                    style: {
                        width: 250,
                        marginBottom: 5
                    }
                },
                e('span', {className: "float-left"}, this.props.todo.task),
                this.check()
            );
        }
    };
});
