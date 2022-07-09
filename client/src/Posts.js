import axios from 'axios';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import Jumbotron from './components/Jumbotron';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [cookies, setCookie] = useCookies(['token']);
  const [isLoading, setIsLoading] = useState(false);

  const { REACT_APP_API_URL } = process.env;

  const getPosts = async () => {
    setIsLoading(true);
    const res = await axios.get(REACT_APP_API_URL + '/posts', {
      headers: { 'x-access-token': cookies.token },
    });
    const data = await res.data;

    const posts = data.posts;

    setPosts(posts);
    setIsLoading(false);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const desktopPostStyles = {
    margin: '3%',
    borderBottom: '2px solid rgba(123, 123, 123, 0.23)',
    paddingBottom: '15px',
    width: '30%',
  };

  const mobilePostStyles = {
    margin: '4%',
    borderBottom: '2px solid rgba(123, 123, 123, 0.23)',
    paddingBottom: '15px',
    width: '95%',
  };

  return (
    <div>
      <Jumbotron text={'Posts'} />
      <div className="posts">
        {isLoading ? (
          <h1 style={{ margin: '3%' }}>Loading...</h1>
        ) : (
          <>
            {posts.map((post) => {
              return (
                <div
                  key={post._id}
                  className="post"
                  style={
                    window.screen.width > 600
                      ? desktopPostStyles
                      : mobilePostStyles
                  }
                >
                  <h2 style={{ marginBottom: '8px' }}>{post.title}</h2>
                  <p>
                    {post.content.length < 45
                      ? post.content + ' -->'
                      : window.screen.width > 600
                      ? post.content.slice(0, 45) + '...'
                      : post.content.slice(0, 30) + '...'}{' '}
                    <Link to={`/posts/${post._id}`}>Read More</Link>
                  </p>
                  <small
                    style={{
                      marginTop: '8px',
                      color: 'rgba(123, 123, 123, 0.85)',
                      display: 'block',
                    }}
                  >
                    {new Date(post.createdAt).getDate() !==
                    new Date().getDate() ? (
                      <>
                        Posted on:{' '}
                        {new Date(post.createdAt).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}{' '}
                        at{' '}
                        {new Date(post.createdAt).toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: 'numeric',
                        })}
                      </>
                    ) : (
                      <>
                        Posted Today at{' '}
                        {new Date(post.createdAt).toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: 'numeric',
                        })}
                      </>
                    )}
                  </small>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default Posts;
