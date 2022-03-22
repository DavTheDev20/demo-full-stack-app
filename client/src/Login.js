import axios from 'axios';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });

  const [cookies, setCookie] = useCookies(['token']);

  const navigate = useNavigate();

  const handleInput = ({ target }) => {
    const { name, value } = target;

    if (name === 'email') {
      setUserInfo((prevValue) => {
        return {
          email: value,
          password: prevValue.password,
        };
      });
    } else if (name === 'password') {
      setUserInfo((prevValue) => {
        return {
          email: prevValue.email,
          password: value,
        };
      });
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    await axios({
      method: 'POST',
      url: 'http://localhost:8080/api/user/login',
      data: userInfo,
    })
      .then((res) => {
        console.log(res);
        setCookie('token', res.data.token);
        navigate('/'); // Change to posts page
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
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
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
