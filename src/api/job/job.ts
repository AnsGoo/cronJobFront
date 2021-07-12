import { otherHttp } from '/@/utils/http/axios';
import { QueryJobParams, Job } from './model/jobModel';

enum Api {
  getJobs = '/v1/jobs/'
}

const JobAPI = {
  getJobs:'/v1/jobs/',
  removeJob: (id:string) => `/v1/job/${id}/`,
  pauseJob: (id:string) => `/v1/job/${id}/pause/`,
  resumeJob: (id:string) => `/v1/job/${id}/resume/`,
  rescheduleJob: (id:string) => `/v1/job/${id}/reschedule`,
  getJob: (id:string) => `/v1/job/${id}/`,
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

export const rescheduleJob = (id: string) => {
  return otherHttp.get<Job>({ url: JobAPI.rescheduleJob(id) });
};
