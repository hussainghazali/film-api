//import { TaskEntity } from '@todo/entity/task.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The ID of the user.', example: '1' })
  id: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  @ApiProperty({
    description: 'The username of the user.',
    example: 'john_doe',
  })
  username: string;

  @Column({ type: 'varchar', nullable: false })
  @ApiProperty({
    description: 'The password of the user.',
    example: '********',
  })
  password: string;

  @Column({ type: 'varchar', nullable: false })
  @ApiProperty({
    description: 'The email address of the user.',
    example: 'john@example.com',
  })
  email: string;

  @CreateDateColumn()
  @ApiProperty({
    description: 'The date when the user was created.',
    example: '2023-05-14T10:00:00Z',
    required: false,
  })
  createdOn?: Date;

  @CreateDateColumn()
  @ApiProperty({
    description: 'The date when the user was last updated.',
    example: '2023-05-14T14:30:00Z',
    required: false,
  })
  updatedOn?: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
