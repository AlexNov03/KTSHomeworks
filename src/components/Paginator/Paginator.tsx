import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { ProductsQueryParamsNames } from 'api/ApiProducts/ApiProducts';
import ArrowLeftIcon from 'components/icons/ArrowLeftIcon';
import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import Icon from 'components/icons/Icon';
import PaginatorStore from 'store/PaginatorStore';
import rootStore from 'store/RootStore/RootStore';

import styles from './Paginator.module.scss';

type PageItemProps = {
  pageNum?: number;
  active: boolean;
  checked?: boolean;
  onClick: (num: number) => void;
};

const PageItem: React.FC<PageItemProps> = ({ pageNum, active, checked, onClick }) => {
  return active ? (
    <div
      onClick={() => onClick(pageNum as number)}
      className={classNames(styles['paginator__page-item'], checked && styles['checked'])}
    >
      <p>{pageNum}</p>
    </div>
  ) : (
    <div className={styles['paginator__page-item']}>
      <p>...</p>
    </div>
  );
};

export type PaginatorProps = {
  paginatorStore: PaginatorStore;
};

const Paginator: React.FC<PaginatorProps> = ({ paginatorStore }) => {
  const pages: React.JSX.Element[] = [];

  const totalPages = 10;

  const currentPage = paginatorStore.offset;

  const setPage = React.useCallback((num: number) => {
    rootStore.query.addParam(ProductsQueryParamsNames.OFFSET, String(num));
  }, []);

  if (currentPage < 3) {
    for (let i = 0; i < currentPage; i++) {
      pages.push(<PageItem pageNum={i} active onClick={setPage} />);
    }
  } else {
    pages.push(<PageItem pageNum={0} active onClick={setPage} />);
    pages.push(<PageItem active={false} onClick={setPage} />);
    pages.push(<PageItem pageNum={currentPage - 1} active onClick={setPage} />);
  }

  pages.push(<PageItem pageNum={currentPage} active checked onClick={setPage} />);

  if (totalPages - currentPage < 3) {
    for (let i = currentPage + 1; i <= totalPages; i++) {
      pages.push(<PageItem pageNum={i} active onClick={setPage} />);
    }
  } else {
    pages.push(<PageItem pageNum={currentPage + 1} active onClick={setPage} />);
    pages.push(<PageItem active={false} onClick={setPage} />);
    pages.push(<PageItem pageNum={totalPages} active onClick={setPage} />);
  }

  return (
    <div className={styles['paginator']}>
      <div className={styles['paginator__button']}>
        <Icon color="primary" width={35} height={35} onClick={() => paginatorStore.decrement()}>
          <ArrowLeftIcon />
        </Icon>
      </div>
      <div className={styles['paginator__content']}>{pages}</div>
      <div className={styles['paginator__button']}>
        <Icon width={35} height={35} onClick={() => paginatorStore.increment()}>
          <ArrowRightIcon />
        </Icon>
      </div>
    </div>
  );
};

export default observer(Paginator);
