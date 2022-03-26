import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Jumbotron from './components/Jumbotron';

const Post = () => {
  const { postId } = useParams();
  const [cookies, setCookies] = useCookies(['token']);
  const [post, setPost] = useState({ likes: [] });
  const [author, setAuthor] = useState({ username: '' });
  const [editable, setEditable] = useState();
  const navigate = useNavigate();
  const { REACT_APP_API_URL } = process.env;

  const getPost = async () => {
    const res = await axios.get(`${REACT_APP_API_URL}/posts/${postId}`, {
      headers: { 'x-access-token': cookies.token },
    });
    const data = await res.data;
    setEditable(data.editable);
    setAuthor(data.author);

    const post = await data.post;

    setPost(post);
  };

  useEffect(() => {
    getPost();
  }, []);

  const buttonStyles = {
    padding: '7px',
    margin: '0 10px 0 0',
    width: '75px',
    cursor: 'pointer',
  };

  return (
    <div>
      {/* <Jumbotron text={post.title} /> */}
      <div style={{ margin: '2%' }}>
        <h3>Posted By: {author.username}</h3>
        <small style={{ marginBottom: '10px', display: 'block' }}>
          Likes: {post.likes.length}
        </small>
        {<div dangerouslySetInnerHTML={{ __html: post.content }} />}
        <div style={{ marginTop: '10px' }}>
          {editable ? (
            <>
              <button
                style={buttonStyles}
                onClick={async (e) => {
                  e.preventDefault();
                  await axios
                    .delete(`${REACT_APP_API_URL}/posts/${post._id}`, {
                      headers: { 'x-access-token': cookies.token },
                    })
                    .then((res) => {
                      console.log(res);
                      navigate('/posts');
                    })
                    .catch((err) => {
                      console.log(err);
                      alert('Error');
                    });
                }}
              >
                Delete
              </button>
              <button
                style={buttonStyles}
                onClick={(e) => {
                  e.preventDefault();

                  navigate(`/posts/edit/${post._id}`);
                }}
              >
                Edit
              </button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Post;
