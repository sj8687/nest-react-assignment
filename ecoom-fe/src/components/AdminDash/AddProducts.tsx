
// import { UploadProduct, FetchProducts, DeleteProducts, UpdateProducts } from '@/Redux/action';
import {fetchUploadsRequest, uploadImageRequest,deleteUploadRequest, updateUploadRequest } from '@/Redux/createSlice';
import type { RootState } from '@/Redux/store';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const dispatch = useDispatch();

  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);

  const [editTitle, setEditTitle] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editFile, setEditFile] = useState<File | null>(null);


  const { uploads,loading,error   } = useSelector((state: RootState) => state.admin.adminSlice );

  useEffect(() => {
    dispatch(fetchUploadsRequest());
  }, [dispatch]);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      toast("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', title);
    formData.append('price', price);

    dispatch(uploadImageRequest(formData));
    toast.success("File uploaded successfully.");
  };

  const handleDelete = (id: string) => {
    dispatch(deleteUploadRequest(id));
    toast.success("Product deleted.");
  };




  const handleUpdate = async () => {
    if (!currentProduct) return;

    const formData = new FormData();
    formData.append('title', editTitle);
    formData.append('price', editPrice);
    if (editFile) {
      formData.append('image', editFile);
    }
   
      dispatch(updateUploadRequest({ id: currentProduct._id, formData }));

      toast.success('Product updated!');
      setIsModalOpen(false);
      dispatch(fetchUploadsRequest());
      
  };



  return (
    <div className=''>
      <h1 className='m-4'>Admin Dashboard</h1>

      <form onSubmit={handleUpload}>
        <input
          type="file"
          className='border p-4 m-4'
          onChange={(e) => {
            const selectedFile = e.target.files ? e.target.files[0] : null;
            setFile(selectedFile);
          }}
        />
        <input
          type="text"
          className='border p-1 m-4'
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className='border p-1 m-4'
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
        />
        <button className='bg-black p-2 text-white rounded-2xl m-4' type="submit">Upload</button>
      </form>



      <div className="m-4">
        <h2 className="text-lg font-semibold mb-2">Uploaded Products:</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 m-4">
          {Array.isArray(uploads) && uploads.map((uploads:any) => (
            <div
              key={uploads._id}
              className="border rounded-lg shadow p-4 flex flex-col items-center text-center"
            >
              <img
                src={uploads.imagePath}
                className="w-full h-40 object-cover mb-4 rounded"
              />


              <div className="mb-4">
                <p className="font-semibold text-lg">{uploads.title}</p>
                <p className="text-gray-600">₹ {uploads.price}</p>
              </div>


              <div className="flex gap-2">
                <button
                  className="bg-blue-600 text-white px-4 py-1 rounded"
                  onClick={() => {
                    setCurrentProduct(uploads);
                    setEditTitle(uploads.title);
                    setEditPrice(uploads.price.toString());
                    setEditFile(null);
                    setIsModalOpen(true);
                  }}
                >
                  Update
                </button>

                {isModalOpen && currentProduct && (
                  <div className="fixed inset-0 bg-gray-200  bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
                      <h2 className="text-xl font-bold mb-4">Edit Product</h2>
                      <button
                        className="absolute top-2 right-2 text-gray-600 hover:text-black"
                        onClick={() => setIsModalOpen(false)}
                      >
                        ✕
                      </button>

                      <img
                        src={currentProduct.imagePath}
                        alt="Current"
                        className="w-full h-40 object-cover rounded mb-4"
                      />

                      <input
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          setEditFile(file);
                        }}
                        className="mb-3"
                      />

                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        placeholder="Title"
                        className="w-full border px-3 py-2 mb-3 rounded"
                      />

                      <input
                        type="text"
                        value={editPrice}
                        onChange={(e) => setEditPrice(e.target.value)}
                        placeholder="Price"
                        className="w-full border px-3 py-2 mb-4 rounded"
                      />

                      <button
                        onClick={handleUpdate}
                        className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                )}

                <button
                  className="bg-red-600  text-white px-4 py-1 rounded"
                  onClick={() => handleDelete(uploads._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;








