// Core
import React, { Component } from 'react';
import { string, number, func, array } from 'prop-types';

// Instruments
import moment from 'moment';
import Styles from './styles.scss';
import { Transition } from 'react-transition-group';
import TweenMax from 'gsap';

export default class Post extends Component {
    static propTypes = {
        avatar:     string.isRequired,
        comment:    string.isRequired,
        created:    number.isRequired,
        deletePost: func.isRequired,
        firstName:  string.isRequired,
        lastName:   string.isRequired,
        likePos:    func.isRequired,
        likes:      array.isRequired
    };

    static contextTypes = {
        firstName: string.isRequired,
        lastName:  string.isRequired
    }

    constructor () {
        super();

        this.animationScale = ::this._animationScale;
    }

    shouldComponentUpdate (nextProps) {
        return JSON.stringify(nextProps) !== JSON.stringify(this.props);
    }

    _animationScale () {
        const el = this.likeEl;
        const time = 0.4;

        TweenMax.to(el, time, { scale: 1.35 });

        setTimeout(() => {
            TweenMax.to(el, time, { scale: 1 });
        }, time * 100);
    }

    render () {
        const {
            avatar,
            comment,
            created,
            deletePost,
            firstName,
            lastName,
            likePos,
            likes
        } = this.props;
        const {
            firstName: ownFirstName,
            lastName:  ownLastName
        } = this.context;
        const ownFullName = `${ownFirstName} ${ownLastName}`;

        const isAbleToDelete = ownFullName === `${firstName} ${lastName}`
            ? <span className = { Styles.cross } onClick = { deletePost } />
            : null;

        const likeList = likes.map((item) => {
            const fullName = `${item.firstName} ${item.lastName}`;

            return (
                <li key = { fullName }>{ fullName }</li>
            );
        });
        const isLiked = likes.some((item) => ownFullName === `${item.firstName} ${item.lastName}`);

        return (
            <div className = { Styles.post }>
                {isAbleToDelete}
                <a>
                    <img alt = 'commenter' src = { avatar } />
                </a>
                <a className = { Styles.name }>{ firstName } { lastName }</a>
                <span className = { Styles.time }>
                    {moment.unix(created).format('MMMM D h:mm:ss a')}
                </span>
                <p className = { Styles.message }>{ comment }</p>
                <div className = { Styles.likeBox }>
                    <Transition
                        in = { isLiked }
                        timeout = { 300 }
                        onEnter = { this.animationScale }
                        onExit = { this.animationScale }>
                        <figure
                            className = { Styles.like }
                            ref = { (el) => this.likeEl = el }
                            style = { isLiked ? { backgroundPosition: 0 } : null }
                            onClick = { likePos }
                        />
                    </Transition>
                    <span>{ likes.length }</span>
                    {likes.length ? <ul className = { Styles.likeList }>{ likeList }</ul> : null}
                </div>
            </div>
        );
    }
}
