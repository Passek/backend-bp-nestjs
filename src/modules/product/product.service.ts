import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserFillableFields } from '../user';
import { Repository } from 'typeorm';
import { Product, ProductFillableFields } from './product.entity';

@Injectable()
export class ProductService {
  product;
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async get(id: string) {
    return this.productRepository.findOne(id);
  }

  async getAll() {
    return this.productRepository.find();
  }
async getProduct(id: string) {
  const product = await this.get(id);

  if (!product) {
    throw new NotAcceptableException(
      'no such product',
    );
  }
  return product;

}
  async create(payload: ProductFillableFields) {
    return await this.productRepository.save(payload);
  }
  async deleteProduct(id) {
    try {
      this.product = await this.get(id);
    }
catch (e){
  if (!this.product) {
    throw new NotAcceptableException(
      'no such product',
    );
  }
  throw new NotAcceptableException(
    'incorrect id',
  );
}

    await this.productRepository.delete(id);
    return { success: true, message: 'product deleted' };
  }

}

