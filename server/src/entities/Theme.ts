import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Theme extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  background: string;

  @Field()
  @Column()
  caret: string;

  @Field()
  @Column()
  main: string;

  @Field()
  @Column()
  sub: string;

  @Field()
  @Column()
  text: string;

  @Field()
  @Column()
  error: string;

  @Field()
  @Column()
  errorExtra: string;
}
