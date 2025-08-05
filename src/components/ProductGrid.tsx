'use client';

import { useState, useMemo, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import { ProductFilters } from '@/components/ProductFilters';
import type { Product } from '@/lib/types';
import { Frown } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface ProductGridProps {
  initialProducts: Product[];
}

export default function ProductGrid({ initialProducts }: ProductGridProps) {
  const [allProducts, setAllProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const maxPrice = useMemo(() => {
    return allProducts.length > 0 ? Math.max(...allProducts.map(p => p.price)) : 1000000;
  }, [allProducts]);

  // Your filters state & logic (same as before)
  const [filters, setFilters] = useState({
    brand: '',
    priceRange: [0, maxPrice] as [number, number],
    conditions: [] as string[],
    processor: '',
    ram: '',
  });

  useEffect(() => {
    setFilters(prev => ({ ...prev, priceRange: [0, maxPrice] }));
  }, [maxPrice]);

  const handleFilterChange = (filterType: string, value: any) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      brand: '',
      priceRange: [0, maxPrice],
      conditions: [],
      processor: '',
      ram: '',
    });
  };

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      const brandMatch = filters.brand === '' || product.brand.toLowerCase().includes(filters.brand.toLowerCase());
      const priceMatch = product.price <= filters.priceRange[1];
      const conditionMatch = filters.conditions.length === 0 || filters.conditions.includes(product.condition);
      const processorMatch = filters.processor === '' || product.specs.processor.toLowerCase().includes(filters.processor.toLowerCase());
      const ramMatch = filters.ram === '' || product.specs.ram.toLowerCase().includes(filters.ram.toLowerCase());

      return brandMatch && priceMatch && conditionMatch && processorMatch && ramMatch;
    });
  }, [filters, allProducts]);

  async function loadMore() {
    if (!hasMore) return;

    setLoading(true);

    try {
      // Get the createdAt of the last product loaded
      const lastCreatedAt = allProducts[allProducts.length - 1]?.createdAt;

      // Call your server action to get next products page
      const res = await fetch('/api/loadMoreProducts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          limit: 15,
          startAfterCreatedAt: lastCreatedAt,
        }),
      });

      if (!res.ok) throw new Error('Failed to load more');

      const nextProducts: Product[] = await res.json();

      if (nextProducts.length === 0) {
        setHasMore(false); // no more products
      } else {
        setAllProducts(prev => [...prev, ...nextProducts]);
      }
    } catch (error) {
      console.error('Load more error:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid lg:grid-cols-4 gap-8">
      <aside className="lg:col-span-1">
        <ProductFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          maxPrice={maxPrice}
        />
      </aside>
      <main className="lg:col-span-3">
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="flex flex-col h-full overflow-hidden">
                <Skeleton className="aspect-[4/3] w-full" />
                <CardContent className="p-4 flex-grow">
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between items-center">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-8 w-20" />
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {filteredProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {hasMore && (
              <button
                onClick={loadMore}
                disabled={loading}
                className="mt-8 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded"
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full min-h-[40vh] bg-card rounded-lg p-8">
            <Frown className="w-16 h-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-headline font-semibold">No Laptops Found</h2>
            <p className="text-muted-foreground mt-2">
              Try adjusting your filters to find what you're looking for.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
