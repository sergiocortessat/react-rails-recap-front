/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { getPost, deletePost } from '../API';

const Post = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [post, setPost] = useState(null);
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const { render } = location.state;
  console.log(render);

  const handleDelete = async () => {
    const token = await getAccessTokenSilently();
    await deletePost(id, token);
    history.go(-1);
    // window.history.go(0);
    // window.location.reload();
  };

  useEffect(() => {
    getPost(id).then((response) => {
      setPost(response);
    });
  }, []);

  return (
    post && (
    <div>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <p>{post.created_at}</p>
      <p>{post.user.name}</p>
      <p>{post.id}</p>
      <img src={post.user.picture} alt="ha" />
      <button type="button" onClick={() => handleDelete()}>Delete</button>
    </div>
    )
  );
};

export default Post;
