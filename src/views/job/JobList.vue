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
        <Icon icon="ant-design:edit-outlined"  color="#b7eb8f" @click="reSheduler(record)" />
      </template>

      <template #toolbar>
        <a-button type="primary" @click="create">
          新建
        </a-button>
      </template>
    </BasicTable>
    <ReSchedulerJob @register="registerEdit"/>
    <CreateJob @register="registerCreate" />

  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { BasicModal, useModal } from '/@/components/Modal';
  import Tag from 'ant-design-vue/lib/tag';
  import { Icon} from '/@/components/Icon/index';
  import { BasicTable, useTable } from '/@/components/Table';
  import { getJobs, resumeJob, pauseJob, removeJob} from '/@/api/job/job';
  import {getBasicColumns, getFormConfig} from './config'

  import ReSchedulerJob from './modules/Edit.vue'
  import CreateJob from './modules/Create.vue'

  export default defineComponent({
    components: { BasicTable, Tag, Icon, BasicModal, ReSchedulerJob, CreateJob },
    setup() {
      const [registerEdit, { openModal: openEditModal }] = useModal();
      const [registerCreate, { openModal: openCreateModal }] = useModal();
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
      function reSheduler(job: Job) {
        openEditModal(true, {
          job: job,
        });
      }

      function create() {
        openCreateModal(true, {});
      }

      return {
        registerTable,
        handleReload,
        resumeMyJob,
        pauseMyJob,
        removeMyJob,
        reSheduler,
        registerEdit,
        registerCreate,
        create
      };
    }
  });
</script>
