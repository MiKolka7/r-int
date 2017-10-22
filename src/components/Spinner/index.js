// Core
import React, { Component } from 'react';
import * as ReactDOM from 'react-dom';

// Instruments
import { bool } from 'prop-types';
import Styles from './style.scss';
import spinnerImg from '../../theme/assets/react.jpg';
import TweenMax from 'gsap';
import { Transition } from 'react-transition-group';

const $spinner = document.getElementById('spinner');

export default class Spinner extends Component {
    static propTypes = {
        animation: bool.isRequired
    };

    _animationEl () {
        TweenMax.fromTo(this.spinnerEl, 1, { rotation: 0 }, { rotation: 360 });
    }

    _getImg () {
        const { animation } = this.props;

        return (
            <Transition
                appear
                in = { animation }
                timeout = { 300 }
                onEnter = { this._animationEl.bind(this) }>
                <img
                    alt = 'spinner'
                    className = { Styles.spinner }
                    ref = { (el) => this.spinnerEl = el }
                    src = { spinnerImg }
                />
            </Transition>
        );
    }

    render () {
        return ReactDOM.createPortal(this._getImg(), $spinner);
    }
}
