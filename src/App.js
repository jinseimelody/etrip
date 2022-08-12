import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {ToastProvider} from './components/Toast';
import {useApp} from './context/AppContext';
import {BusinessLayout, DefaultLayout} from './layouts';
import {
  Dashboard,
  Home,
  Login,
  Schedule,
  SeatSelection,
  Signup,
  Trips,
  TripSearch,
  TripSelection
} from './screens';

const App = () => {
  return (
    <div style={{height: window.innerHeight, overflowY: 'scroll'}}>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <DefaultLayout>
                  <Home />
                </DefaultLayout>
              }></Route>
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
  );
};

export default App;
