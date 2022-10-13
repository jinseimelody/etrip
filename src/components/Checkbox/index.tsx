import {BsCheck} from 'react-icons/bs';
import classNames from 'classnames/bind';
import style from './style.module.scss';
import {memo} from 'react';

const cx = classNames.bind(style);

type CheckboxProps = {
  selected?: boolean;
  label?: string;
  onSelect?: () => any;
};

const Checkbox: React.FC<CheckboxProps> = ({selected, label, onSelect}) => {
  const handleSelect = () => {
    onSelect && onSelect();
  };

  return (
    <>
      <div className={cx('checkbox-container')} onClick={handleSelect}>
        <div className={cx('checkbox', {selected: selected})}>{selected && <BsCheck />}</div>
        {label && <label>{label}</label>}
      </div>
    </>
  );
};

export default memo(Checkbox);
