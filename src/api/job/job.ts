import { otherHttp } from '/@/utils/http/axios';
import { QueryJobParams, Job, Executor, Store, ReScheduleJobData, Task, JobInfo } from './model/jobModel';

enum Api {
  getJobs = '/v1/jobs/'
}

const JobAPI = {
  getJobs:'/v1/jobs/',
  removeJob: (id:string) => `/v1/job/${id}/`,
  pauseJob: (id:string) => `/v1/job/${id}/pause/`,
  resumeJob: (id:string) => `/v1/job/${id}/resume/`,
  rescheduleJob: (id:string) => `/v1/job/${id}/reschedule/`,
  getJob: (id:string) => `/v1/job/${id}/`,
  getStores: () => '/v1/job/stores/',
  getExecutors: () => '/v1/job/executors/',
  getTasks: () => '/v1/job/tasks/'
}
/**
 * @description: Get user menu based on id
 */

export const getJobs = (params: QueryJobParams) => {
  return otherHttp.get<Job[]>({ url: Api.getJobs, params });
};


export const removeJob = (id: string) => {
  return otherHttp.get<string>({ url: JobAPI.removeJob(id) });
};

export const pauseJob = (id: string) => {
  return otherHttp.get<Job>({ url: JobAPI.pauseJob(id) });
};

export const resumeJob = (id: string) => {
  return otherHttp.get<Job>({ url: JobAPI.resumeJob(id) });
};

export const rescheduleJob = (id: string, data:ReScheduleJobData) => {
  return otherHttp.put<Job>({ url: JobAPI.rescheduleJob(id), data: data });
};

export const getJobStores = () => {
  return otherHttp.get<Store[]>({url: JobAPI.getStores() });

}

export const getJobExcutors = () => {
  return otherHttp.get<Executor[]>({url: JobAPI.getExecutors() });
}


export const getJobTasks = () => {
  return otherHttp.get<Task[]>({url: JobAPI.getTasks() });
}


export const addJob = (data: JobInfo) => {
  return otherHttp.post<Job>({url: JobAPI.getJobs, data: data });
}
