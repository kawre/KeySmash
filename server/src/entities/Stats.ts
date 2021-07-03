import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
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
  @Column()
  timePlayed: number;

  @Field()
  @Column()
  testsCompleted: number;

  @Field()
  @Column()
  highestWpm: number;

  @Field()
  @Column({ type: "int", default: 0 })
  averageWpm: number;

  @Field()
  @Column({ type: "int", default: 0 })
  last10AverageWpm: number;

  @Field()
  @Column({ type: "int", default: 0 })
  last10AverageAcc: number;

  @Field(() => User)
  @OneToOne(() => User, (user) => user.stats, { onDelete: "CASCADE" })
  user: User;
}
