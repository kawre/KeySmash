"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fix = void 0;
const fix = (s) => {
    if (!s)
        return 0;
    const num = parseFloat(s);
    return num % 1 != 0 ? num.toFixed(1) : num;
};
exports.fix = fix;
//# sourceMappingURL=fix.js.map