// Core
import React, { Component } from 'react';
import { string } from 'prop-types';

// Instruments
import Styles from './styles.scss';
import { CSSTransition, Transition, TransitionGroup } from 'react-transition-group';

// Components
import Post from '../Post';
import Composer from '../Composer';
import Counter from '../Counter';
import PostMan from '../PostMan';
import TweenMax from 'gsap';
import Spinner from '../Spinner';

export default class Feed extends Component {
    static contextTypes = {
        firstName: string.isRequired,
        lastName:  string.isRequired,
        avatar:    string.isRequired,
        api:       string.isRequired
    };

    constructor () {
        super();

        this.createPost = ::this._createPost;
        this.deletePost = ::this._deletePost;
        this.getPost = ::this._getPost;
        this.likePos = ::this._likePos;
        this.animationShowEls = ::this._animationShowEls;
        this.groupEls = null;
    }

    state = {
        posts:          [],
        showPostMan:    true,
        isFetchingPost: false
    };

    componentWillMount () {
        this._getPost();
        this.refetchPosts = setInterval(this.getPost, 20000);
    }

    componentDidMount () {
        setTimeout(() => {
            this.setState({
                showPostMan: false
            });
        }, 5000);
    }

    componentWillUnmount () {
        clearInterval(this.refetchPosts);
    }

    _startFetching () {
        this.setState({
            isFetchingPost: true
        });
    }

    _stopFetching () {
        this.setState({
            isFetchingPost: false
        });
    }

    async _createPost (post) {
        try {
            this._startFetching();

            const { api, firstName, lastName, avatar } = this.context;
            const postBody = {
                firstName,
                lastName,
                avatar,
                comment: post.message
            };
            const res = await fetch(api, {
                method:  'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(postBody)
            });
            const { data } = await res.json();

            if (res.status !== 200) {
                throw new Error('Post was not created!');
            }

            this.setState(({ posts }) => ({
                posts: [data, ...posts]
            }));
            this._stopFetching();
        } catch ({ message }) {
            console.log(message);
        }

    }

    async _getPost () {
        try {
            this._startFetching();

            const { api } = this.context;
            const res = await fetch(api, { method: 'GET' });
            const { data } = await res.json();

            if (res.status !== 200) {
                throw new Error('Post were not loaded!');
            }

            this.setState(() => ({
                posts: data
            }));
            this._stopFetching();
        } catch ({ message }) {
            console.log(message);
        }
    }

    async _deletePost (id) {
        try {
            const { api } = this.context;

            const res = await fetch(`${api}/${id}`, {
                method: 'DELETE'
            });

            if (res.status !== 200) {
                throw new Error('Post were not loaded!');
            }

            this.setState(({ posts }) => ({
                posts: posts.filter((item) => item._id !== id)
            }));
        } catch ({ message }) {
            console.log(message);
        }
    }

    async _likePos (_id) {
        try {
            const { api, firstName, lastName } = this.context;
            const res = await fetch(`${api}/${_id}`, {
                method:  'PUT',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify({ firstName, lastName })
            });
            const { data } = await res.json();

            if (res.status !== 200) {
                throw new Error('Post were not like!');
            }

            this.setState(({ posts }) => {
                const newPosts = posts.map((item) => {
                    if (item._id === _id) {
                        item.likes = data;
                    }

                    return item;
                });

                return { posts: newPosts };
            });
        } catch ({ message }) {
            console.log(message);
        }
    }

    _animationShowEls () {
        TweenMax.fromTo(this.groupEls, 1, { y: -600, opacity: 0 }, { y: 0, opacity: 1 });
    }

    render () {
        const { posts, showPostMan, isFetchingPost } = this.state;
        const postsList = posts.map(({ _id, avatar, comment, created, firstName, lastName, likes }) => (
            <CSSTransition
                appear
                classNames = { {
                    enter:        Styles.postEnter,
                    enterActive:  Styles.postEnterActive,
                    appear:       Styles.postEnter,
                    appearActive: Styles.postEnterActive,
                    exit:         Styles.postExit,
                    exitActive:   Styles.postExitActive
                } }
                key = { _id }
                timeout = { 300 } >
                <Post
                    avatar = { avatar }
                    comment = { comment }
                    created = { created }
                    deletePost = { this.deletePost.bind(this, _id) }
                    firstName = { firstName }
                    lastName = { lastName }
                    likePos = { this.likePos.bind(this, _id) }
                    likes = { likes }
                />
            </CSSTransition>
        ));

        return (
            <section className = { Styles.feed }>
                <Transition
                    appear
                    in
                    timeout = { 1000 }
                    onEnter = { this.animationShowEls }>
                    <div ref = { (el) => this.groupEls = el }>
                        <Composer createPost = { this.createPost } />
                        <Counter count = { postsList.length } updatePosts = { this.getPost } />
                    </div>
                </Transition>
                <TransitionGroup>
                    { postsList }
                </TransitionGroup>
                <TransitionGroup>
                    <PostMan show = { showPostMan } />
                </TransitionGroup>
                <Spinner animation = { isFetchingPost } />
            </section>
        );
    }
}
