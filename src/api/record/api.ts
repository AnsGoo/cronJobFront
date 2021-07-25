
import { otherHttp } from '/@/utils/http/axios';
import { JobRecord, JobRecordFilterParams } from './model';
import { BasicPageParams, BasicFetchResult } from '../model/baseModel';

export function getJobRecords(pageParams: BasicPageParams, filterParams:JobRecordFilterParams) {
  return otherHttp.get<BasicFetchResult<JobRecord>>({ url: '/v1/records/', params:{
    ...pageParams,filterParams
  } });

}
