import './App.css';
import { Link } from 'react-router-dom';
import Jumbotron from './components/Jumbotron';
import { useCookies } from 'react-cookie';

const App = () => {
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookies] = useCookies(['token']);

  return (
    <div className="App">
      <Jumbotron text={'Welcome to the Demo Blog App'} />

      {cookies.token ? (
        <h2 style={{ textAlign: 'center' }}>Enjoy the Demo Experience!</h2>
      ) : (
        <Link to={'/register'}>
          <button>Register Today!</button>
        </Link>
      )}
    </div>
  );
};

export default App;
