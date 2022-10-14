import {memo} from 'react';

import Month from './Month';
import Week from './Week';

export default Object.assign(
  {},
  {
    Month: memo(Month),
    Week: memo(Week)
  }
);
