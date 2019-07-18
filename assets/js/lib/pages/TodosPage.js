define(function (require) {
    'use_strict';
    const React = require('../../react');
    const e = require('../e');
    const TodoView = require('../widget/TodoView');
    const Todo = require('../models/Todo');
    const config = {
        xsrfCookieName: 'csrftoken',
        xsrfHeaderName: 'X-CSRFToken'
    };

    return class TodosPage extends React.Component {
        constructor(props) {
            super(props);
            this.items = [];
            this.state = {items: this.items, task: ''};
            this.onTodoCheckChanged = this.onTodoCheckChanged.bind(this);
            this.onDeleteItem = this.onDeleteItem.bind(this);
        }

        onDeleteItem(todo, index) {
            let that = this;
            axios.post('/', {action: 'delete', todo: todo}, config).then(function (response) {
                if (response.data.success)
                    that.items.splice(index, 1);
            }).catch(function (error) {
                console.log(error.data);
            }).finally(function () {
                that.setState({});
            });
        }

        onButtonClick = () => {
            let that = this;
            if (this.state.task !== '') {
                let todo = new Todo(0, this.state.task, false);
                axios.post('/', {action: 'create', todo: todo}, config).then(function (response) {
                    if (response.data.success)
                        that.items.push(response.data.result);
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
                response.data.result.forEach(function (todo, index) {
                    that.items.push(new Todo(todo.id, todo.task, todo.checked));
                });
            }).catch(function (error) {
                console.log(error);
            }).finally(function () {
                that.setState({});
            });
        }

        onTodoCheckChanged = (todo, index) => {
            let that = this;
            todo.checked = !todo.checked;
            axios.post('/', {action: 'check_changed', todo: todo}, config).then(function (response) {
                if (!response.data.success)
                    todo.checked = !todo.checked;
            }).catch(function (error) {
                todo.checked = !todo.checked;
                console.log(error.data);
            }).finally(function () {
                that.setState({});
            });
        };

        onTextChanged = (event) => {
            this.setState({task: event.target.value});
        };

        render() {
            const that = this;
            const el = this.state.items.map(function (v, i) {
                console.log(v);
                return e('li', {className: 'd-block'}, e(TodoView, {
                    todo: v,
                    index: i,
                    onCheckChanged: that.onTodoCheckChanged,
                    onDelete: that.onDeleteItem
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
                        onClick: this.onButtonClick
                    }, e('span', {className: 'fa fa-plus'})))
                )
            );
            return e('ul', {className: 'list-unstyled', style: {padding: 20}}, el);
        }
    };
});