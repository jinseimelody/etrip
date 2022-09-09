import {useEffect} from 'react';
import {useLoading} from '~/components';
import './sample.scss';

const Sample = () => {
  const loadingIndicator = useLoading();
  useEffect(() => {
    const timerId = setTimeout(() => {
      loadingIndicator.hide();
    }, 3 * 1000);
    return () => clearTimeout(timerId);
  });

  return (
    <div className="backdrop-s">
      <button type="" onClick={() => loadingIndicator.show()}>
        Load
      </button>
    </div>
  );
};

export default Sample;
