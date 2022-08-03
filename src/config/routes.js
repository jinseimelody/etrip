import {Fragment} from 'react';
import {Route} from 'react-router-dom';

import {DefaultLayout, BusinessLayout} from '~/layouts';
import {RequireAgent} from '~/middlewares';
import {
  Trips,
  Schedule,
  Login,
  NotFound,
  Home,
  Dashboard,
  NotSupported,
  Sample,
  TripSearch,
  TripSelection,
  SeatSelection
} from '~/screens';

const paths = {
  public: [
    {path: '/', component: Home},
    {path: '/login', component: Login, layout: null},
    {path: '/tripsearch', component: TripSearch, layout: null},
    {path: '/tripselection/:from/:to/:date', component: TripSelection, layout: null},
    {path: '/seatselection/:scheduleId/:date', component: SeatSelection, layout: null}
  ],
  private: [
    {path: '/dashboard', component: Dashboard, layout: BusinessLayout},
    {path: '/trips', component: Trips, layout: BusinessLayout},
    {path: '/schedule', component: Schedule, layout: BusinessLayout},
    {path: '/sample', component: Sample, layout: BusinessLayout}
  ]
};

const RouteConfig = {};
RouteConfig.build = () => {
  paths.public.forEach(x => (x.auth = false));
  paths.private.forEach(x => (x.auth = true));
  return (
    <>
      {[...paths.public, ...paths.private].map((route, i) => {
        // config layout
        const Layout =
          {
            [null]: Fragment,
            [undefined]: DefaultLayout
          }[route.layout] || route.layout;

        const Screen = route.component;
        return (
          <Route
            key={i}
            path={route.path}
            element={
              <RequireAgent>
                <Layout>
                  <Screen />
                </Layout>
              </RequireAgent>
            }
          />
        );
      })}
      <Route path="/notsupported" element={<NotSupported />} />
      <Route path="*" element={<NotFound />} />
    </>
  );
};
export {RouteConfig};
