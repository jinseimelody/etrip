import {Link} from 'react-router-dom';

const Home = () => {
  return (
    <>
      <h1>This is home page</h1>
      <Link to="/search">Find your trips</Link>
    </>
  );
};
export default Home;
