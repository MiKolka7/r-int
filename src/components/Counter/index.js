// Core
import React from 'react';

// Instruments
import { number, func } from 'prop-types';
import Styles from './style.scss';

const Counter = ({ count }) => (
    <section className = { Styles.counter }>
        Posts count: { count }
        {/*<button
        className = { Styles.button }
        onClick = { updatePosts }>Update</button>*/}
    </section>
);

Counter.propTypes = {
    count:       number.isRequired,
    updatePosts: func
};

Counter.defaultProps = {
    count: 0
};

export default Counter;
