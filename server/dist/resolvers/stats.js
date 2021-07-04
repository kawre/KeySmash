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
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Stats_1 = require("../entities/Stats");
const User_1 = require("../entities/User");
let StatsResolver = class StatsResolver {
    user(stats) {
        return User_1.User.findOne(stats.userId);
    }
    timePlayed(stats) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield typeorm_1.getConnection().query(`
      select SUM(time) from result
      where "userId" = $1
      `, [stats.userId]);
            const sum = res.pop().sum;
            return sum ? new Date(sum * 1000).toISOString().substr(11, 8) : "00:00:00";
        });
    }
    testsCompleted(stats) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield typeorm_1.getConnection().query(`
      select count(*) from result
      where "userId" = $1
      `, [stats.userId]);
            const count = res.pop().count;
            return count ? count : 0;
        });
    }
    highestWpm(stats) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield typeorm_1.getConnection().query(`
    	select max(wpm) from result
    	where "userId" = $1
    	limit 1
    	`, [stats.userId]);
            const max = res.pop().max;
            return max ? max : 0;
        });
    }
    averageWpm(stats) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield typeorm_1.getConnection().query(`
      select AVG(wpm) from result
      where "userId" = $1
      `, [stats.userId]);
            const avg = res.pop().avg;
            return avg ? avg : 0;
        });
    }
    last10AverageWpm(stats) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield typeorm_1.getConnection().query(`
      select AVG(wpm)
      from (
        select wpm from result 
        where "userId" = $1
        order by "createdAt" DESC
        limit $2
      ) x
      `, [stats.userId, 10]);
            const avg = res.pop().avg;
            return avg ? avg : 0;
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
__decorate([
    type_graphql_1.FieldResolver(),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Stats_1.Stats]),
    __metadata("design:returntype", Promise)
], StatsResolver.prototype, "testsCompleted", null);
__decorate([
    type_graphql_1.FieldResolver(),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Stats_1.Stats]),
    __metadata("design:returntype", Promise)
], StatsResolver.prototype, "highestWpm", null);
__decorate([
    type_graphql_1.FieldResolver(),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Stats_1.Stats]),
    __metadata("design:returntype", Promise)
], StatsResolver.prototype, "averageWpm", null);
__decorate([
    type_graphql_1.FieldResolver(),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Stats_1.Stats]),
    __metadata("design:returntype", Promise)
], StatsResolver.prototype, "last10AverageWpm", null);
StatsResolver = __decorate([
    type_graphql_1.Resolver(Stats_1.Stats)
], StatsResolver);
exports.StatsResolver = StatsResolver;
//# sourceMappingURL=stats.js.map