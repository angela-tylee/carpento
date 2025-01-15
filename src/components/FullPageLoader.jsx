import PulseLoader from 'react-spinners/PulseLoader';
import PropagateLoader from 'react-spinners/PropagateLoader';
import ScaleLoader from 'react-spinners/ScaleLoader';

const FullPageLoader = () => {
  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      {/* <PropagateLoader color="#333333" size={24} /> */}
      {/* <ScaleLoader color="#333333" height={60} margin={8} width={12}/> */}
      <PulseLoader color="#333333" size={24} />
    </div>
  );
};

export default FullPageLoader;
