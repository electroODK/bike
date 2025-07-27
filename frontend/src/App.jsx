import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import Rent from './pages/Rent';
// import Orders from './pages/account/Orders';
// import Profile from './pages/account/Profile';
import AppAdmin from './adminsrc/App';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="/rent" element={<Rent />} /> */}
        {/* <Route path="/account/orders" element={<Orders />} /> */}
        {/* <Route path="/account/profile" element={<Profile />} /> */}
        <Route path="*" element={<h1>404 — Страница не найдена</h1>} />
        <Route path='/admin' element={<AppAdmin/>} />
      </Routes>
    </Router>
  );
}

export default App;
