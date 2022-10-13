import { createContext, useContext, useState } from "react";

export interface ILayoutState {
  navOpen: boolean;
  setNavOpen: (open: boolean) => void;
}

const LayoutContext = createContext<ILayoutState>({
  navOpen: false,
  setNavOpen: () => { },
});
const useLayout = () => useContext(LayoutContext);

const LayoutProvider: React.FC<any> = ({ children }) => {
  const [navOpen, setNavOpen] = useState(false);


  return <LayoutContext.Provider value={{
    navOpen,
    setNavOpen
  }}>
    {children}
  </LayoutContext.Provider>
}

export { useLayout }
export default LayoutProvider;