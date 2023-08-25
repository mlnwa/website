export class ResultModel {
  constructor() { }
  static builderSuccess():ResultModel{
    const resultModel = new ResultModel()
    resultModel.setSuccess(true)
    return resultModel
  }
  static builderErrorMsg(errorMsg:string):ResultModel{
    const resultModel = new ResultModel()
    resultModel.setSuccess(false)
    resultModel.setMsg(errorMsg)
    return resultModel
  }
  private success: boolean;
  private result: any;
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

  public setSuccess(success: boolean): ResultModel {
    this.success = success;
    return this;
  }

  public getResult(): any {
    return this.result;
  }

  public setResult(result: any): ResultModel {
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
