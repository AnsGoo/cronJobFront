import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const router: AppRouteModule = {
  path: '/jobcenter',
  name: 'jobcenter',
  component: LAYOUT,
  redirect: '/jobcenter/jobs',
  meta: {
    icon: 'ant-design:dashboard-twotone',
    title: 'Job管理',
  },
  children: [
    {
      path: 'jobs',
      name: 'Job',
      component: () => import('/@/views/job/JobList.vue'),
      meta: {
        title: 'Job列表',
        icon: 'ant-design:dashboard-twotone',
      },
    },
  ],
};

export default router;
