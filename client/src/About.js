import Jumbotron from './components/Jumbotron';

const About = () => {
  return (
    <div>
      <Jumbotron text={'About'} />
      <p
        style={{
          textAlign: 'center',
          width: '50%',
          margin: '15px auto',
          fontSize: '1.05rem',
          lineHeight: '1.5',
        }}
      >
        <strong>
          Welcome to this application, we are glad you could join us for the
          beta testing phase!
        </strong>{' '}
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Enim ut sem viverra
        aliquet. Ac placerat vestibulum lectus mauris ultrices eros in cursus.
        Et netus et malesuada fames ac turpis egestas integer. Orci a
        scelerisque purus semper eget duis at. Praesent tristique magna sit amet
        purus gravida quis. Leo vel fringilla est ullamcorper eget nulla
        facilisi etiam. Proin fermentum leo vel orci porta non pulvinar neque
        laoreet. Vel elit scelerisque mauris pellentesque pulvinar pellentesque.
        Nam libero justo laoreet sit. Aliquam eleifend mi in nulla posuere
        sollicitudin aliquam. Commodo ullamcorper a lacus vestibulum sed arcu
        non odio. Faucibus interdum posuere lorem ipsum dolor sit amet
        consectetur. Eu turpis egestas pretium aenean pharetra magna ac placerat
        vestibulum. Amet volutpat consequat mauris nunc. Venenatis tellus in
        metus vulputate eu scelerisque felis imperdiet proin. Facilisi etiam
        dignissim diam quis enim lobortis scelerisque fermentum dui. Etiam erat
        velit scelerisque in. Vitae et leo duis ut diam quam. Id nibh tortor id
        aliquet lectus proin.
      </p>
    </div>
  );
};

export default About;
