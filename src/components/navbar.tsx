"use client";

const navItems = ["About", "Experience", "Projects", "Contact"];

export function Navbar() {
  return (
    <div className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="flex items-center gap-1 rounded-full border border-black/[0.08] bg-white/70 px-2 py-1.5 shadow-lg shadow-black/[0.03] backdrop-blur-xl">
        <a
          href="#"
          className="mr-2 hidden pl-3 pr-4 font-display text-base text-foreground sm:block"
        >
          Sonny Taylor
        </a>
        <div className="hidden h-4 w-px bg-black/10 sm:block" />
        {navItems.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="rounded-full px-3 py-1.5 font-mono text-[11px] font-medium text-muted-foreground transition-colors hover:bg-black/[0.04] hover:text-foreground sm:px-4"
          >
            {item}
          </a>
        ))}
      </nav>
    </div>
  );
}
