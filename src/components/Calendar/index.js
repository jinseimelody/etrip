import {forwardRef, memo, useImperativeHandle, useRef} from 'react';
import Month from './Month';
import Week from './Week';

/* options
 * mode: year|month|week
 * preview true|false
 */

const Calendar = forwardRef((props, ref) => {
  const childrenRef = useRef();

  useImperativeHandle(ref, () => ({
    getValue: () => childrenRef.current.getValue()
  }));

  const {options} = props;
  if (!options || !options.mode) return <></>;

  return {
    month: <Month ref={childrenRef} {...props} />,
    week: <Week ref={childrenRef} {...props} />
  }[options.mode];
});

export default memo(Calendar);
