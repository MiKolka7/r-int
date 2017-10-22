// Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Instruments
import Style from './style.scss';
import { getRandomColor, getUniqueID } from '../../helpers';
import moment from 'moment';

export default class Composer extends Component {
    static contextTypes = {
        firstName: PropTypes.string.isRequired,
        avatar:    PropTypes.string.isRequired
    };

    static propTypes = {
        createPost: PropTypes.func.isRequired
    }

    constructor () {
        super();

        this.handleSubmit = ::this._handleSubmit;
        this.handleTextAreaChange = ::this._handleTextAreaChange;
        this.handleKeyPress = ::this._handleKeyPress;
        this.handleCopy = ::this._handleCopy;
    }

    state = {
        textAreaValue:     '',
        avatarBorderColor: '#000'
    }

    _handleSubmit (event) {
        event.preventDefault();

        const { textAreaValue } = this.state;

        if (!textAreaValue) {
            return;
        }

        this.setState(() => ({
            textAreaValue: ''
        }));

        this.props.createPost({
            _id:     getUniqueID(15),
            created: moment().unix(),
            message: textAreaValue
        });
    }

    _handleTextAreaChange (event) {
        const textAreaValue = event.target.value;

        this.setState(() => ({ textAreaValue }));
    }

    _handleCopy (event) {
        event.preventDefault();
    }

    _handleKeyPress () {
        this.setState(() => ({
            avatarBorderColor: getRandomColor()
        }));
    }

    render () {
        const { firstName, avatar } = this.context;
        const { avatarBorderColor } = this.state;

        return (
            <section className = { Style.composer }>
                <img
                    alt = 'commenter'
                    src = { avatar }
                    style = { {
                        borderColor: avatarBorderColor
                    } }
                />
                <form onSubmit = { this.handleSubmit }>
                    <textarea
                        placeholder = { `${firstName}, what you mind?` }
                        value = { this.state.textAreaValue }
                        onChange = { this.handleTextAreaChange }
                        onCopy = { this.handleCopy }
                        onKeyPress = { this.handleKeyPress }
                    />
                    <input type = 'submit' value = 'Post' />
                </form>
            </section>
        );
    }
}
