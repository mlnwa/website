export class ResultModel<R=any> {
  constructor() { }
  static builderSuccess<T=any>():ResultModel<T>{
    const resultModel = new ResultModel<T>()
    resultModel.setSuccess(true)
    return resultModel
  }
  static builderSuccessMsg<T=any>(msg:string):ResultModel<T> {
    const resultModel = ResultModel.builderSuccess<T>()
    resultModel.setMsg(msg)
    return resultModel
  }
  static builderErrorMsg(msg:string):ResultModel{
    const resultModel = new ResultModel()
    resultModel.setSuccess(false)
    resultModel.setMsg(msg)
    return resultModel
  }
  private success: boolean;
  private result: R;
  private msg: string;
  private code: number;

  public getCode(): number {
    return this.code;
  }

  public setCode(code: number): ResultModel {
    this.code = code;
    return this;
  }

  public getSuccess(): boolean {
    return this.success;
  }

  public setSuccess(success: boolean): ResultModel<R> {
    this.success = success;
    return this;
  }

  public getResult(): R {
    return this.result;
  }

  public setResult(result: R): ResultModel<R> {
    this.result = result;
    return this;
  }

  public getMsg(): string {
    return this.msg;
  }

  public setMsg(msg: string): ResultModel {
    this.msg = msg;
    return this;
  }
}
