import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import Input from 'components/Input';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';

import styles from './MultiDropdown.module.scss';

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

export type DropDownProps = {
  options: Option[];

  value: Option[];

  onChange: (value: Option[]) => void;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

export const DropDown: React.FC<DropDownProps> = ({ options, value, onChange }) => {
  const variants = options.map((option) => {
    const checked = value.find((elem) => elem.key === option.key);
    return (
      <div
        key={option.key}
        onClick={() => {
          const foundOption = value.find((elem) => elem.key === option.key);

          if (foundOption) {
            onChange(value.filter((elem) => elem.key !== option.key));
          } else {
            onChange([...value, option]);
          }
        }}
        className={classNames('dropdown-option', styles['dropdown-option'], checked ? styles['checked'] : '')}
        data-key={option.key}
      >
        {option.value}
      </div>
    );
  });

  return <div className="dropdown-options">{variants}</div>;
};

const MultiDropdown: React.FC<MultiDropdownProps> = (props) => {
  const { options, value, onChange, disabled, getTitle, className, ...restProps } = props;

  const [curOptions, setCurOptions] = useState(options);

  const [placeholder, setPlaceholder] = useState(getTitle(value));

  const [isVisible, setVisibility] = useState(false);

  const dropdownContainer = useRef<HTMLDivElement | null>(null);

  const inputNode = useRef<HTMLInputElement | null>(null);

  const dropdownClass = classNames('dropdown-container', className ? className : '');

  React.useEffect(() => {
    setPlaceholder(getTitle(value));
  }, [value, getTitle]);

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
  }, [isVisible, placeholder, value.length]);

  const handleChange = () => {
    if (inputNode.current) {
      const searchStr = inputNode.current.value;
      setPlaceholder(searchStr);
      setCurOptions(options.filter((opt) => opt.value.toLowerCase().includes(searchStr.toLowerCase())));
    }
  };

  React.useEffect(() => {
    setCurOptions(options);
  }, [options]);

  const afterSlot = <ArrowDownIcon width={25} height={24} color="secondary" />;

  return (
    <div ref={dropdownContainer} className={dropdownClass}>
      <Input
        {...restProps}
        ref={inputNode}
        disabled={disabled}
        onChange={handleChange}
        placeholder={placeholder}
        afterSlot={afterSlot}
        value=""
      />
      {!disabled && isVisible && <DropDown options={curOptions} value={value} onChange={onChange} />}
    </div>
  );
};

export default MultiDropdown;
