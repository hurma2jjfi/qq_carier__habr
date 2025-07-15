import './App.css';
import Header from './components/Header';
import FirstSection from './components/FirstSection';
import Login from './components/Login';
import Register from './components/Register';
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<FirstSection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
