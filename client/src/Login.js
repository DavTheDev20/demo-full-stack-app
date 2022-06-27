import axios from 'axios';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Jumbotron from './components/Jumbotron';

const Login = () => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });

  const [cookies, setCookie] = useCookies(['token']);

  const navigate = useNavigate();
  const { REACT_APP_API_URL } = process.env;

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
      url: `${REACT_APP_API_URL}/user/login`,
      data: userInfo,
    })
      .then((res) => {
        console.log(res);
        setCookie('token', res.data.token);
        navigate('/profile');
        window.location.reload();
      })
      .catch((err) => {
        alert(err.response.data.msg);
        console.log(err.response);
      });
  };

  return (
    <div>
      <Jumbotron text={'Login'} />
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
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
