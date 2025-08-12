import "./css/App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="app">
      <header>
        <NavBar />
      </header>
      <main className="main-content" role="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route
            path="*"
            element={
              <div className="not-found">
                <h2>404 - Page Not Found</h2>
                <p>The page you are looking for does not exist.</p>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;

