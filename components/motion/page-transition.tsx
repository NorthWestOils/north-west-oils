"use client";

import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ease } from "@/lib/motion";

/**
 * Route transition.
 *
 * Deliberately almost nothing: a short fade on navigation so pages do not
 * snap, and nothing at all on first load — animating the first paint would
 * only push out the largest contentful paint for no benefit.
 */
let hasNavigated = false;

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  useEffect(() => {
    hasNavigated = true;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  if (reduced) return <>{children}</>;

  return (
    <motion.div
      key={pathname}
      initial={hasNavigated ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.28, ease: ease.out }}
      className="flex min-h-dvh flex-col"
    >
      {children}
    </motion.div>
  );
}
