/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {getPosts, postPost} from "../API";
import { Link } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';


const Home = () => {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

    const [posts, setPosts] = useState(null);
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
          sub: user.sub,
          title: postTitle,
          body: postBody,
        };
        const token = await getAccessTokenSilently();
        postPost(data, token).then((response) => {
          setPosts(prev => [...prev, response]);
        });
        setPostTitle('');
        setPostBody('');
      };

    useEffect(() => {
        getPosts().then(response => {
            setPosts(response);
          });
    }, []);

    return (
        <div>
            {isAuthenticated && (
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          value={postTitle}
          placeholder="Review Title"
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <input
          type="text"
          value={postBody}
          placeholder="Review Body"
          onChange={(e) => setPostBody(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      )}
            {posts && posts.map(post => (
          <Link to={`/posts/${post.id}`} key={post.id}>
            <div>
              <h3>{post.title}</h3>
            </div>
        </Link>
        ))
        }
        </div>
    )
}

export default Home
