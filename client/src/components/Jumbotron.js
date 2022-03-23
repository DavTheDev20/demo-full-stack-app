import './Jumbotron.css';

const Jumbotron = (props) => {
  return (
    <div className="jumbotron">
      <h1>{props.text}</h1>
    </div>
  );
};

export default Jumbotron;
