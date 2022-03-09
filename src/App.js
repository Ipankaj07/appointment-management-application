import './App.css';
import { Route, Routes } from 'react-router-dom';

import AllCategory from './components/Category/AllCategory';
import Clinic from './components/Clinic/Clinic';
import Appointment from './components/Appointment/Appointment';

import Header from "./components/Header/Header"

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<AllCategory />} />
        <Route path="/clinic" element={<Clinic />} />
        <Route path="/appointment/:id" element={<Appointment />} />
      </Routes>
    </div>
  );
}

export default App;
