import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { addCartFailure, addCartRequest, addCartSuccess, deleteUploadFailure, deleteUploadRequest, deleteUploadSuccess, fetchCartRequest, fetchUploadsFailure, fetchUploadsRequest, fetchUploadsSuccess, updateUploadFailure, updateUploadRequest, updateUploadSuccess, uploadImageFailure, uploadImageRequest, uploadImageSuccess } from "./createSlice";

function* fetchProducts(): Generator<any, void, any> {
  try {
    const response = yield call(axios.get, "http://localhost:3000/admin/all",
      {
        withCredentials: true,
      });

    console.log(response.data);


    yield put(fetchUploadsSuccess(response.data));
  }
  catch (error: any) {
    console.log(error.message);

    yield put(fetchUploadsFailure(error));
  }
}


function* setProducts(action: any): Generator<any, void, any> {
  try {

    console.log(action.payload);

    yield call(axios.post, "http://localhost:3000/admin/admin", action.payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

    yield put(uploadImageSuccess());
    yield put(fetchUploadsRequest());
  } catch (error: any) {
    yield put(uploadImageFailure(error.message));
  }
}


function* deleteProducts(action: any): Generator<any, void, any> {
  try {

    console.log(action);
    
    yield call(axios.delete, `http://localhost:3000/admin/delete/${action.payload}`, {
      withCredentials: true
    })

    yield put(deleteUploadSuccess(action.payload));
    yield put(fetchUploadsRequest());


  } catch (error: any) {
    yield put(deleteUploadFailure(error.message));
  }
}


function* updateProducts(action: any): Generator<any, void, any> {
  try {
    const {id,formData} = action.payload;

    console.log(id,formData);
    
    const response = yield call(axios.patch, `http://localhost:3000/admin/update/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true
    })
        yield put(updateUploadSuccess(response.data.updated));
            yield put(fetchUploadsRequest());



  } catch (error : any) {
       yield put(updateUploadFailure(error))

  }
}


function* addCart(action: any): Generator<any, void, any> {
  try {
   const {imagePath, title, price} = action.payload;
   console.log("addcart",imagePath,title,price);
    yield call(axios.post, "http://localhost:3000/cart/add", {image:imagePath, title, price},{
      withCredentials: true
    })
    yield put(addCartSuccess());


  } catch (error:any) {
      yield put(addCartFailure(error))
  }
}


function* fetchCartProducts(): Generator<any, void, any> {
  try {
    const response = yield call(axios.get, "http://localhost:3000/cart/my", {
      withCredentials: true
    })
    yield put(fetchUploadsSuccess(response.data));
  } catch (error:any) {
yield put(fetchUploadsFailure(error));  }
}




function* productSaga() {
  yield takeEvery(fetchUploadsRequest.type, fetchProducts);
  yield takeEvery(uploadImageRequest.type, setProducts);
  yield takeEvery(deleteUploadRequest.type, deleteProducts)
  yield takeEvery(updateUploadRequest, updateProducts);
  yield takeEvery(addCartRequest.type,addCart)
  yield takeEvery(fetchCartRequest.type,fetchCartProducts)
}



export default productSaga;



