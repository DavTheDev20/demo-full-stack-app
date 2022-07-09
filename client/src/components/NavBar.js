import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';
import { useState } from 'react';

const NavBar = () => {
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <nav>
        <Link to={'/'}>
          <h3>Blog App</h3>
        </Link>

        <ul className="desktop-nav-links">
          <li>
            <Link to={'/about'}>About</Link>
          </li>
          <li>
            {cookies.token ? (
              <button
                className="logout-button"
                onClick={(e) => {
                  e.preventDefault();
                  removeCookie('token');
                  navigate('/');
                  window.location.reload();
                }}
              >
                Logout
              </button>
            ) : (
              <Link to={'/login'}>Login</Link>
            )}
          </li>
          {cookies.token ? (
            <li>
              <Link to={'/posts'}>Posts</Link>
            </li>
          ) : null}
          {cookies.token ? (
            <li>
              <Link to={'/create'}>Create</Link>
            </li>
          ) : null}
          {cookies.token ? (
            <li>
              <Link to={'/profile'}>Profile</Link>
            </li>
          ) : null}
        </ul>

        <div className="hamburger-icon" onClick={() => setShowMenu(true)}>
          <div className="hb-line"></div>
          <div className="hb-line"></div>
          <div className="hb-line"></div>
        </div>
      </nav>
      <nav
        className="mobile-menu"
        style={showMenu ? { display: 'block' } : { display: 'none' }}
      >
        <svg
          className="close-icon"
          height="35px"
          id="Layer_1"
          version="1.1"
          viewBox="0 0 512 512"
          width="35px"
          onClick={() => setShowMenu(false)}
        >
          <path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z" />
        </svg>
        <ul className="mobile-menu-links">
          <li>
            <Link to={'/about'} onClick={() => setShowMenu(false)}>
              About
            </Link>
          </li>
          {cookies.token ? (
            <li>
              <Link
                style={{ color: 'red' }}
                to={'#'}
                onClick={(e) => {
                  setShowMenu(false);
                  e.preventDefault();
                  removeCookie('token');
                  navigate('/');
                  window.location.reload();
                }}
              >
                Logout
              </Link>
            </li>
          ) : (
            <li>
              <Link to={'/login'} onClick={() => setShowMenu(false)}>
                Login
              </Link>
            </li>
          )}

          {cookies.token ? (
            <>
              <li>
                <Link to={'/posts'} onClick={() => setShowMenu(false)}>
                  Posts
                </Link>
              </li>
              <li>
                <Link to={'/create'} onClick={() => setShowMenu(false)}>
                  Create
                </Link>
              </li>
              <li>
                <Link to={'/profile'} onClick={() => setShowMenu(false)}>
                  Profile
                </Link>
              </li>
            </>
          ) : null}
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
