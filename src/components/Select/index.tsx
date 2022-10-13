/* eslint-disable react-hooks/exhaustive-deps */
import {BsCheck2} from 'react-icons/bs';
import {IoIosArrowForward} from 'react-icons/io';
import {memo, useEffect, useRef, useState} from 'react';
import classNames from 'classnames/bind';
import style from './style.module.scss';
import {FaRegTimesCircle} from 'react-icons/fa';
import {FieldValues, UseFormRegisterReturn, UseFormSetValue} from 'react-hook-form';

const cx = classNames.bind(style);

export type SelectOption = {
  value: string | number;
  display: string;
};

interface SelectInitState {
  value?: string | number;
  expand?: boolean;
}

type HookField = {
  register: UseFormRegisterReturn<string>;
  setValue: UseFormSetValue<FieldValues>;
};

type Props = {
  initState?: SelectInitState;
  value?: string | number;
  label: string;
  options: SelectOption[];
  hookField?: HookField;
  onSelect?: (chosen: SelectOption) => any;
  onSearch?: (pattern: string) => any;
  onFilterClear?: () => any;
};

const Select: React.FC<Props> = ({initState, label, options, hookField, onSelect, onSearch, onFilterClear}) => {
  const [chosen, setChosen] = useState<SelectOption | undefined>();
  const [expand, setExpand] = useState(initState && initState.expand);
  const searchInputRef = useRef<any>();

  useEffect(() => {
    if (!options) return;
    setChosen(options.find(x => initState && x.value === initState.value));
  }, [options]);

  const handleSelect = (option: SelectOption) => {
    if (hookField) {
      const {setValue, register} = hookField;
      const {name} = register;
      setValue(name, option.value, {shouldValidate: true});
    }
    setChosen(option);
    !initState?.expand && setExpand(false);
    onSelect && onSelect(option);
  };

  const handleClearSearch = () => {
    searchInputRef.current.value = '';
    onFilterClear && onFilterClear();
  };

  let hookInput = hookField ? (
    <input hidden defaultValue={initState ? (initState.value as string) : ''} {...hookField.register} />
  ) : null;

  return (
    <div className={cx('select')}>
      {hookInput}
      <div className={cx('header')} onClick={() => setExpand(!expand)}>
        <div>{label}</div>
        <div className={cx('value')}>
          {chosen?.display}
          <IoIosArrowForward className={cx('btn-toggle', {expand: expand})} />
        </div>
      </div>
      <div className={cx('body', {expand: expand})}>
        <div className={cx('search-box')}>
          <input ref={searchInputRef} onChange={e => onSearch && onSearch(e.target.value)} placeholder="Search..." />
          {searchInputRef?.current?.value && (
            <FaRegTimesCircle className={cx('btn-clear')} onClick={handleClearSearch} />
          )}
        </div>
        <div className="scroll-y-container mb-3" style={{maxHeight: 102}}>
          {options.map((p, i) => (
            <div key={i} className={cx('option', {active: p.value === chosen?.value})} onClick={() => handleSelect(p)}>
              {p.display} {p.value === chosen?.value && <BsCheck2 />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(Select);
