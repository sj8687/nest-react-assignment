import { Link } from 'react-router-dom';
import { FaUserCircle, FaShoppingBag } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/Redux/store';
import { fetchCartItems } from '@/Redux/action';

export default function Navbar() {

  const [user, setUser] = useState<{ email: string,role:string } | null>(null);

  const dispatch = useDispatch();

  const { products } = useSelector((state: RootState) => state.admin.productReducer);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const cartCount = products?.length || 0;


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/auth/me", {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch (error) {
        setUser(null);
      }
    };

    fetchUser(); 
  }, []);


  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/auth/logout", {}, {
  withCredentials: true
});


      setUser(null);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="flex justify-between items-center py-4 px-8 border-b bg-white">
      <div>
        <h1 className="text-3xl font-bold">Tote</h1>
        <p className="text-sm text-gray-600">Funky Printed Bags</p>
      </div>

      <nav className="hidden md:flex gap-6 font-semibold text-black">
        <Link to="/shop" className="hover:text-gray-500">Shop</Link>
        <Link to="/about" className="hover:text-gray-500">About</Link>
        <Link to="/faq" className="hover:text-gray-500">FAQ</Link>
        <Link to="/gift-card" className="hover:text-gray-500">Gift Card</Link>
        <Link to="/contact" className="hover:text-gray-500">Contact</Link>
      </nav>

      <div className="flex items-center gap-6">


        <div className="flex items-center gap-2 cursor-pointer">
          <div>

            {
              user ? (
                <div className='flex gap-2 items-center'>
                <FaUserCircle className="text-2xl text-black" />
                  <div onClick={handleLogout} className="text-black font-medium">Logout </div>
                </div>
              ) : (
                <div className='flex '>
                  <FaUserCircle className="text-2xl text-black" />
                  <Link to="/login" className="text-black font-medium ml-2">Log In</Link>
                </div>
              )}
          </div>

          {
            user?.role === 'admin' && (
              <div className="ml-4 ">
                <Link to="/AdminDash" className="text-white bg-black font-medium p-2 rounded-xl">Admin Cart</Link>
              </div>
            )
          }
        </div>

        <div className="relative cursor-pointer">
          <Link to="/Cart">
            <FaShoppingBag className="text-2xl text-black" />
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full px-1.5">
              {cartCount}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
