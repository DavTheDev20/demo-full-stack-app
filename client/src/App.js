import './App.css';
import { Link } from 'react-router-dom';
import Jumbotron from './components/Jumbotron';

const App = () => {
  return (
    <div className="App">
      <Jumbotron text={'Welcome to the Demo Blog App'} />

      <Link to={'/register'}>
        <button>Register Today!</button>
      </Link>
    </div>
  );
};

export default App;
