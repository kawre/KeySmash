"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fieldError = void 0;
const fieldError = (field, message) => {
    return {
        errors: [{ field, message }],
    };
};
exports.fieldError = fieldError;
//# sourceMappingURL=fieldError.js.map