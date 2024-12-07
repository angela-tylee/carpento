import { Routes, Route } from 'react-router-dom';
import FrontRoutes from './routes/FrontRoutes';
import AdminRoutes from './routes/AdminRoutes';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  useEffect(() => {
    console.log(process.env.REACT_APP_API_URL, process.env.REACT_APP_API_PATH);
    (async () => {
      const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/products/all`);
      console.log(res);
    })()
  })

  return (
    <div className='App'>
      <Routes>
        {/* Front Pages Routes */}
        <Route path="/*" element={<FrontRoutes />} />
        
        {/* Admin Pages Routes */}
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </div>
  );
}

export default App;
