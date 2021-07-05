import { ObjectType, Field } from "type-graphql";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class Result extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  // @Field()
  // @Column()
  // words: string;

  @Field()
  @Column({ type: "text", default: "0" })
  wpm: string;

  @Field()
  @Column({ type: "text", default: "0" })
  accuracy: string;

  @Field()
  @Column({ type: "text", default: "0" })
  cpm: string;

  @Field()
  @Column({ type: "text", default: "0" })
  raw: string;

  @Field()
  @Column("int", { default: 0 })
  correct: number;

  @Field()
  @Column("int", { default: 0 })
  incorrect: number;

  @Field()
  @Column("int", { default: 0 })
  errors: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.results, { onDelete: "CASCADE" })
  user: User;

  @Field()
  @Column("int", { default: 0 })
  time: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;
}
