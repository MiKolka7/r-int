// Core
import React, { Component } from 'react';

// Instruments
import { object } from 'prop-types';
import Styles from './style.scss';

export default class Cather extends Component {
    static propTypes = {
        children: object.isRequired
    }

    state = {
        error: false
    }

    componentDidCatch (error, stack) {
        console.log(error, stack);

        this.setState(() => ({
            error: true
        }));
    }

    render () {
        const { error } = this.state;
        const { children } = this.props;

        if (error) {
            return (
                <section className = { Styles.catcher }>
                    <span>A mysterious 👽 &nbsp;error 📛 &nbsp;occured.</span>
                    <p>
                        Our space 🛰 &nbsp;engineers strike team 👩🏼‍🚀 👨🏼‍🚀
                        &nbsp;is already working 🚀 &nbsp;in order to fix that
                        for you!
                    </p>
                </section>
            );
        }

        return children;
    }
}
