// Core
import React from 'react';

// Instruments
import Style from './style.scss';
import { string, bool } from 'prop-types';
import { Transition } from 'react-transition-group';
import TweenMax from 'gsap';

const PostMan = ({ show }, { avatar, firstName }) => {
    let element = null;

    const showOrHidePostMan = (showEl) => {
        const posHide = { y: 200, opacity: 0 };
        const posShow = { y: 0, opacity: 1 };
        const time = 0.8;

        if (showEl) {
            TweenMax.fromTo(element, time, posHide, posShow);
        } else {
            TweenMax.fromTo(element, time, posShow, posHide);
        }
    };

    return (
        <Transition
            appear
            in = { show }
            timeout = { 300 }
            onEnter = { showOrHidePostMan.bind(this, true) }
            onExit = { showOrHidePostMan.bind(this, false) }>
            <section
                className = { Style.postman }
                ref = { (el) => element = el }>
                <img alt = 'user avatar' src = { avatar } />
                <span>Welcome, online, { firstName }</span>
            </section>
        </Transition>
    );
};

PostMan.propTypes = {
    show: bool.isRequired
};

PostMan.contextTypes = {
    avatar:    string.isRequired,
    firstName: string.isRequired
};

export default PostMan;
