import {
  Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

/**
 * The typeorm currently have a constructor for contruct all models. Therefore, isn't
 * necessary to code a contructor method.
 *
 *  In tsconfig.json is necessary to uncomment the property: "strictPropertyInitialization": true
 *  and change the value for 'false'.
*/

export default User;
