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
  @Column({ type: "text", default: "00:00:00" })
  timePlayed: string;

  @Field()
  @Column({ type: "real", default: 0 })
  testsCompleted: number;

  // wpm
  @Field()
  @Column({ type: "real", default: 0 })
  highestWpm: number;

  @Field()
  @Column({ type: "real", default: 0 })
  averageWpm: number;

  @Field()
  @Column({ type: "real", default: 0 })
  last10AverageWpm: number;

  // raw
  @Field()
  @Column({ type: "real", default: 0 })
  highestRaw: number;

  @Field()
  @Column({ type: "real", default: 0 })
  averageRaw: number;

  @Field()
  @Column({ type: "real", default: 0 })
  last10AverageRaw: number;

  // acc
  @Field()
  @Column({ type: "real", default: 0 })
  averageAcc: number;

  @Field()
  @Column({ type: "real", default: 0 })
  last10AverageAcc: number;

  // bests
  @Field(() => [Result])
  @Column("int", { array: true, default: [] })
  personalBests: Result[];

  // user
  @Field(() => User)
  @OneToOne(() => User, (user) => user.stats, { onDelete: "CASCADE" })
  user: User;
}
