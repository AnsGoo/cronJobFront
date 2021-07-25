import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const router: AppRouteModule = {
  path: '/jobcenter',
  name: 'jobcenter',
  component: LAYOUT,
  redirect: '/jobcenter/jobs',
  meta: {
    icon: 'ant-design:usergroup-add-outlined',
    title: 'Job管理',
    // affix: true,
    hideChildrenInMenu: false,
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
    {
      path: 'records',
      name: 'Record',
      component: () => import('/@/views/record/RecordList.vue'),
      meta: {
        title: 'Job执行记录',
        icon: 'ant-design:code-twotone',
      },
    },
  ],
};

export default router;
