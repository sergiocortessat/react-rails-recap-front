/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { getPosts, postPost, deletePost } from '../API';

const Home = () => {
  const {
    user, isAuthenticated, getAccessTokenSilently, isLoading,
  } = useAuth0();

  const [posts, setPosts] = useState([]);
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
      setPosts(posts.concat(response));
    });
    setPostTitle('');
    setPostBody('');
  };

  const handleDelete = async (review) => {
    const token = await getAccessTokenSilently();
    const { id } = review;
    deletePost(id, token).then(() => {
      setPosts((prev) => prev.filter((p) => p.id !== id));
    });
  };

  useEffect(() => {
    getPosts().then((response) => {
      setPosts(response);
    });
  }, [postTitle, postBody]);

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
      {posts && posts.map((post) => (
        <div key={post.id}>
          <Link to={{
            pathname: `/posts/${post.id}`,
            state: true,
          }}
          >
            <div>
              <h3>{post.title}</h3>
              <h3>{post.sub}</h3>
            </div>
            {/* delete button */}
          </Link>
          <button type="button" onClick={() => handleDelete(post)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Home;
