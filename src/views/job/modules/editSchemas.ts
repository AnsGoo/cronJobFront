import { FormSchema } from '/@/components/Form';

import { getJobStores } from '/@/api/job/job';

export function createSchemas(): FormSchema[] {
  return [
    {
      field: 'id',
      component: 'Input',
      label: 'JobID',
      show: false,
      required: true,
    },
    {
      field: 'trigger',
      component: 'RadioGroup',
      label: '触发器',
      componentProps: {
        options: [
          {
            label: 'date',
            value: 'date'
          },
          {
            label: 'interval',
            value: 'interval',
          },
          {
            label: 'cron',
            value: 'cron',
          },
        ],
      },
      required: true
    },
    {
      field: 'run_time',
      component: 'Input',
      label: '执行时间',
      componentProps: {
        placeholder: '执行时间',
      },
      required: true,
    },
    {
      field: 'jobstore',
      component: 'ApiSelect',
      label: '存储器 ',
      componentProps: {
        api: getJobStores,
        labelField: 'name',
        // use id as value
        valueField: 'name',

        getPopupContainer: () => document.body,
      },
    },
    {
      field: 'timezone',
      component: 'Input',
      label: '时区',
      componentProps: {
        placeholder: '时区',
      },
      required: false,
    },
    {
      field: 'jitter',
      component: 'InputNumber',
      label: '振荡器',
      componentProps: {
        placeholder: '对于并发集中执行的时的允许前后时间的误差时间',
        style: {width: '100%'},
        min: 0,
        step:1,
        precision: 0
      },
      required: false,
    },
  ];
}
