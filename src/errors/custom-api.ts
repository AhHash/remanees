class CustomError extends Error {
  constructor(private msg: string, private num: number) {
    super(msg);
  }

  get text() {
    return this.msg;
  }
  get code() {
    return this.num;
  }

  set text(msg: string) {
    this.msg = msg;
  }
  set code(num: number) {
    this.num = num;
  }
}

export default CustomError;
