import { useState } from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { Login } from "./Components/Login";
import { Signup } from "./Components/Signup";
import { Navbar } from "./Components/Navbar";
import { Gallary } from "./Components/Gallary";
import { Home } from "./Components/Home";
import Upload from "./Components/Upload";
import Profile from "./Components/Profile";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Gallary" element={<Gallary />} />
          <Route path="/Upload" element={<Upload />} />
          <Route path="/Profile" element={<Profile/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
