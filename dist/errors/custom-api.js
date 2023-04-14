"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomError extends Error {
    constructor(msg, num) {
        super(msg);
        this.msg = msg;
        this.num = num;
    }
    get text() {
        return this.msg;
    }
    get code() {
        return this.num;
    }
    set text(msg) {
        this.msg = msg;
    }
    set code(num) {
        this.num = num;
    }
}
exports.default = CustomError;
//# sourceMappingURL=custom-api.js.map