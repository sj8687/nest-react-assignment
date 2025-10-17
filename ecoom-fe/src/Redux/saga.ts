import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { ADD_TO_REQUEST, ADD_TO_SUCCESS, DELETE_UPLOAD_REQUEST, DELETE_UPLOAD_SUCCESS, FETCH_CART_REQUEST, FETCH_CART_SUCCESS, FETCH_UPLOADS_REQUEST, FETCH_UPLOADS_SUCCESS, UPDATE_UPLOAD_REQUEST, UPDATE_UPLOAD_SUCCESS, UPLOAD_IMAGE_REQUEST, UPLOAD_IMAGE_SUCCESS } from "./constant";

function* fetchProducts(): Generator<any, void, any> {
  try {
    const response = yield call(axios.get, "http://localhost:3000/admin/all",
      {
        withCredentials: true,
      });

    yield put({ type: FETCH_UPLOADS_SUCCESS, payload: response.data });
  } catch (error: any) {
    console.error("Upload error:", error);
  }
}


function* setProducts(action: any): Generator<any, void, any> {
  try {
    const response = yield call(axios.post, "http://localhost:3000/admin/admin", action.payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

    yield put({ type: UPLOAD_IMAGE_SUCCESS, payload: response.data.product });
    yield put({ type: FETCH_UPLOADS_REQUEST });
  } catch (error: any) {
    console.error("Upload error:", error);
  }
}


function* deleteProducts(action: any): Generator<any, void, any> {
  try {
    yield call(axios.delete, `http://localhost:3000/admin/delete/${action.payload}`, {
      withCredentials: true
    })

    yield put({ type: DELETE_UPLOAD_SUCCESS, payload: action.payload });
        yield put({ type: FETCH_UPLOADS_REQUEST });


  } catch (error: any) {
    console.error("delete error:", error)
  }
}


function* updateProducts(action: any): Generator<any, void, any> {
  try {
    const {id,formData} = action.payload;
    const response = yield call(axios.patch, `http://localhost:3000/admin/update/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true
    })
        yield put({ type: UPDATE_UPLOAD_SUCCESS, payload: response.data.updated });
            yield put({ type: FETCH_UPLOADS_REQUEST });



  } catch (error : any) {
        console.error("update error:", error)

  }
}


function* addCart(action: any): Generator<any, void, any> {
  try {
   const {imagePath, title, price} = action.payload;
   console.log(imagePath,title,price);
    yield call(axios.post, "http://localhost:3000/cart/add", {image:imagePath, title, price},{
      withCredentials: true
    })
    yield put({ type: ADD_TO_SUCCESS });
   
    
  } catch (error) {
    console.error("addcart eror",error);
    
  }
}


function* fetchCartProducts(): Generator<any, void, any> {
  try {
    const response = yield call(axios.get, "http://localhost:3000/cart/my", {
      withCredentials: true
    })
    yield put({ type: FETCH_CART_SUCCESS, payload: response.data });
  } catch (error) {
    console.error("fetch cart error", error);
  }
}




function* productSaga() {
  yield takeEvery(UPLOAD_IMAGE_REQUEST, setProducts);
  yield takeEvery(FETCH_UPLOADS_REQUEST, fetchProducts);
  yield takeEvery(DELETE_UPLOAD_REQUEST, deleteProducts)
  yield takeEvery(UPDATE_UPLOAD_REQUEST, updateProducts);
  yield takeEvery(ADD_TO_REQUEST,addCart)
  yield takeEvery(FETCH_CART_REQUEST,fetchCartProducts)
}



export default productSaga;



