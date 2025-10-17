import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Signup';
import AdminDashboard from './components/AdminDash/AddProducts';
import Layout from './AppLayout'; // The layout component
import Hero from './components/Hero/Hero';
import MyCart from './components/Cart/Cart';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Layout />}>

          <Route index element={<Hero />} />
          <Route path="/about" element={<div>hello</div>} />
          <Route path="/login" element={<Login />} />
          <Route path="/AdminDash" element={<AdminDashboard />} />
          <Route path="/Cart" element={<MyCart />} />

        </Route>
      </Routes>


    </BrowserRouter>
  );
}

export default App;
