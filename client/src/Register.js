import axios from 'axios';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [cookies, setCookies] = useCookies(['token']);

  const navigate = useNavigate();

  const apiUrl = 'http://localhost:8080/api/user';

  const handleInput = ({ target }) => {
    const { name, value } = target;

    switch (name) {
      case 'username':
        setUserInfo((prevValue) => {
          return {
            username: value,
            email: prevValue.email,
            password: prevValue.password,
          };
        });
        break;
      case 'email':
        setUserInfo((prevValue) => {
          return {
            username: prevValue.username,
            email: value,
            password: prevValue.password,
          };
        });
        break;
      case 'password':
        setUserInfo((prevValue) => {
          return {
            username: prevValue.username,
            email: prevValue.email,
            password: value,
          };
        });
        break;
      default:
        console.log('Error');
    }
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    await axios({
      method: 'POST',
      url: apiUrl + '/register',
      data: userInfo,
    })
      .then((res) => {
        console.log(res.data);
        setCookies('token', res.data.token);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegistration}>
        <label>Username: </label>
        <br />
        <input
          type={'text'}
          name="username"
          value={userInfo.username}
          onChange={handleInput}
        />
        <br />
        <label>Email: </label>
        <br />
        <input
          type={'email'}
          name="email"
          value={userInfo.email}
          onChange={handleInput}
        />
        <br />
        <label>Password: </label>
        <br />
        <input
          type={'password'}
          name="password"
          value={userInfo.password}
          onChange={handleInput}
        />
        <br />
        <br />
        <button>Register</button>
      </form>
    </div>
  );
};

export default Register;
