import {useNavigate, useParams} from 'react-router-dom';
import {useLoading, useToast} from '~/components';

const useApp = () => {
  const toast = useToast();
  const loading = useLoading();
  const navigate = useNavigate();
  const params = useParams();

  return {toast, loading, navigate, params};
};

export default useApp;
