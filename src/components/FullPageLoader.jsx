import PulseLoader from 'react-spinners/PulseLoader';

const FullPageLoader = () => {
  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <PulseLoader color="#333333" size={24} />
    </div>
  );
};

export default FullPageLoader;