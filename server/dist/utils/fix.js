"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fix = void 0;
const fix = (s) => {
    console.log(s);
    if (!s)
        return "0";
    else
        return parseFloat(s).toFixed(2);
};
exports.fix = fix;
//# sourceMappingURL=fix.js.map