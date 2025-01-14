import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Toast } from 'bootstrap';

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [messageType, setMessageType] = useState('');
  const [message, setMessage] = useState('');
  const successMessage = useRef(null);

  useEffect(() => {
    successMessage.current = new Toast('#myToast');

    // Cleanup when component unmounts
    return () => {
      if (successMessage.current) {
        successMessage.current.dispose();
      }
    };

  }, []);

  // useEffect(() => {
  //   if (messageType && message) {
  //     successMessage.current?.show();
  //   }
  // }, [messageType, message]);

  const showMessage = (type, text) => {
    setMessageType(type);
    setMessage(text);

    setTimeout(() => {
      successMessage.current?.show();
    }, 0)

    // setTimeout(() => {
    //   clearMessage();
    // }, 3000)

  };

  const clearMessage = () => {
    setMessageType('');
    setMessage('');
  };

  return (
    <MessageContext.Provider value={{ messageType, message, showMessage, clearMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessage must be used within a MessageProvider');
  }
  return context;
};