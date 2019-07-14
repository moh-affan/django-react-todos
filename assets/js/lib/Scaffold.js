define(function (require) {
    'use strict';
    var React = require('../react');
    var e = require('./e');
    var TodoView = require('./widget/TodoView');
    var Todo = require('./models/Todo');

    return class Scaffold extends React.Component {

        items = [];

        constructor(props) {
            super(props);
            this.state = {items: this.items, task: ''};
            this.onTodoCheckChanged.bind(this);
        }

        onBtuttonClick = () => {
            if (this.state.task !== '') {
                this.items.push(new Todo(this.state.task, false));
                this.setState({});
            } else {
                alert('Task could not be empty');
            }
        };

        componentDidMount() {
            this.items.push(new Todo('bangun tidur', false));
            this.items.push(new Todo('mandi', false));
            this.items.push(new Todo('pergi ke kantor', false));
            this.setState({});
        }

        onTodoCheckChanged = (todo, index) => {
            this.items[index].checked = !this.items[index].checked;
            this.setState({});
        };

        onTextChanged = (event) => {
            console.log(event.target.value);
            this.setState({task: event.target.value});
        };

        render() {
            const that = this;
            const el = this.state.items.map(function (v, i) {
                return e('li', {className: 'd-block'}, e(TodoView, {
                    todo: v,
                    index: i,
                    onCheckChanged: that.onTodoCheckChanged
                }));
            });
            el[el.length] = e('li', {
                    className: 'd-block'
                }, e('div', {className: 'input-group', style: {width: 250}},
                e('input', {
                    type: 'text',
                    className: 'form-control',
                    onChange: this.onTextChanged
                }),
                e('div', {className: 'input-group-append'},
                    e('button', {
                        className: 'btn btn-dark',
                        onClick: this.onBtuttonClick
                    }, e('span', {className: 'fa fa-plus'})))
                )
            );
            const ul = e('ul', {className: 'list-unstyled', style: {padding: 20}}, el);
            return e('div', this.props, ul);
        }
    };
});
