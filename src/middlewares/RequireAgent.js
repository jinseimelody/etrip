import {Navigate, useLocation} from 'react-router-dom';

const RequireAgent = ({children}) => {
  const browsers = ['Chrome', 'iPhone', 'Mac OS'];
  const supported = browsers.find(b => navigator.userAgent.includes(b));

  let location = useLocation();
  if (supported) {
    return children;
  }

  return <Navigate to="/notsupported" state={{from: location}} replace />;
};
export default RequireAgent;
