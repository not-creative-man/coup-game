import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { authorizationErrorMessage } from '../../constants/database';
import { useAppDispatch } from '../../hooks/redux';
import { homePagePath } from '../../utils/paths';
import { clearStoreError } from '../error/actions';
import { useStoreError } from '../error/hooks';
import { clearAccountData } from './actions';
import { useToken } from './hooks';

export function AccountChecker() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const token = useToken();
  const { message } = useStoreError();

  useEffect(() => {
    if (!token) navigate(homePagePath);
    if (message === authorizationErrorMessage) {
      navigate(homePagePath);
      dispatch(clearAccountData());
      dispatch(clearStoreError());
    }
  }, [token, message, location, dispatch, navigate]);

  return null;
}
