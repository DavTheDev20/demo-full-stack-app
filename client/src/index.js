import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './About';
import NavBar from './components/NavBar';
import Register from './Register';
import Login from './Login';
import { CookiesProvider } from 'react-cookie';
import cookie from 'cookie';
import Posts from './Posts';
import Create from './Create';
import Post from './Post';
import Edit from './Edit';
import Profile from './Profile';

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/about" element={<About />} />
          {cookie.parse(document.cookie).token ? null : (
            <Route path="/register" element={<Register />} />
          )}
          {cookie.parse(document.cookie).token ? null : (
            <Route path="/login" element={<Login />} />
          )}
          {cookie.parse(document.cookie).token ? (
            <Route path="/posts" element={<Posts />} />
          ) : null}
          {cookie.parse(document.cookie).token ? (
            <Route path="/create" element={<Create />} />
          ) : null}
          {cookie.parse(document.cookie).token ? (
            <Route path="/posts/:postId" element={<Post />} />
          ) : null}
          {cookie.parse(document.cookie).token ? (
            <Route path="/posts/edit/:postId" element={<Edit />} />
          ) : null}
          {cookie.parse(document.cookie).token ? (
            <Route path="/profile" element={<Profile />} />
          ) : null}
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
