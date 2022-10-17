import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Header from './components/Header';
import Todos from './Pages/Todos';
import About from './Pages/About';
import Edit from './Pages/Edit';
import Alert from "./components/Alert";


function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  return (
    <BrowserRouter>
      <Header />
      <Alert alert={alert} />
      <Routes>
        <Route path="/" element={<Todos showAlert={showAlert} />} />
        <Route path="/about" element={<About />} />
        <Route path="/edit/:id" element={<Edit showAlert={showAlert} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
