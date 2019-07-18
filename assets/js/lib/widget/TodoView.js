define(function (require) {
    'use strict';
    const React = require('../../react');
    const e = require('../e');

    return class TodoView extends React.Component {
        constructor(props) {
            super(props);
        }

        check() {
            if (this.props.todo.checked)
                return e('span', {
                    className: "fa fa-check-circle-o text-success", onClick: () => {
                        this.props.onCheckChanged(this.props.todo, this.props.index);
                    },
                });
            else return e('span', {
                className: "fa fa-circle-o text-info", onClick: () => {
                    this.props.onCheckChanged(this.props.todo, this.props.index);
                },
            });
        }

        render() {
            return e(
                'button',
                {
                    className: 'btn btn-dark',
                    style: {
                        width: 250,
                        marginBottom: 5
                    }
                },
                e('span', {className: "float-left"}, this.props.todo.task),
                e('span', {className: "float-right"}, this.check(), e('span', {
                    className: 'fa fa-trash text-danger',
                    onClick: () => {
                        this.props.onDelete(this.props.todo, this.props.index)
                    },
                    style: {marginLeft: 10}
                }))
            );
        }
    };
});
