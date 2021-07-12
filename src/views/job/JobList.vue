<template>
  <div class="p-4">
    <BasicTable @register="registerTable">
      <template #form-custom> custom-slot </template>
      <template #state="{ record }">
        <Tag v-if="record.next_run_time" color="#87d068">RUNNING</Tag>
        <Tag v-else color="#f50">STOP</Tag>
      </template>
      <template #action="{ record }">
        <Icon icon="ant-design:pause-circle-twotone"  color="#EFBD47" @click="pauseMyJob(record.id)" v-if="record.next_run_time"/>
        <Icon icon="ant-design:reload-outlined"  color="#87d068" v-else @click="resumeMyJob(record.id)"/>
        <Icon icon="ant-design:delete-outlined"  color="#f50"  @click="removeMyJob(record.id)" />
        <Icon icon="ant-design:edit-outlined"  color="#b7eb8f" @click="openModal" />
      </template>
    </BasicTable>
    <BasicModal v-bind="$attrs" title="重新调度Job"  @register="registerModal">
      <ReSchedulerJob/>
    </BasicModal>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { FormProps, FormSchema } from '/@/components/Table';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { BasicModal, useModal } from '/@/components/Modal';
  import Tag from 'ant-design-vue/lib/tag';
  import { Icon} from '/@/components/Icon/index';
  import { BasicTable, useTable } from '/@/components/Table';
  import { BasicColumn } from '/@/components/Table/src/types/table';
  import { getJobs, resumeJob, pauseJob, removeJob} from '/@/api/job/job';

  import ReSchedulerJob from './modules/Edit.vue'


  function getBasicColumns(): BasicColumn[] {
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

  function getFormConfig(): Partial<FormProps> {
    // const fields: string[] = ['id', 'func', 'name']
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
  export default defineComponent({
    components: { BasicTable, Tag, Icon, BasicModal, ReSchedulerJob },
    setup() {
      const [registerModal, { openModal }] = useModal();
      const [registerTable, { reload }] = useTable({
        rowKey: 'id',
        title: 'Job管理',
        api: getJobs,
        useSearchForm: true,
        formConfig: getFormConfig(),
        columns: getBasicColumns(),

      });

      function handleReload() {
        reload();
      };
      const {
        createMessage,
        createConfirm,
      } = useMessage();
      const { success, warning } = createMessage;
      function handleConfirm(type: 'warning' | 'error' | 'success' | 'info', title: string, action: Function,job_id:string) {
        createConfirm({
          iconType: type,
          title: title,
          content: '您确认是否执行相关操作?',
          onOk: () => {
            action(job_id).then((resp: any) =>{
              console.log(resp)
              const job:string = resp?.id ?? '';
              success(`job ${job} 处理成功`)
              reload()
            }).catch((error:any) => {
              const msg: string = error?.data?.error?.message ?? '';
              warning(`处理失败,失败信息：${msg}`)

            })
          }
        });
      };
      function resumeMyJob(job_id:string) {
        handleConfirm('warning','确定要恢复这个Job吗？', resumeJob, job_id)
      };
      function pauseMyJob(job_id:string) {
        handleConfirm('warning','确定要暂停这个Job吗？', pauseJob, job_id)
      };
      function removeMyJob(job_id:string) {
        handleConfirm('warning','确定要移除这个Job吗？', removeJob, job_id)
      }
      return {
        registerTable,
        handleReload,
        resumeMyJob,
        pauseMyJob,
        removeMyJob,
        registerModal,
        openModal
      };
    }
  });
</script>
