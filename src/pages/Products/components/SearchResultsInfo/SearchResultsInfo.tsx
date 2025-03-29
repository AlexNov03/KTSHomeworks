import React from 'react';
import Text from 'components/Text';

import styles from './SearchResultsInfo.module.scss';

export type SearchResultsInfoProps = {
  numProducts: number;
};

const SearchResultsInfo: React.FC<SearchResultsInfoProps> = ({ numProducts }) => {
  return (
    <div className={styles['search-results-info']}>
      <Text className={styles['search-results-info__text']} weight="bold">
        Total Products
      </Text>
      <Text className={styles['search-results-info__data']} color="accent" weight="bold">
        {numProducts}
      </Text>
    </div>
  );
};

export default SearchResultsInfo;
