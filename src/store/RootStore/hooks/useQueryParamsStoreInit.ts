import { useLocation } from 'react-router';

import rootStore from '../RootStore/instance';

export const useQueryParamsStoreInit = (): void => {
  const { search } = useLocation();
  rootStore.query.setSearch(search);
};
