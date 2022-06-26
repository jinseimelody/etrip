import {Fragment} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {publicPaths, privatePaths} from '~/config';
import {DefaultLayout} from '~/layouts';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {[...publicPaths, ...privatePaths].map((route, i) => {
            // config layout
            let Layout = undefined;
            switch (route.layout) {
              case null:
                Layout = Fragment;
                break;
              case undefined:
                Layout = DefaultLayout;
                break;
              default:
                Layout = route.layout;
            }

            const Screen = route.component;
            return (
              <Route
                key={i}
                path={route.path}
                element={
                  <Layout>
                    <Screen />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
