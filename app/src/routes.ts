import Home from '@/pages/Home';
import Layout from '@/layouts/Layout';

export default [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/home',
        exact: true,
        component: Home
      },
      {
        path: '/',
        // 重定向
        redirect: '/home'
      }
    ]
  }
];
