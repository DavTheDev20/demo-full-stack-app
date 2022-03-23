import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Edit = () => {
  const { postId } = useParams();
  const [cookies, setCookies] = useCookies(['token']);
  const [postData, setPostData] = useState({
    title: '',
    content: '',
  });
  const navigate = useNavigate();
  const { REACT_APP_API_URL } = process.env;

  const getPostData = async () => {
    const res = await axios.get(`${REACT_APP_API_URL}/posts/${postId}`, {
      headers: { 'x-access-token': cookies.token },
    });

    const data = await res.data;

    setPostData(() => {
      return { title: data.post.title, content: data.post.content };
    });
  };

  useEffect(() => {
    getPostData();
  }, []);

  const handleInput = ({ target }) => {
    const { name, value } = target;

    if (name === 'title') {
      setPostData((prevValue) => {
        return {
          title: value,
          content: prevValue.content,
        };
      });
    } else if (name === 'content') {
      setPostData((prevValue) => {
        return {
          title: prevValue.title,
          content: value,
        };
      });
    }
  };

  const handleSubmission = async (e) => {
    e.preventDefault();

    await axios({
      method: 'PUT',
      url: `${REACT_APP_API_URL}/posts/` + postId,
      data: postData,
      headers: {
        'x-access-token': cookies.token,
      },
    })
      .then((res) => {
        console.log(res);
        navigate('/posts');
      })
      .catch((err) => {
        console.log(err);
        alert('error');
      });
  };
  return (
    <>
      <h1>Edit</h1>
      <form onSubmit={handleSubmission}>
        <label>Title: </label>
        <br />
        <input
          type={'text'}
          name="title"
          value={postData.title}
          onChange={handleInput}
        />
        <br />
        <label>Content: </label>
        <br />
        <textarea
          rows={12}
          cols={35}
          placeholder="enter content here..."
          name="content"
          value={postData.content}
          onChange={handleInput}
        />
        <br />
        <button>Submit</button>
      </form>
    </>
  );
};

export default Edit;
