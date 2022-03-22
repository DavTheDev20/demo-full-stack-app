import axios from 'axios';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [postData, setPostData] = useState({
    title: '',
    content: '',
  });
  const [cookies, setCookies] = useCookies(['token']);
  const navigate = useNavigate();

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
      method: 'POST',
      url: 'http://localhost:8080/api/posts',
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
    <div>
      <h1>Create</h1>
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
    </div>
  );
};

export default Create;
