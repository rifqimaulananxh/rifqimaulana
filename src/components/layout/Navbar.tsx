"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface MenuItem {
  id: string;
  label: string;
  href: string;
  image: string;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: "home",
    label: "HOME",
    href: "/",
    image: "/images/menu/home.png",
  },
  {
    id: "work",
    label: "WORK",
    href: "#work",
    image: "/images/menu/work.png",
  },
  {
    id: "services",
    label: "SERVICES",
    href: "#services",
    image: "/images/menu/rose.png",
  },
  {
    id: "faq",
    label: "FAQ",
    href: "#faq",
    image: "/images/menu/work.png",
  },
  {
    id: "about",
    label: "ABOUT ME",
    href: "#about",
    image: "/images/menu/about.png",
  },
  {
    id: "contact",
    label: "CONTACT",
    href: "#contact",
    image: "/images/menu/rose.png",
  },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <>
      {/* Top Navbar Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-8 sm:px-14 lg:px-20 py-8 flex items-center justify-between pointer-events-auto select-none bg-transparent">
        {/* Brand Logo */}
        <Link
          href="/"
          className="font-bold text-xl sm:text-2xl tracking-tighter text-black hover:opacity-70 transition-opacity"
        >
          RM
        </Link>

        {/* Hamburger Menu / Close Icon Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          className="group p-2 cursor-pointer z-50 flex items-center justify-center text-black"
        >
          {isOpen ? (
            /* Close X Icon matching reference screenshot */
            <svg
              className="w-6 h-6 stroke-black transition-transform duration-300 group-hover:rotate-90"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            /* Hamburger Icon */
            <div className="flex flex-col items-end justify-center gap-[6px] w-8 h-8">
              <span className="h-[1.5px] w-6 bg-black transition-all duration-300 group-hover:w-7" />
              <span className="h-[1.5px] w-6 bg-black transition-all duration-300 group-hover:w-5" />
            </div>
          )}
        </button>
      </header>

      {/* Full-Screen Menu Drawer matching reference screenshot 1:1 */}
      <div
        className={`fixed inset-0 z-40 bg-[#f2f2f2] text-black w-screen h-screen transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isOpen
            ? "translate-y-0 pointer-events-auto"
            : "-translate-y-full pointer-events-none"
        }`}
      >
        <div className="w-full h-full flex items-center justify-between px-8 sm:px-14 lg:px-20 py-16 select-none">
          {/* Left Column (flex-1): DESIGN FIRST DEVELOPER */}
          <div className="flex-1 flex justify-start items-center">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-light leading-[0.92] tracking-tight uppercase text-black">
              DESIGN <br />
              FIRST <br />
              DEVELOPER
            </h1>
          </div>

          {/* Center Column (flex-1): Perfectly Centered Horizontal Landscape Image Container */}
          <div className="hidden lg:flex flex-1 justify-center items-center">
            <div className="relative w-[300px] lg:w-[340px] xl:w-[380px] h-[150px] lg:h-[170px] xl:h-[190px] bg-black overflow-hidden shadow-sm">
              {MENU_ITEMS.map((item, index) => {
                // Precise liquid stack math
                let translateY = "100%";
                if (index === activeIndex) {
                  translateY = "0%";
                } else if (index < activeIndex) {
                  translateY = "-100%";
                }

                return (
                  <div
                    key={item.id}
                    className="absolute inset-0 overflow-hidden transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform"
                    style={{
                      transform: `translate3d(0, ${translateY}, 0)`,
                    }}
                  >
                    <Image
                      src={item.image}
                      alt={item.label}
                      fill
                      priority
                      className="object-cover"
                      sizes="380px"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column (flex-1): Menu Items List */}
          <div className="flex-1 flex justify-end items-center">
            <ul className="flex flex-col gap-2 sm:gap-3.5 text-left font-light tracking-wide">
              {MENU_ITEMS.map((item, index) => {
                const isHovered = activeIndex === index;
                return (
                  <li key={item.id} className="cursor-pointer">
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      onMouseEnter={() => setActiveIndex(index)}
                      className={`block text-2xl sm:text-4xl lg:text-5xl uppercase transition-opacity duration-300 ${
                        isHovered
                          ? "text-black opacity-100 font-normal"
                          : "text-neutral-500 opacity-40 hover:opacity-100"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
