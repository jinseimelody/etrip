import {Routes, Route} from 'react-router-dom';
import {useSelector} from 'react-redux';

import {AdminLayout, FragmentLayout} from './layouts';
import {Dashboard, Home, Login} from './pages';
import {EndPoint, EndPointDetails, Schedule, Trip, TripDetails} from './pages/private';
import {IStore} from './interfaces';

const App = () => {
  const device = useSelector((state: IStore) => state.device);
  return (
    <div className="app" style={{height: device.height}}>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>

        <Route path="/m" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="trips" element={<Trip />} />
          <Route path="endpoints" element={<EndPoint />} />
          <Route path="schedule" element={<Schedule />} />
        </Route>

        <Route path="/m" element={<FragmentLayout />}>
          <Route path="endpoints/:id" element={<EndPointDetails />} />
          <Route path="trips/:id" element={<TripDetails />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
