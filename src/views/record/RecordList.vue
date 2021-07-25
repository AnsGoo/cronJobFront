<template>
  <div class="p-4">
    <BasicTable @register="registerTable">
      <template #form-custom> custom-slot </template>
      <template #expandedRowRender="record">
        {{ record.out }}
        </template>
    </BasicTable>
     </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import Tag from 'ant-design-vue/lib/tag';
  import { Icon} from '/@/components/Icon/index';
  import { BasicTable, useTable } from '/@/components/Table';
  import { getJobRecords } from '/@/api/record/api';
  import {getBasicColumns, getFormConfig} from './config'

  export default defineComponent({
    components: { BasicTable, Tag, Icon },
    setup() {
      const [registerTable, { reload }] = useTable({
        rowKey: 'id',
        title: 'Job执行记录查看',
        api: getJobRecords,
        useSearchForm: true,
        formConfig: getFormConfig(),
        columns: getBasicColumns(),

      });

      function handleReload() {
        reload();
      };
      return {
        registerTable,
        handleReload,
      };
    }
  });
</script>
