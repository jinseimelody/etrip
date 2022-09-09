import {Routes, Route} from 'react-router-dom';
import {useSelector} from 'react-redux';
import './App.scss';

import {DefaultLayout, FragmentLayout} from './layouts';
import {
  Home,
  Sample,
  Search,
  Reservation,
  TicketDetails,
  PassengerContact,
  ReservationConfirm
} from './pages';
import {LoadingProvider, ToastProvider} from '~/components';
import {BookingHistory} from './pages/BookingHistory';
import Payment from './pages/Reservation/Payment';

function App() {
  const device = useSelector(state => state.device);
  return (
    <div className="app" style={{height: device.height}}>
      <LoadingProvider>
        <ToastProvider>
          <Routes>
            <Route
              path="/"
              element={
                <DefaultLayout>
                  <Home />
                </DefaultLayout>
              }></Route>
            <Route
              path="/bookinghistory"
              element={
                <DefaultLayout>
                  <BookingHistory />
                </DefaultLayout>
              }></Route>
            <Route
              path="/tickets/:ticketId"
              element={
                <FragmentLayout title="Ticket details">
                  <TicketDetails />
                </FragmentLayout>
              }></Route>
            <Route
              path="/search/:from/:to/:date"
              element={
                <FragmentLayout title="Trip selection">
                  <Search />
                </FragmentLayout>
              }></Route>

            <Route path="/reservation" element={<FragmentLayout />}>
              <Route
                path="1/:scheduleId/:date"
                element={<Reservation />}></Route>
              <Route
                path="2/:scheduleId/:date"
                element={<PassengerContact />}></Route>
              <Route
                path="3/:scheduleId/:date"
                element={<ReservationConfirm />}></Route>
              <Route
                path="4/:sessionId/:ticketId"
                element={<Payment />}></Route>
            </Route>
            <Route
              path="/sample"
              element={
                <FragmentLayout title="Sample page">
                  <Sample />
                </FragmentLayout>
              }></Route>
          </Routes>
        </ToastProvider>
      </LoadingProvider>
    </div>
  );
}

export default App;
