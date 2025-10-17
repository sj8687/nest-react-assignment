import  { useEffect } from 'react';
import { fetchCartItems } from '@/Redux/action';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/Redux/store';


const MyCart = () => {


  const dispatch = useDispatch();

  const { products } = useSelector((state: RootState) => state.admin.productReducer );


  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

 

  
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">🛒 My Cart</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product:any) => (
          <div
            key={product._id || product.title}
            className="border rounded-lg shadow-md p-4 flex flex-col items-center"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-40 object-cover rounded mb-4"
            />
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-gray-700">₹ {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCart;
