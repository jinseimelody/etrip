import {Navigate, Outlet} from 'react-router-dom';
import {useSelector} from 'react-redux';
import Header from './Header';
import LayoutProvider from './Context';
import Sidebar from './Sidebar';
import {IStore} from '~/interfaces';

const AdminLayout: React.FC<{children?: React.ReactNode}> = ({children}) => {
  const auth = useSelector((store: IStore) => store.auth);

  const isAuth = () => {
    if (!auth) return <Navigate to="/login" />;

    const {roles} = auth;
    if (!roles.includes('admin')) return <Navigate to="/" />;

    return (
      <LayoutProvider>
        <Header />
        <Sidebar />
        <div className="container">
          {children}
          <Outlet />
        </div>
      </LayoutProvider>
    );
  };

  return isAuth();
};

export default AdminLayout;
