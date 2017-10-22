// Core
import React, { Component } from 'react';
import { string } from 'prop-types';

// Instruments
import Feed from '../../components/Feed';
import Cather from '../../components/Cather';
import avatar from '../../theme/assets/my-avatar.jpg';

const groupID = 'l1lz1az2m5';

const options = {
    firstName: 'Mykola',
    lastName:  'Koval',
    avatar,
    api:       `https://lab.lectrum.io/feed/${groupID}`
};

export default class App extends Component {
    static childContextTypes = {
        firstName: string.isRequired,
        lastName:  string.isRequired,
        avatar:    string.isRequired,
        api:       string.isRequired
    };

    getChildContext () {
        return options;
    }

    render () {
        return <Cather><Feed /></Cather>;
    }
}
