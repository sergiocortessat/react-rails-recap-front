const userEndpoint = 'http://localhost:3000/users';
const postsEndpoint = 'http://localhost:3000/posts';

export const postUser = async (data, accessToken) => {
  const response = await fetch(userEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  const user = await response.json();
  return user;
};

export const getPosts = async () => {
    const response = await fetch(postsEndpoint);
    const post = await response.json();
    return post;
  };

  export const postPost = async (data, accessToken) => {
    const response = await fetch(postsEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });
    const post = await response.json();
    return post;
  };

  export const getPost = async (id) => {
    const response = await fetch(`${postsEndpoint}/${id}`);
    const review = await response.json();
    return review;
  }