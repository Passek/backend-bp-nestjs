import {
  Entity,
  Column,
  PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne,
} from 'typeorm';
import { User } from '../user';

@Entity({
  name: 'products',
})
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  title: string;

  @Column({ length: 255 })
  type: string;

  @Column({ length: 255 })
  price: string;

@Column()
quantity: number;

  @Column({ length: 255 })
  pictureURL: string;

  @UpdateDateColumn()
  last_modified!: Date;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, user => user.wishlist, {
    eager: true
  })
  user: User;
}

export class ProductFillableFields {
  title: string;
  type: string;
  price: string;
  pictureURL: string;
  quantity: number;
}
