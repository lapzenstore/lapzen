import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/placeholder-data';

export async function POST(request: Request) {
  try {
    const { limit, startAfterCreatedAt } = await request.json();

    const products = await getProducts(limit, startAfterCreatedAt);

    return NextResponse.json(products);
  } catch (error) {
    console.error('API loadMoreProducts error:', error);
    return NextResponse.error();
  }
}
