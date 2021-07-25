import { getJobTasks } from "/@/api/job/job";
import { BasicColumn, FormSchema, FormProps } from "/@/components/Table";

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '名称',
      dataIndex: 'name',
      width: 150
    },
    {
      title: '运行时间',
      dataIndex: 'runtime',
      width: 150
    },
    {
      title: '触发器类型',
      dataIndex: 'trigger',
      filterMultiple: false
    },
    {
      title: '状态',
      dataIndex: 'result',
      // slots: { customRender: 'state' },
    },
  ];
}

export function getFormConfig(): Partial<FormProps> {
  const schemas: FormSchema[] = [
    {
      field: 'result',
      label: '任务结果',
      component: 'Select',
      componentProps: {
        options: [
          {
            label: 'SUCCESS',
            value: 'SUCCESS'
          },
          {
            label: 'FAILED',
            value: 'FAILED',
          },
          {
            label: 'MISSED',
            value: 'MISSED',
          },
        ],
      },
      colProps: {
          xl: 8,
          xxl: 8
        }
    },
    {
      field: 'name',
      label: '任务名',
      component: 'Input',
      colProps: {
          xl: 8,
          xxl: 8
        }
    },
    {
      field: 'trigger',
      label: '触发器类型',
      component: 'Select',
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
      colProps: {
          xl: 8,
          xxl: 8
        }
    }
  ]
  return {
    labelWidth: 100, schemas
  };
}
