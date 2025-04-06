import { useLocalStore, observer } from 'mobx-react-lite';
import React from 'react';

import Button from 'components/Button';
import Input from 'components/Input';
import MultiDropdown from 'components/MultiDropdown';
import Text from 'components/Text';
import { CategoriesData } from 'models/Categories/CategoriesData';
import SearchBarStore from 'store/SearchBarStore/SearchBarStore';

import styles from './SearchBar.module.scss';

export type SearchBarProps = {
  onClick: (e: React.MouseEvent) => void;
};

const SearchBar = (props: SearchBarProps) => {
  const searchBarStore = useLocalStore(() => new SearchBarStore());

  React.useEffect(() => {
    searchBarStore.setDropdownOptions();
  }, [searchBarStore]);

  const inputOnChange = (val: string) => {
    searchBarStore.setInputVal(val);
  };

  return (
    <div className={styles['searchbar']}>
      <div className={styles['searchbar__input']}>
        <Input placeholder="Search Product" value={searchBarStore.inputVal} onChange={inputOnChange} />
        <Button onClick={props.onClick}>
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
        getTitle={(values: CategoriesData[]) =>
          values.length === 0 ? 'Filter' : values.map(({ name }) => name).join(', ')
        }
      />
    </div>
  );
};

export default observer(SearchBar);
