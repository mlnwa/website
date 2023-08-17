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
    resultModel.setErrorMsg(errorMsg)
    return resultModel
  }
  private success: boolean;
  private result: any;
  private errorMsg: string;
  private code: number;
  private successDesc: string

  public getSuccessDesc(): string {
    return this.successDesc;
  }

  public setSuccessDesc(successDesc: string): ResultModel {
    this.successDesc = successDesc;
    return this
  }

  public getCode(): number {
    return this.code;
  }

  public setCode(code: number): ResultModel {
    this.code = code;
    return this;
  }

  public isSuccess(): boolean {
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

  public getErrorMsg(): string {
    return this.errorMsg;
  }

  public setErrorMsg(errorMsg: string): ResultModel {
    this.errorMsg = errorMsg;
    return this;
  }
}
