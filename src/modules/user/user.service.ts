import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';

import { User, UserFillableFields } from './user.entity';
import { Product } from '../product/product.entity';

@Injectable()
export class UsersService {
  user;
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async get(id: string) {
    return this.userRepository.findOne(id, {relations: ['wishlist']});
  }

  async getByEmail(email: string) {
    return await this.userRepository.findOne({ email });
  }

  async create(payload: UserFillableFields) {
    const user = await this.getByEmail(payload.email);

    if (user) {
      throw new NotAcceptableException(
        'User with provided email already created.',
      );
    }

    return await this.userRepository.save(payload);
  }

  async getAll() {
    return this.userRepository.find({relations: ['wishlist']});
  }
  async getUser(id: string) {
    const user = await this.get(id);

    if (!user) {
      throw new NotAcceptableException(
        'no such user',
      );
    }
    return user;

  }
  async deleteUser(id) {
    try {
      this.user = await this.get(id);
    }
    catch (e){
      if (!this.user) {
        this.user = null;
        throw new NotAcceptableException(
          'no such user',
        );
      }
      this.user = null;
      throw new NotAcceptableException(
        'incorrect id',
      );
    }

    await this.userRepository.softDelete(id);
    this.user = null;
    return { success: true, message: 'user deleted' };
  }

  async addToWishlist(user, productId) {
    try {
      this.user = await this.get(user.id);
    }
    catch (e){
      if (!this.user) {
        this.user = null;
        throw new NotAcceptableException(
          'no such user',
        );
      }
      this.user = null;
      throw new NotAcceptableException(
        'incorrect id',
      );
    }
    const product = await getConnection()
      .createQueryBuilder()
      .select("product")
      .from(Product, "product")
      .where("product.id = :id", { id: productId})
      .getOne();
    console.log(product, this.user)
    this.user.wishlist.push(product);
    await this.userRepository.save(this.user)
    return { success: true, data: this.user };
  }
}
