import { Routes, Route } from 'react-router-dom';
import FrontRoutes from './routes/FrontRoutes';
import AdminRoutes from './routes/AdminRoutes';

function App() {
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
