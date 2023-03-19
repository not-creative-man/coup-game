import { useAppSelector } from '../../hooks/redux';

export function useStoreError() {
  return useAppSelector((state) => state.error);
}
