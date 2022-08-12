import React, {useContext, useState} from 'react';

import {storage} from '~/api';

const AppContext = React.createContext();
const useApp = () => useContext(AppContext);

const AppProvider = props => {
  const {children} = props;
  const [state, setState] = useState({
    token: storage.get('token')
  });

  const setToken = token => {
    setState({token});
    storage.set('token', token);
  };

  return <AppContext.Provider value={{state, setToken}}>{children}</AppContext.Provider>;
};

export {AppProvider, useApp};
