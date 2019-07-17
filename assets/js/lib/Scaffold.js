define(function (require) {
    'use strict';
    const React = require('../react');
    const e = require('./e');
    const TodoView = require('./widget/TodoView');
    const Todo = require('./models/Todo');

    return class Scaffold extends React.Component {

        items = [];

        constructor(props) {
            super(props);
            this.state = {items: this.items, task: ''};
            this.onTodoCheckChanged = this.onTodoCheckChanged.bind(this);
        }

        onBtuttonClick = () => {
            let that = this;
            if (this.state.task !== '') {
                let todo = new Todo(this.state.task, false);
                axios.post('/', todo).then(function (response) {
                    console.log(response.data);
                    if (response.data.success)
                        that.items.push(todo);
                }).catch(function (error) {
                    console.log(error.data);
                }).finally(function () {
                    that.setState({});
                });
            } else {
                alert('Task could not be empty');
            }
        };

        componentDidMount() {
            this.loadData()
        }

        loadData() {
            let that = this;
            axios.get('/').then(function (response) {
                console.log(response.data);
                response.data.result.forEach(function (todo, index) {
                    that.items.push(new Todo(todo.task, todo.checked));
                });
            }).catch(function (error) {
                console.log(error);
            }).finally(function () {
                that.setState({});
            });
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
