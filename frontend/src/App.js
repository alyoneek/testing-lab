import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Regular from './pages/Regular';

import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/regular" element={<Regular />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
