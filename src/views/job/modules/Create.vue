<template>
  <BasicModal
    title="创建"
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
  import { createSchemas } from './createSchemas';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { addJob } from '/@/api/job/job'
  import { JobInfo } from '/@/api/job/model/jobModel'

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

      const [registerModal, { closeModal }] = useModalInner(() => {
        setFieldsValue({});
      });

      async function customSubmitFunc() {
        try {
          const data = await validate();
          console.log(data);
          setProps({
            submitButtonOptions: {
              loading: true,
            },
          });
          const jobInfo: JobInfo = {
            func: data.func,
            args: data.args?.split(','),
            name: data.name,
            trigger: {
              trigger: data.trigger,
              run_time: data.run_time,
              timezone: data.timezone,
              jitter: data.jitter
            },
            executor: data.executor,
            jobstore: data.jobstore,
            max_instances: data.max_instances | 1
          }
          addJob(jobInfo).then((resp) => {
            setProps({
              submitButtonOptions: {
                loading: false,
              },
            });
            createMessage.success(`Job${resp.name}创建成功`);
            closeModal();
          });
        } catch (error) {
          setProps({
            submitButtonOptions: {
              loading: true,
            },
          });
          createMessage.warning('创建失败！');
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
