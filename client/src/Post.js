import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Post = () => {
  const { postId } = useParams();
  const [cookies, setCookies] = useCookies(['token']);
  const [post, setPost] = useState({});
  const [editable, setEditable] = useState();
  const navigate = useNavigate();

  const getPost = async () => {
    const res = await axios.get(`http://localhost:8080/api/posts/${postId}`, {
      headers: { 'x-access-token': cookies.token },
    });
    const data = await res.data;
    setEditable(data.editable);

    const post = data.post;

    setPost(post);
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div>
      <h1>{post.title}</h1>
      <h3>Created On: {new Date(post.createdAt).toLocaleDateString()}</h3>
      <p>{post.content}</p>
      {editable ? (
        <>
          <button
            onClick={async (e) => {
              e.preventDefault();
              await axios
                .delete(`http://localhost:8080/api/posts/${post._id}`, {
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
  );
};

export default Post;
