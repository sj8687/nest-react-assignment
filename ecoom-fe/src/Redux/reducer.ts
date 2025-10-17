import { DELETE_UPLOAD_SUCCESS, FETCH_CART_SUCCESS, FETCH_UPLOADS_SUCCESS, UPDATE_UPLOAD_SUCCESS, UPLOAD_IMAGE_SUCCESS } from "./constant";

interface Product {
  _id: string;
}

interface State {
  products: Product[];
}

const initialState: State = {
  products: [],
};

export const productReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UPLOAD_IMAGE_SUCCESS:
      return { ...state, products: action.payload };

    case FETCH_UPLOADS_SUCCESS:
      return { ...state, products: action.payload };

    case DELETE_UPLOAD_SUCCESS:
      return { ...state, products: state.products.filter(u => u._id !== action.payload) };

     case UPDATE_UPLOAD_SUCCESS:
      return { ...state, products: action.payload  };  

      case FETCH_CART_SUCCESS:
      return { ...state, products: action.payload };
    default:
      return state;
  }
};



