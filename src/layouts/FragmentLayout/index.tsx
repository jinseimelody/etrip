import {Outlet} from 'react-router-dom';

import {createContext} from 'react';

const LayoutContext = createContext({});

const FragmentLayout = () => {
  return (
    <LayoutContext.Provider value={{}}>
      <Outlet />
    </LayoutContext.Provider>
  );
};

export default FragmentLayout;
