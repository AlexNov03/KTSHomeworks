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

  onChange: (value: CategoriesData[]) => Promisable<void>;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: CategoriesData[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: CategoriesData[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: CategoriesData[]) => Promisable<void>;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: CategoriesData[]) => string;
};

const DropDown: React.FC<DropDownProps> = ({ options, value, onChange }) => {
  const variants = options.map((option) => {
    const checked = value.find((elem) => elem.id === option.id);
    return (
      <div
        key={option.id}
        onClick={() => {
          const foundOption = value.find((elem) => elem.id === option.id);

          if (foundOption) {
            onChange(value.filter((elem) => elem.id !== option.id));
          } else {
            onChange([...value, option]);
          }
        }}
        className={classNames('dropdown-option', styles['dropdown-option'], checked ? styles['checked'] : '')}
      >
        {option.name}
      </div>
    );
  });

  return <div className={styles['dropdown-options']}>{variants}</div>;
};

export const ObservableDropDown = observer(DropDown);

const MultiDropdown: React.FC<MultiDropdownProps> = (props) => {
  const { options, value, onChange, disabled, getTitle, className, ...restProps } = props;

  const [curOptions, setCurOptions] = useState(options);

  const [placeholder, setPlaceholder] = useState(getTitle(value));

  const [isVisible, setVisibility] = useState(false);

  const [inputVal, setInputVal] = useState('');

  const dropdownContainer = useRef<HTMLDivElement | null>(null);

  const inputNode = useRef<HTMLInputElement | null>(null);

  const dropdownClass = classNames(styles['dropdown-container'], className);

  React.useEffect(() => {
    setPlaceholder(getTitle(value));
    console.log(value);
  }, [value]);

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

  React.useEffect(() => {
    const val = inputNode.current;
    if (!val) {
      return;
    }
    if (isVisible) {
      val.value = '';
    } else if (value.length !== 0) {
      val.value = placeholder;
    }
  }, [isVisible]);

  const handleChange = () => {
    if (inputNode.current) {
      const searchStr = inputNode.current.value;
      setInputVal(searchStr);
      setPlaceholder(searchStr);
      setCurOptions(options.filter((opt) => opt.name.toLowerCase().includes(searchStr.toLowerCase())));
    }
  };

  React.useEffect(() => {
    setCurOptions(options);
  }, [options]);

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
        placeholder={placeholder}
        afterSlot={afterSlot}
        value={inputVal}
      />
      {!disabled && isVisible && <ObservableDropDown options={curOptions} value={value} onChange={onChange} />}
    </div>
  );
};

export default observer(MultiDropdown);
