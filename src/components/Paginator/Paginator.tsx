import { observer } from 'mobx-react-lite';
import * as React from 'react';
import Button from 'components/Button';
import Text from 'components/Text';
import PaginatorStore from 'store/PaginatorStore';

import styles from './Paginator.module.scss';

export type PaginatorProps = {
  paginatorStore: PaginatorStore;
};

const Paginator: React.FC<PaginatorProps> = ({ paginatorStore }) => {
  return (
    <div className={styles['paginator']}>
      <Button onClick={() => paginatorStore.decrement()}>
        <Text>Prev</Text>
      </Button>
      <div className={styles['paginator__content']}>
        <Text view="p-18" weight="medium">
          {paginatorStore.offset}
        </Text>
      </div>
      <Button onClick={() => paginatorStore.increment()}>
        <Text>Next</Text>
      </Button>
    </div>
  );
};

export default observer(Paginator);
