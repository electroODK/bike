// src/App.jsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AppAdmin from "./adminsrc/App";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { AppProvider } from "../AuthContext.jsx";
import Page404 from "./pages/404/404.jsx";
import Rent from "./pages/Rent/Rent.jsx";

function App() {
  return (
    <Router>
      <AppProvider>
        <Header />

        <div style={{ flex: "1 0 auto" }}>
          <Routes>
            <Route
              path="/"
              element={
                <h1 style={{ textAlign: "center", padding: "50px" }}>
                  Главная страница
                </h1>
              }
            />

            <Route path="/Rent" element={<Rent />} />
            {/* <Route path="/account/orders" element={<Orders />} /> */}
            {/* <Route path="/account/profile" element={<Profile />} /> */}

            <Route path="/admin" element={<AppAdmin />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </div>
        <Footer />
      </AppProvider>
    </Router>
  );
}

export default App;
