export interface JobRecord {
  id: number,
  name: string,
  args: any[],
  kwargs: Recordable,
  trigger: string,
  result: string,
  out: string,
  runtime: string
}

export interface JobRecordFilterParams {
  func?: string,
  result?: string,
  trigger?: string,
  name?:string
}
