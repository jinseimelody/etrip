import {Provider as ReduxProvider} from 'react-redux/es/exports';
import {BrowserRouter} from 'react-router-dom';
import ReactDOM from 'react-dom/client';

import './style.scss';
import {store} from './redux/store';
import {LoadingProvider, ToastProvider} from './components';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <ReduxProvider store={store}>
    <LoadingProvider>
      <ToastProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ToastProvider>
    </LoadingProvider>
  </ReduxProvider>
);
