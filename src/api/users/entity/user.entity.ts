import { BaseEntity, Column, Entity, ObjectIdColumn, Unique } from 'typeorm';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {

    @ObjectIdColumn({ generated: true })
    id: string = '';

    @Column({ unique: true })
    email: string = '';

    @Column()
    password: string = '';

}
