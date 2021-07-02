"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegister = void 0;
const fieldError_1 = require("./fieldError");
const validateRegister = (options) => {
    const { username, email, password } = options;
    if (!email.includes("@"))
        return fieldError_1.fieldError("email", "invalid email");
    if (password.length <= 2)
        return fieldError_1.fieldError("password", "password to short");
    if (username.length > 64)
        return fieldError_1.fieldError("username", "password to long");
    if (username.length <= 2)
        return fieldError_1.fieldError("username", "username to short");
    if (username.length > 10)
        return fieldError_1.fieldError("username", "username to long");
    return null;
};
exports.validateRegister = validateRegister;
//# sourceMappingURL=validateRegister.js.map