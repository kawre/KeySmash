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
  wpm: string;

  @Field()
  @Column()
  accuracy: string;

  @Field()
  @Column()
  cpm: string;

  @Field()
  @Column()
  raw: string;

  @Field()
  @Column()
  correct: number;

  @Field()
  @Column()
  incorrect: number;

  @Field()
  @Column()
  extra: number;

  @Field()
  @Column()
  missed: number;

  @Field()
  @Column()
  characters: number;

  @Field()
  @Column()
  errors: number;

  @Field()
  @Column()
  time: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.results, { onDelete: "CASCADE" })
  user: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;
}
