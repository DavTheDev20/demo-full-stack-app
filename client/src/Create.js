import axios from 'axios';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Jumbotron from './components/Jumbotron';

const Create = () => {
  const [postData, setPostData] = useState({
    title: '',
    content: '',
  });
  const [cookies, setCookies] = useCookies(['token']);
  const navigate = useNavigate();
  const { REACT_APP_API_URL } = process.env;

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

    if (!postData.title || !postData.content) {
      return alert('Enter title and content to submit post.');
    }

    await axios({
      method: 'POST',
      url: `${REACT_APP_API_URL}/posts`,
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
      <Jumbotron text={'Create'} />
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
