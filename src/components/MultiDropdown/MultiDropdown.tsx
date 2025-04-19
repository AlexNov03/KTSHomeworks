import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import React, { useRef, useState } from 'react';
import Input from 'components/Input';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import Icon from 'components/icons/Icon';
import { CategoriesData } from 'models/Categories/CategoriesData';
import { Promisable } from '../../utils/utils';

import styles from './MultiDropdown.module.scss';

export type DropDownProps = {
  options: CategoriesData[];

  value: CategoriesData[];

  checkOption: (option: CategoriesData) => Promisable<void>;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: CategoriesData[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: CategoriesData[];
  /** Callback, вызываемый при выборе варианта */
  checkOption: (option: CategoriesData) => Promisable<void>;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** строка которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  title: string;

  filterOptions: (val: string) => Promisable<void>;

  dropdownInputVal: string;

  setDropdownInputVal: (val: string) => Promisable<void>;
};

export const DropDown: React.FC<DropDownProps> = observer(({ options, value, checkOption }) => {
  const variants = options.map((option) => {
    const checked = value.find((elem) => elem.id === option.id);
    return (
      <div
        key={option.id}
        onClick={() => {
          checkOption(option);
        }}
        className={classNames('dropdown-option', styles['dropdown-option'], checked ? styles['checked'] : '')}
      >
        {option.name}
      </div>
    );
  });

  return <div className={styles['dropdown-options']}>{variants}</div>;
});

const MultiDropdown: React.FC<MultiDropdownProps> = (props) => {
  const {
    options,
    value,
    checkOption,
    disabled,
    title,
    filterOptions,
    setDropdownInputVal,
    dropdownInputVal,
    className,
    ...restProps
  } = props;

  const [isVisible, setVisibility] = useState(false);

  const dropdownContainer = useRef<HTMLDivElement | null>(null);

  const inputNode = useRef<HTMLInputElement | null>(null);

  const dropdownClass = classNames(styles['dropdown-container'], className);

  React.useEffect(() => {
    const func = (event: MouseEvent) => {
      if (dropdownContainer.current?.contains(event.target as Node)) {
        setVisibility(true);
      } else {
        setVisibility(false);
      }
    };

    document.addEventListener('click', func);
    return () => document.removeEventListener('click', func);
  }, []);

  const handleChange = () => {
    if (inputNode.current) {
      const searchStr = inputNode.current.value;
      setDropdownInputVal(searchStr);
      filterOptions(searchStr);
    }
  };

  const afterSlot = (
    <Icon width={25} height={24} color="secondary">
      <ArrowDownIcon />
    </Icon>
  );

  return (
    <div ref={dropdownContainer} className={dropdownClass}>
      <Input
        {...restProps}
        ref={inputNode}
        disabled={disabled}
        onChange={handleChange}
        placeholder={title}
        afterSlot={afterSlot}
        value={dropdownInputVal}
      />
      {!disabled && isVisible && <DropDown options={options} value={value} checkOption={checkOption} />}
    </div>
  );
};

export default MultiDropdown;
