// AppRouter.jsx
import { Route, Routes } from 'react-router-dom';
import Homepage from './Homepage'; // Import Homepage component
import App from './App'; // Import App component
import Searchers from './Searchers'; // Import Searchers component
import Subletters from './Subletters'; // If you have this component

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} /> {/* Homepage route */}
      <Route path="/searchers" element={<Searchers />} /> {/* Searchers route */}
      <Route path="/subletters" element={<Subletters />} /> {/* Subletters route */}
    </Routes>
  );
}

export default AppRouter;
