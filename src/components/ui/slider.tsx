'use client';

import {
  Sheet,
  SheetContent,
  SheetClose,
} from './sheet';

interface NavLink {
  href: string;
  label: string;
}

interface SliderProps {
  navLinks: NavLink[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function Slider({ navLinks, open, onOpenChange }: SliderProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-64 bg-white p-4">
        <SheetClose asChild>
          <button className="mb-4 text-xl" aria-label="Close menu">✖</button>
        </SheetClose>

        <ul className="space-y-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => onOpenChange(false)} // close slider when link clicked
                className="text-lg"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
