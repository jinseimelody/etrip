import React, { useContext } from 'react'

type ContextProps = {
    show?: any
}

const ToastContext = React.createContext<ContextProps>({ show: undefined });
const useToast = () => useContext(ToastContext);

export { ToastContext, useToast };