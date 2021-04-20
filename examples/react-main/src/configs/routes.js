import Home from '@/pages/home/index';
import NotFound from '@/pages/404/index';

export default [
  {
    path: '/home',
    exact: true,
    component: Home,
  },
  {
    component: NotFound,
  },
];