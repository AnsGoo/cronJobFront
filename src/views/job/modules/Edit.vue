<template>
  <BasicModal
    title="重新调度"
    @register="registerModal"
    v-bind="$attrs"
    width="700px"
    :footer="null"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { BasicForm, useForm } from '/@/components/Form';
  import { defineComponent, ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { createSchemas } from './editSchemas';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { rescheduleJob } from '/@/api/job/job'
  import { ReScheduleJobData } from '/@/api/job/model/jobModel'

  export default defineComponent({
    components: { BasicForm, BasicModal },
    setup() {
      let job = ref(null);
      const { createMessage } = useMessage();
      const [registerForm, { validate, setProps, setFieldsValue }] = useForm({
        labelCol: {
          span: 6,
        },
        wrapperCol: {
          span: 12,
        },
        schemas: createSchemas(),
        actionColOptions: {
          span: 24,
          offset: 2,
        },
        submitButtonOptions: {
          text: '提交',
        },
        submitFunc: customSubmitFunc,
        resetFunc: async () => {
          setFieldsValue(job.value);
        },
      });

      const [registerModal, { closeModal }] = useModalInner((data) => {
        job.value = data.job;
        setFieldsValue(data.job);
      });

      async function customSubmitFunc() {
        try {
          const jobInfo = await validate();
          console.log(jobInfo);
          setProps({
            submitButtonOptions: {
              loading: true,
            },
          });
          const id = jobInfo.id;
          const jobData: ReScheduleJobData = {
            trigger: {
              trigger: jobInfo.trigger,
              run_time: jobInfo.run_time,
              timezone: jobInfo.timezone,
              jitter: jobInfo.jitter
            },
            jobstore: jobInfo.jobstore
          }
          delete jobInfo.id;
          rescheduleJob(id, jobData).then((resp) => {
            setProps({
              submitButtonOptions: {
                loading: false,
              },
            });
            createMessage.success(`Job${resp.name}更新成功`);
            closeModal();
          });
        } catch (error) {
          setProps({
            submitButtonOptions: {
              loading: true,
            },
          });
          createMessage.warning('提交失败！');
        }
      }
      return { registerModal, registerForm };
    },
  });
</script>
<style lang="less" scoped>
  .form-wrap {
    padding: 24px;
    background-color: @component-background;
  }
</style>
