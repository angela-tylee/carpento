// TODO: 刪除，已改為 MessageContext

import { useState, useEffect, useRef } from 'react';
import { Toast } from 'bootstrap';
// import Message from '../components/Message';

function useMessage() {

  // const [messageState.type, setMessageState.type] = useState('');
  // const [message, setMessage] = useState('')

  const [messageState, setMessageState] = useState({type: '', message: ''});

  const successMessage = useRef(null);

  useEffect(() => {
    successMessage.current = new Toast('#myToast');
  }, []);

  // useEffect(() => {
  //   console.log("useEffect", messageState.type, messageState.message);

  //   if (messageState.type && messageState.message) {
  //     successMessage.current?.show();
  //     console.log("useEffect after", messageState.type, messageState.message);
  //   }
  // }, [messageState]);

  const showMessage = (type, text) => {
    console.log("show message");
    console.log("useMessage", type, text);

    // setMessageState.type(type);
    // setMessage(text);
    setMessageState({type: type, message: text});

    console.log("useMessage setState", messageState.type, messageState.message);

    // Ensuring the state updates and DOM changes are complete before showing the message.
    setTimeout(() => {
      successMessage.current?.show();
    }, 0);

    // return (
    //   <Message type={type} text={text} />
    // )
  };

  return {
    messageType: messageState.type,
    message: messageState.message,
    showMessage,
    // Message: <Message type={messageState.type} message={message} />,
    // BootstrapMessage
  };
}

export default useMessage;