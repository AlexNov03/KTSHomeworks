import { useLocalStore, observer } from 'mobx-react-lite';
import React from 'react';
import { ProductsQueryParamsNames } from 'api/ApiProducts/ApiProducts';
import Button from 'components/Button';
import Input from 'components/Input';
import MultiDropdown from 'components/MultiDropdown';
import Text from 'components/Text';
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

  return (
    <div className={styles['searchbar']}>
      <div className={styles['searchbar__input']}>
        <Input placeholder="Search Product" value={searchBarStore.inputVal} onChange={inputOnChange} />
        <Button className={styles['searchbar__input-btn']} onClick={onSearchClick}>
          <Text view="button" color="button">
            Find Now
          </Text>
        </Button>
      </div>
      <MultiDropdown
        className={styles['searchbar__dropdown']}
        options={searchBarStore.currentDropdownOptions}
        value={searchBarStore.dropdownVal}
        checkOption={searchBarStore.checkOption}
        title={searchBarStore.title}
        filterOptions={searchBarStore.filterOptions}
        dropdownInputVal={searchBarStore.dropdownInputVal}
        setDropdownInputVal={searchBarStore.setDropdownInputVal}
      />
    </div>
  );
};

export default observer(SearchBar);
