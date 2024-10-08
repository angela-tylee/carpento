function Message() {
  return (
    <div
      className='toast-container position-fixed'
      style={{ top: '15px', right: '15px' }}
    >
      <div
        className='toast show'
        role='alert'
        aria-live='assertive'
        aria-atomic='true'
        data-delay='3000'
      >
        <div className={`toast-header text-white bg-success`}>
          <strong className='me-auto'>Message</strong>
          <button
            type='button'
            className='btn-close'
            data-bs-dismiss='toast'
            aria-label='Close'
          />
        </div>
        <div className='toast-body'>Message Content</div>
      </div>
    </div>
  );
}

export default Message;
