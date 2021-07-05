import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Result } from "./Result";
import { User } from "./User";

@ObjectType()
@Entity()
export class Stats extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Field()
  @Column("text", { default: "00:00:00" })
  timePlayed: string;

  @Field()
  @Column("int", { default: 0 })
  testsCompleted: number;

  // wpm
  @Field()
  @Column({ type: "text", default: "0" })
  highestWpm: string;

  @Field()
  @Column({ type: "text", default: "0" })
  averageWpm: string;

  @Field()
  @Column({ type: "text", default: "0" })
  last10AverageWpm: string;

  // raw
  @Field()
  @Column({ type: "text", default: "0" })
  highestRaw: string;

  @Field()
  @Column({ type: "text", default: "0" })
  averageRaw: string;

  @Field()
  @Column({ type: "text", default: "0" })
  last10AverageRaw: string;

  // acc
  @Field()
  @Column({ type: "text", default: "0" })
  averageAcc: string;

  @Field()
  @Column({ type: "text", default: "0" })
  last10AverageAcc: string;

  // bests
  @Field(() => [Result])
  @Column("int", { array: true, default: [] })
  personalBests: Result[];

  // user
  @Field(() => User)
  @OneToOne(() => User, (user) => user.stats, { onDelete: "CASCADE" })
  user: User;
}
