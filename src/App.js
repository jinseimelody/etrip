import React from 'react';
import {BrowserRouter, Outlet, Route, Routes} from 'react-router-dom';
import {RouteConfig} from '~/config';
import {ApplicationContext} from '~/context';
import {ToastProvider} from './components/Toast';
import {BusinessLayout} from './layouts';
import {
  Dashboard,
  Login,
  Schedule,
  SeatSelection,
  Signup,
  Trips,
  TripSearch,
  TripSelection
} from './screens';

/* <Routes>{RouteConfig.build()}</Routes> */

const App = () => {
  const device = {width: window.innerWidth, height: window.innerHeight};

  return (
    <ApplicationContext.Provider value={{device}}>
      <div className="app" style={{minHeight: device.height}}>
        <ToastProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path="/dashboard"
                element={
                  <BusinessLayout>
                    <Dashboard />
                  </BusinessLayout>
                }></Route>
              <Route path="/search" element={<TripSearch />}></Route>
              <Route path="/search/:from/:to/:date" element={<TripSelection />}></Route>
              <Route path="/ticketbooking/:scheduleId/:date" element={<SeatSelection />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/signup" element={<Signup />}></Route>

              <Route
                path="/trips"
                element={
                  <BusinessLayout>
                    <Trips />
                  </BusinessLayout>
                }></Route>
              <Route
                path="/schedule"
                element={
                  <BusinessLayout>
                    <Schedule />
                  </BusinessLayout>
                }></Route>
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </div>
    </ApplicationContext.Provider>
  );
};

export default App;
