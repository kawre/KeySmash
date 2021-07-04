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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stats = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Result_1 = require("./Result");
const User_1 = require("./User");
let Stats = class Stats extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Stats.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Stats.prototype, "userId", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ type: "text", default: "00:00:00" }),
    __metadata("design:type", String)
], Stats.prototype, "timePlayed", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ type: "int", default: 0 }),
    __metadata("design:type", Number)
], Stats.prototype, "testsCompleted", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ type: "int", default: 0 }),
    __metadata("design:type", Number)
], Stats.prototype, "highestWpm", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ type: "int", default: 0 }),
    __metadata("design:type", Number)
], Stats.prototype, "averageWpm", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ type: "int", default: 0 }),
    __metadata("design:type", Number)
], Stats.prototype, "last10AverageWpm", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ type: "int", default: 0 }),
    __metadata("design:type", Number)
], Stats.prototype, "highestRaw", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ type: "int", default: 0 }),
    __metadata("design:type", Number)
], Stats.prototype, "averageRaw", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ type: "int", default: 0 }),
    __metadata("design:type", Number)
], Stats.prototype, "last10AverageRaw", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ type: "int", default: 0 }),
    __metadata("design:type", Number)
], Stats.prototype, "averageAcc", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ type: "int", default: 0 }),
    __metadata("design:type", Number)
], Stats.prototype, "last10AverageAcc", void 0);
__decorate([
    type_graphql_1.Field(() => [Result_1.Result]),
    typeorm_1.Column("int", { array: true, default: [] }),
    __metadata("design:type", Array)
], Stats.prototype, "personalBests", void 0);
__decorate([
    type_graphql_1.Field(() => User_1.User),
    typeorm_1.OneToOne(() => User_1.User, (user) => user.stats, { onDelete: "CASCADE" }),
    __metadata("design:type", User_1.User)
], Stats.prototype, "user", void 0);
Stats = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Stats);
exports.Stats = Stats;
//# sourceMappingURL=Stats.js.map