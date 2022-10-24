import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import About from "./components/About";
import Contact from "./components/Contact";
import Home from "./components/Home";
import Signup from "./components/Signup";
import ErrorPage from "./components/ErrorPage";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [auth, setAuth] = useState(false);
  const handleAuth = function () {
    setAuth((s) => !s);
    console.log(auth);
  };

  return (
    <BrowserRouter>
      <Navbar />
      {/* <button onClick={handleAuth}>auth</button> */}
      <Routes>
        {/* protected route */}
        {/* {auth ? <Route path="/" element={<Home />} /> : null} */}
        <Route path="/" element={<Home />} />
        <Route path="product" element={<Products />}></Route>
        <Route path="about" element={<About />}></Route>
        <Route path="contact" element={<Contact />}></Route>
        <Route path="signup" element={<Signup />}></Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
