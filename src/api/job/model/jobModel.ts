/**
 * @description: Job 触发器类型
 */

import { number } from "vue-types"

export enum TriggerType {
  Date = 'date',
  Cron = 'cron',
  Interval = 'interval'
}


/**
 * @description Job
 */
export interface Job {
  // ID
  id: string;
  // 名称
  name: string;
  // 运行的任务
  func: string;
  // 任务参数
  args: any[];
  // 任务关键字参数
  kwargs: Map<string,any>;
  trigger: TriggerType;
  // 开始时间
  start_date: string;
  // 运行时间
  run_time: string;
  //
  misfire_grace_time: number;
  // 最大并发数
  max_instances: number;
  // 下次运行时间
  next_run_time: string;
  // 存储器
  jobstore: string;
}


export interface QueryJobParams {
  state?: string;
  name?: string;
  trigger?: TriggerType;
  func?: string
}



export interface Task {
  name: string,
  desc: string

}

export interface Store {
  name: string
}

export interface Executor {
  name: string
}

export interface ReScheduleJobData {
    trigger: {
      trigger: string,
      run_time: string,
      timezone: string,
      jitter?: number
    },
    jobstore: string
}

export interface JobInfo {
  func: string,
  name: string,
  trigger: {
    trigger: string,
    run_time: string,
    timezone?: string,
    jitter?:number
  },
  max_instances: number,
  args: any[],
  kwargs?: Recordable,
  jobstore: string,
  executor: string,
  replace_existing?: false,
  misfire_grace_time?: number,
  coalesce?: true
}
