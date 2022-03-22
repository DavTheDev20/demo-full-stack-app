import axios from 'axios';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [cookies, setCookie] = useCookies(['token']);

  const getPosts = async () => {
    const res = await axios.get('http://localhost:8080/api/posts', {
      headers: { 'x-access-token': cookies.token },
    });
    const data = await res.data;

    const posts = data.posts;

    setPosts(posts);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      <div className="posts">
        {posts.map((post) => {
          return (
            <div key={post._id}>
              <h2>{post.title}</h2>
              <p>
                {post.content.slice(0, 45) + '...'}{' '}
                <Link to={`/posts/${post._id}`}>Read More</Link>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Posts;
