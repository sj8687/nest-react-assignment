import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/Redux/store'; 
import { addCartRequest, fetchUploadsRequest } from '@/Redux/createSlice';

const Hero = () => {
  const dispatch = useDispatch();

  const { uploads,loading,error   } = useSelector((state: RootState) => state.admin.adminSlice );

  useEffect(() => {
    dispatch(fetchUploadsRequest());
  }, [dispatch]);


 if (loading) {
  return <div>Loading...</div>;
}

if (error) {
  console.log("Error:", error);
  return <div className='text-2xl text-black'>Error: {error.message }</div>;
}



  

  const handleProduct = (product: any) => {
    dispatch(addCartRequest(product));
  };

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-2 mt-3 lg:grid-cols-3 gap-8 p-6">
      {
         uploads.map((product: any) => (
            <div
              key={product._id}
              className="flex flex-col items-center p-4 rounded-lg transition"
            >
              <div className="relative group">
                <img
                  src={product.imagePath}
                  alt={product.name}
                  className="sm:w-100 sm:h-100 w-36 h-40 object-cover mb-4 rounded-md transition-opacity duration-300"
                />
              </div>

              <h2
                className={`text-[16px] flex items-center justify-center text-center font-semibold mb-1`}
              >
                {product.name}
              </h2>

              <p className="text-gray-800 font-medium mb-4">
                ₹{product.price}
              </p>

              <button
                onClick={() => handleProduct(product)}
                className="mt-auto font-semibold w-full border cursor-pointer border-black py-1 sm:py-2 rounded-md hover:bg-black hover:text-white transition-colors"
              >
                Add to Cart
              </button>
            </div>
          ))}
    </div>
  );
};

export default Hero;
