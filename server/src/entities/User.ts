import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Result } from "./Result";
import { Stats } from "./Stats";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Field()
  @Column({ type: "text", default: "serika dark" })
  theme: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field(() => [Result])
  @OneToMany(() => Result, (result) => result.user)
  results: Result[];

  @Field(() => Stats)
  @OneToOne(() => Stats, (stats) => stats.user)
  stats: Stats;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
