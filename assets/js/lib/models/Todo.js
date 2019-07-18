define(function () {
    return class Todo {
        constructor(id, task, checked) {
            this.id = id;
            this.task = task;
            this.checked = checked;
        }
    };
});