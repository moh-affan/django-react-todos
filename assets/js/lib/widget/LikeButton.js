define(function (require) {
    'use strict';
    var React = require('../../react');
    var e = require('../e');
    var HeartIcon = require('./HeartIcon');

    return class LikeButton extends React.Component {
        constructor(props) {
            super(props);
            this.state = {checked: false};
        }

        check() {
            if (this.state.checked)
                return ["Like ", e(HeartIcon, {filled: true})];
            else return ["Unlike ", e(HeartIcon, {filled: false})];
        }

        render() {
            return e(
                'button',
                {
                    onClick: () => {
                        this.state.checked ? this.setState({checked: false}) : this.setState({checked: true});
                        console.log(this.props.id)
                    },
                    className: 'btn btn-dark',
                    style: {
                        width: 100,
                        marginBottom: 5
                    }
                },
                this.check()
            );
        }
    };
});
