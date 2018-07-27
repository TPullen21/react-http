import React, {Component} from 'react';
import axios from '../../../axios';

import Post from '../../../components/Post/Post';
import './Posts.css';

class Posts extends Component {

    state = {
        posts: []
    }

    componentDidMount () {
        axios.get('/posts')
            .then(response => {
                const posts = response.data.slice(0,10);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'TJ Blake'
                    }
                })
                this.setState({posts: updatedPosts});
            })
            .catch(err => {
                console.log('ruh roh');
                //this.setState({error: true});
            });
    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id});
    }

    render () {
        
        let posts = <p>Something went wrong!</p>

        if (!this.state.error) {
            posts = this.state.posts.slice(0,10).map(post => {
                return <Post
                    key={post.id}
                    title={post.title}
                    author={post.author}
                    clicked={() => this.postSelectedHandler(post.id)} />
            });
        }

        return (
            <section className="Posts">
                {posts}
            </section>
        )
    }
}

export default Posts;