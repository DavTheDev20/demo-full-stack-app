import axios from 'axios';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Jumbotron from './components/Jumbotron';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Create = () => {
  const [postData, setPostData] = useState({
    content: '',
  });
  const [cookies, setCookies] = useCookies(['token']);
  const navigate = useNavigate();
  const { REACT_APP_API_URL } = process.env;

  // const handleInput = ({ target }) => {
  //   const { name, value } = target;

  //   if (name === 'title') {
  //     setPostData((prevValue) => {
  //       return {
  //         title: value,
  //         content: prevValue.content,
  //       };
  //     });
  //   } else if (name === 'content') {
  //     setPostData((prevValue) => {
  //       return {
  //         title: prevValue.title,
  //         content: value,
  //       };
  //     });
  //   }
  // };

  const handleSubmission = async (e) => {
    e.preventDefault();

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

      <CKEditor
        editor={ClassicEditor}
        data="<p>Hello from CKEditor 5!</p>"
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setPostData((preValue) => {
            return {
              content: data,
            };
          });
          console.log({ event, editor, data });
        }}
        onBlur={(event, editor) => {
          console.log('Blur.', editor);
        }}
        onFocus={(event, editor) => {
          console.log('Focus.', editor);
        }}
      />
      <br />
      <button onClick={handleSubmission}>Submit</button>

      {/* <form onSubmit={handleSubmission}>
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
      </form> */}
    </div>
  );
};

export default Create;
