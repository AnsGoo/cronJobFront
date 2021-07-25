import { BasicColumn, FormSchema, FormProps } from "/@/components/Table";

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      fixed: 'left',
      width: 200,
    },
    {
      title: '名称',
      dataIndex: 'name',
      width: 150
    },
    {
      title: '任务',
      dataIndex: 'func',
      customRender: ({ text }: { text: any }) => text.split('.').slice(-1)
    },
    {
      title: '运行时间',
      dataIndex: 'run_time',
      width: 150
    },
    {
      title: '触发器类型',
      dataIndex: 'trigger',
      filters: [
        { text: 'date', value: 'date' },
        { text: 'cron', value: 'cron' },
        { text: 'interval', value: 'interval' },
      ],
      filterMultiple: false
    },
    {
      title: '状态',
      dataIndex: 'state',
      filters: [
        { text: 'STOP', value: 'STOP' },
        { text: 'RUNNING', value: 'RUNNING' }
      ],
      filterMultiple: false,
      slots: { customRender: 'state' },
    },
    {
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    }
  ];
}

export function getFormConfig(): Partial<FormProps> {
  const schemas: FormSchema[] = [
    {
      field: 'id',
      label: 'ID',
      component: 'Input',
      colProps: {
          xl: 8,
          xxl: 8
        }
    },
    {
      field: 'name',
      label: '名称',
      component: 'Input',
      colProps: {
          xl: 8,
          xxl: 8
        }
    },
    {
      field: 'func',
      label: '任务',
      component: 'Input',
      colProps: {
          xl: 8,
          xxl: 8
        }
    },
  ]
  return {
    labelWidth: 100, schemas
  };
}
