'use server';

import { getProducts, getProduct } from '@/lib/placeholder-data';
import type { Product } from '@/lib/types';

type GetProductsParams = {
  limit?: number;
  startAfterCreatedAt?: string;
};

export async function getProductsAction({
  limit = 100,
  startAfterCreatedAt,
}: GetProductsParams = {}): Promise<Product[]> {
  return await getProducts(limit, startAfterCreatedAt);
}

export async function getProductAction(id: string): Promise<Product | null> {
  return await getProduct(id);
}
