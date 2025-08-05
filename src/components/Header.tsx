'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Menu } from 'lucide-react';
import { useCart } from '@/context/CartProvider';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import Slider from './ui/slider';
import { useIsMobile } from '@/hooks/use-mobile';

export default function Header() {
  const { cartCount } = useCart();
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [sliderOpen, setSliderOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/about', label: 'About Us' },
  ];

  return (
    <>
      {/* Topmost header with scrolling text - Fixed */}
      <div className="fixed top-0 left-0 w-full bg-primary text-primary-foreground text-center py-1 overflow-hidden z-50">
        <div className="animate-scroll-text whitespace-nowrap">
          Free Delivery Across Pakistan&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Free Delivery Across Pakistan
        </div>
      </div>

      <header className="fixed top-6 left-0 w-full bg-card shadow-md z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* LEFT SIDE: Hamburger on mobile, Logo always */}
            <div className="flex items-center gap-3">
              {isMobile && (
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open menu"
                  onClick={() => setSliderOpen(true)}
                >
                  <Menu className="h-6 w-6 text-foreground" />
                </Button>
              )}

              <Link href="/" className="flex items-center gap-3">
                <Image
                  src="/logo.png"
                  alt="Lapzen logo icon"
                  width={40}
                  height={40}
                  className="h-10 w-auto object-contain"
                  priority
                />
                <span className="text-3xl font-extrabold font-headline text-primary">
                  Lapzen
                </span>
              </Link>
            </div>

            {/* CENTER/RIGHT: Nav links or empty space on mobile */}
            {!isMobile && (
              <nav className="hidden md:flex items-center space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'font-body text-lg font-medium transition-colors hover:text-primary',
                      pathname === link.href ? 'text-primary' : 'text-foreground/70'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            )}

            {/* CART ICON */}
            <div className="flex items-center gap-4">
              <Link href="/cart">
                <Button variant="ghost" size="icon" aria-label="Open cart">
                  <div className="relative">
                    <ShoppingCart className="h-6 w-6 text-foreground" />
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        {cartCount}
                      </span>
                    )}
                  </div>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* SLIDER (drawer) */}
      <Slider
        navLinks={navLinks}
        open={sliderOpen}
        onOpenChange={setSliderOpen}
      />
    </>
  );
}
