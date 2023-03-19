import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDipatch, AppState } from '../store';

export const useAppDispatch = () => useDispatch<AppDipatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
