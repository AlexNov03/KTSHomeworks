import { useLocalStore, observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';

import { ProductsQueryParamsNames } from 'api/ApiProducts/ApiProducts';
import Button from 'components/Button';
import Input from 'components/Input';
import MultiDropdown from 'components/MultiDropdown';
import Text from 'components/Text';
import { CategoriesData } from 'models/Categories/CategoriesData';
import rootStore from 'store/RootStore/RootStore';
import SearchBarStore from 'store/SearchBarStore/SearchBarStore';

import styles from './SearchBar.module.scss';

const SearchBar = () => {
  const searchBarStore = useLocalStore(() => new SearchBarStore());

  React.useEffect(() => {
    searchBarStore.setDropdownOptions();
  }, [searchBarStore]);

  const inputOnChange = (val: string) => {
    searchBarStore.setInputVal(val);
  };

  const onSearchClick = () => {
    rootStore.query.addParam(ProductsQueryParamsNames.TITLE, searchBarStore.inputVal);
  };

  const getTitle = useCallback(
    (values: CategoriesData[]) => (values.length === 0 ? 'Filter' : values.map(({ name }) => name).join(', ')),
    [],
  );

  return (
    <div className={styles['searchbar']}>
      <div className={styles['searchbar__input']}>
        <Input placeholder="Search Product" value={searchBarStore.inputVal} onChange={inputOnChange} />
        <Button onClick={onSearchClick}>
          <Text view="button" color="button">
            Find Now
          </Text>
        </Button>
      </div>
      <MultiDropdown
        className={styles['searchbar__dropdown']}
        options={searchBarStore.dropdownOptions}
        value={searchBarStore.dropdownVal}
        onChange={searchBarStore.setDropdownVal}
        getTitle={getTitle}
      />
    </div>
  );
};

export default observer(SearchBar);
