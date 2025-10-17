import { ADD_TO_REQUEST, DELETE_UPLOAD_REQUEST, FETCH_CART_REQUEST, FETCH_UPLOADS_REQUEST, UPDATE_UPLOAD_REQUEST, UPLOAD_IMAGE_REQUEST } from "./constant";

export const UploadProduct = (formData: any) => {
  console.log("Action dispatched:", formData);
  return {
    type: UPLOAD_IMAGE_REQUEST,
    payload: formData,
  };
};


export const FetchProducts = () => {
  return {
    type: FETCH_UPLOADS_REQUEST,
  };
}

export const DeleteProducts = (id:any) => {
  return {
    type: DELETE_UPLOAD_REQUEST,
    payload:id
  };
}

export const UpdateProducts = (payload: { id: any, formData: any }) => {
  return {
    type: UPDATE_UPLOAD_REQUEST,
    payload
  }
}

export const addToCart = (product: any) => {
  return {
    type: ADD_TO_REQUEST,
    payload: product,
  };
}

export const fetchCartItems = () => {
  return {
    type: FETCH_CART_REQUEST,
  };
}

