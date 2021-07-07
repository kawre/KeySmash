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
exports.ResultResolver = void 0;
const Result_1 = require("../entities/Result");
const type_graphql_1 = require("type-graphql");
const User_1 = require("../entities/User");
const typeorm_1 = require("typeorm");
let ScoreInput = class ScoreInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ScoreInput.prototype, "wpm", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ScoreInput.prototype, "quote", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ScoreInput.prototype, "accuracy", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ScoreInput.prototype, "cpm", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ScoreInput.prototype, "raw", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], ScoreInput.prototype, "correct", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], ScoreInput.prototype, "incorrect", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], ScoreInput.prototype, "extra", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], ScoreInput.prototype, "missed", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], ScoreInput.prototype, "characters", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], ScoreInput.prototype, "errors", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], ScoreInput.prototype, "time", void 0);
ScoreInput = __decorate([
    type_graphql_1.InputType()
], ScoreInput);
let ResultResolver = class ResultResolver {
    user(result) {
        return User_1.User.findOne(result.userId);
    }
    topResults() {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield typeorm_1.getConnection().query(`
      select * from result 
      order by wpm DESC
    `);
            console.log(results);
            return results;
        });
    }
    submitResult(options, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.session;
            console.log(options);
            return Result_1.Result.create(Object.assign(Object.assign({}, options), { userId })).save();
        });
    }
    testHistory(cursor, { req }) {
        const params = [req.session.userId];
        if (cursor)
            params.push(new Date(parseInt(cursor)));
        return typeorm_1.getConnection().query(`
    select * from result
    where "userId" = $1
    ${cursor ? `and "createdAt" < $2` : ``}
    order by "createdAt" DESC
    limit 10
    `, params);
    }
};
__decorate([
    type_graphql_1.FieldResolver(),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Result_1.Result]),
    __metadata("design:returntype", void 0)
], ResultResolver.prototype, "user", null);
__decorate([
    type_graphql_1.Query(() => [Result_1.Result]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ResultResolver.prototype, "topResults", null);
__decorate([
    type_graphql_1.Mutation(() => Result_1.Result),
    __param(0, type_graphql_1.Arg("options")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ScoreInput, Object]),
    __metadata("design:returntype", Promise)
], ResultResolver.prototype, "submitResult", null);
__decorate([
    type_graphql_1.Query(() => [Result_1.Result]),
    __param(0, type_graphql_1.Arg("cursor", { nullable: true })),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ResultResolver.prototype, "testHistory", null);
ResultResolver = __decorate([
    type_graphql_1.Resolver(Result_1.Result)
], ResultResolver);
exports.ResultResolver = ResultResolver;
//# sourceMappingURL=result.js.map