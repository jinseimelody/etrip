import {BusinessLayout} from '~/layouts';
import {
  Trips,
  Schedule,
  Login,
  NotFound,
  Home,
  Todo,
  Dashboard
} from '~/screens';

const publicPaths = [
  {path: '/', component: Home},
  {path: '/login', component: Login, layout: null},
  {path: '/notfound', component: NotFound, layout: null},
  {path: '/todo', component: Todo, layout: null}
];

const privatePaths = [
  {path: '/dashboard', component: Dashboard, layout: BusinessLayout},
  {path: '/trips', component: Trips, layout: BusinessLayout},
  {path: '/schedule', component: Schedule, layout: BusinessLayout}
];

export {publicPaths, privatePaths};
