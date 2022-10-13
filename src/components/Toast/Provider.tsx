import {ToastContext} from './useToast';
import React, {useEffect, useRef, useState} from 'react';
import Toast, {ToastOption, ToastProps} from './Toast';

type Props = {
  children: React.ReactNode;
};

const ToastProvider: React.FC<Props> = ({children}) => {
  const [toast, setToast] = useState<ToastProps>();
  const actionRef = useRef<string>();
  const memoRef = useRef<ToastProps>();

  useEffect(() => {
    if (!memoRef.current) return;
    if (!['close', 'confirm'].find(v => v === actionRef.current)) return;

    const {onClose, onConfirm} = memoRef.current;
    const action = {
      close: () => {
        onClose && onClose();
        cleanupRef();
      },
      confirm: () => {
        onConfirm && onConfirm();
        cleanupRef();
      }
    }[actionRef.current as string];

    typeof action === 'function' && action();
  }, [toast]);

  const cleanupRef = () => {
    actionRef.current = undefined;
    memoRef.current = undefined;
  };

  const show = (msg: string, option: ToastOption) => {
    setToast({
      msg: msg,
      ...option,
      type: option?.type || 'default'
    });
  };

  const dispatch = (action: any) => {
    const {type} = action;
    actionRef.current = type;
    memoRef.current = toast;
    setToast(undefined);
  };

  return (
    <ToastContext.Provider value={{show}}>
      {children}
      {toast && (
        <Toast
          msg={toast.msg}
          type={toast.type}
          onClose={() => dispatch({type: 'close'})}
          onConfirm={() => dispatch({type: 'confirm'})}
        />
      )}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
