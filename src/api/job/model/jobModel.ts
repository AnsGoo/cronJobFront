/**
 * @description: Job 触发器类型
 */

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
  next_run_time: string
}


export interface QueryJobParams {
  state?: string;
  name?: string;
  trigger?: TriggerType;
  func?: string
}
