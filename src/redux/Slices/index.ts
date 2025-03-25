import { combineReducers } from "redux";
import authReducer from "./AuthSlice/authSlice"
import formReducer from './AuthSlice/formSlice';
import pricingReducer from './pricingSlice';

const rootReducer = combineReducers({
  Auth:authReducer,
  form: formReducer,
  pricing: pricingReducer
  
});

export default rootReducer;
