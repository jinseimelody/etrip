import Header from './Header';
import Sidebar from './Sidebar';

const Default = ({children}) => {
  return (
    <div>
      <Header />
      <div className="container">
        <Sidebar />
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default Default;
