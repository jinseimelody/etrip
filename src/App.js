import {BrowserRouter, Routes} from 'react-router-dom';
import {RouteConfig} from '~/config';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>{RouteConfig.build()}</Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
