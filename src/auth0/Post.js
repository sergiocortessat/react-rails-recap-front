/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from 'react-router-dom';
import {getPost} from "../API";


const Post = () => {
    const [post, setPost] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        getPost(id).then(response => {
            setPost(response);
            console.log('here');
            console.log(response);
          })
    }, []);
  return (
      post && <div>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              <p>{post.created_at}</p>
              <p>{post.user.name}</p>
              <img src={post.user.picture} alt= "ha" />
            </div>
      )
};

export default Post;