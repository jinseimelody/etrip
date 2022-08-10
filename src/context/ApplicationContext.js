import React, {useContext} from 'react';

const ApplicationContext = React.createContext();
export const useApp = () => useContext(ApplicationContext);
export default ApplicationContext;
