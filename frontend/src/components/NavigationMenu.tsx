"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function NavigationMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: PointerEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div ref={menuRef} className="relative ml-auto">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="ceylon-navigation-menu"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 rounded-xl border border-white/50 px-5 py-3 font-semibold transition hover:border-gold hover:bg-white/10"
      >
        <span aria-hidden="true">☰</span>
        <span>Menu</span>
      </button>

      {isOpen && (
        <div
          id="ceylon-navigation-menu"
          className="absolute right-0 top-full z-50 mt-3 flex w-52 flex-col gap-1 rounded-xl border border-white/20 bg-[var(--brand-primary-dark)] p-2 text-sm font-medium text-white shadow-xl"
        >
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="rounded-lg px-4 py-3 transition hover:bg-white/10"
          >
            Home
          </Link>

          <a
            href="#destinations"
            onClick={() => setIsOpen(false)}
            className="rounded-lg px-4 py-3 transition hover:bg-white/10"
          >
            Destinations
          </a>

          <Link
            href="/admin/login"
            onClick={() => setIsOpen(false)}
            className="rounded-lg px-4 py-3 transition hover:bg-white/10"
          >
            Admin Login
          </Link>
        </div>
      )}
    </div>
  );
}