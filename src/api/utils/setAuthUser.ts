import { setUser } from '../../redux/authSlice';
import { AppDispatch } from '../../store/store';

interface AuthData {
  name: string;
  email: string;
  userId: string;
  accessToken: string;
}

export const storeUserInRedux = (dispatch: AppDispatch, data: AuthData) => {
  dispatch(
    setUser({
      name: data.name,
      email: data.email,
      userId: data.userId,
      userToken: data.accessToken,
    })
  );
};
