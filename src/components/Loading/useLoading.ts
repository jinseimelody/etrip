import React from "react";
import { useContext } from "react";

type ContextProps = {
  show: () => any;
  hide: () => any;
}

const LoadingContext = React.createContext<ContextProps>({ show: () => { }, hide: () => { } });
const useLoading = () => useContext(LoadingContext);


export { useLoading, LoadingContext };