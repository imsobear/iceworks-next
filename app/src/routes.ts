import Layout from '@/layouts';
import Projects from '@/pages/Projects';
import Settings from '@/pages/Settings';
import MaterialCollection from '@/pages/MaterialCollection';

export default [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        exact: true,
        component: Projects
      },
      {
        path: '/materialCollection',
        exact: true,
        component: MaterialCollection,
      },
      {
        path: '/Settings',
        exact: true,
        component: Settings,
      }
    ]
  }
];
