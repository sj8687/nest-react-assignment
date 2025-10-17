import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar/Nav';
import Footer from './components/Footer/Footer';

const Layout = () => {
  return (
    <div>
      <Navbar /> 
      <main>
        <Outlet />
      </main>
       <Footer />
    </div>
  );
};

export default Layout;
