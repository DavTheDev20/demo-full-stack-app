import axios from 'axios';
import { useState, useEffect } from 'react';
import Jumbotron from './components/Jumbotron';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [userData, setUserData] = useState({ username: '', posts: [] });
  const [cookies] = useCookies(['token']);
  const [loading, setLoading] = useState(false);

  const { REACT_APP_API_URL } = process.env;

  const getUser = async () => {
    setLoading(true);
    const res = await axios.get(REACT_APP_API_URL + '/user', {
      headers: { 'x-access-token': cookies.token },
    });
    const data = await res.data;
    console.log(data);

    setLoading(false);
    setUserData(data.user);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <Jumbotron text={'Profile'} />
      <div style={{ marginLeft: '10px' }}>
        <h2>Welcome: {userData.username}</h2>
        {loading ? (
          <h2>Loading...</h2>
        ) : userData.posts.length > 0 ? (
          <>
            <h2 style={{ marginTop: '10px' }}>Posts: </h2>
            {userData.posts.map((post) => {
              return (
                <div style={{ margin: '10px 0' }} key={post._id}>
                  <Link to={`/posts/${post._id}`}>{post.title}</Link>
                </div>
              );
            })}
          </>
        ) : (
          <h2>No Posts</h2>
        )}
      </div>
    </div>
  );
};

export default Profile;
