import React, { useState } from 'react';

import Button from 'components/Button';
import Input from 'components/Input';
import MultiDropdown, { Option } from 'components/MultiDropdown';
import Text from 'components/Text';

import styles from './SearchBar.module.scss';

const OPTIONS = [
  { key: 'msk', value: 'Moscow' },
  { key: 'spb', value: 'Saint Petersburg' },
  { key: 'ekb', value: 'Ekaterinburg' },
];

const SearchBar = () => {
  const [inputVal, setInputVal] = useState<string>('');
  const inputOnChange = (val: string) => {
    setInputVal(val);
  };

  const [value, setValue] = useState<Option[]>([]);

  return (
    <div className={styles['searchbar']}>
      <div className={styles['searchbar__input']}>
        <Input placeholder="Search Product" value={inputVal} onChange={inputOnChange} />
        <Button>
          <Text view="button" color="button">
            Find Now
          </Text>
        </Button>
      </div>
      <MultiDropdown
        className={styles['searchbar__dropdown']}
        options={OPTIONS}
        value={value}
        onChange={setValue}
        getTitle={(values: Option[]) => (values.length === 0 ? 'Filter' : values.map(({ value }) => value).join(', '))}
      />
    </div>
  );
};

export default SearchBar;
