"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsResolver = void 0;
const Stats_1 = require("../entities/Stats");
const type_graphql_1 = require("type-graphql");
const Result_1 = require("../entities/Result");
const User_1 = require("../entities/User");
let StatsResolver = class StatsResolver {
    user(stats) {
        return User_1.User.findOne(stats.userId);
    }
    timePlayed(stats) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield Result_1.Result.find({ userId: stats.userId });
            let sum = 0;
            results.forEach((r) => {
                sum = sum + r.time;
            });
            console.log(sum);
            return sum;
        });
    }
};
__decorate([
    type_graphql_1.FieldResolver(),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Stats_1.Stats]),
    __metadata("design:returntype", void 0)
], StatsResolver.prototype, "user", null);
__decorate([
    type_graphql_1.FieldResolver(),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Stats_1.Stats]),
    __metadata("design:returntype", Promise)
], StatsResolver.prototype, "timePlayed", null);
StatsResolver = __decorate([
    type_graphql_1.Resolver(Stats_1.Stats)
], StatsResolver);
exports.StatsResolver = StatsResolver;
//# sourceMappingURL=stats.js.map