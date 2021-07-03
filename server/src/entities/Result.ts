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

  @Field()
  @Column()
  wpm: number;

  @Field()
  @Column()
  accuracy: number;

  @Field()
  @Column()
  cpm: number;

  @Field()
  @Column()
  raw: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.results, { onDelete: "CASCADE" })
  user: User;

  @Field()
  @Column()
  time: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;
}
