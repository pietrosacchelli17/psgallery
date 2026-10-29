"use client";
import { useEffect } from "react";

/** Small dot in place of the arrow cursor, on devices with a mouse. */
export function DotCursor() {
  useEffect(() => {
    if (!window.matchMedia("(hover:hover) and (pointer:fine)").matches) return;
    const dot = document.createElement("div");
    dot.className = "dot";
    dot.setAttribute("aria-hidden", "true");
    document.body.appendChild(dot);
    document.documentElement.classList.add("has-dot");
    let x = 0, y = 0, raf = 0;
    const draw = () => { dot.style.transform = `translate(${x}px, ${y}px)`; raf = 0; };
    const move = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY; dot.classList.add("on");
      if (!raf) raf = requestAnimationFrame(draw);
      dot.classList.toggle("big", !!(e.target as Element).closest("a, button, summary, input, textarea, select, label"));
    };
    const leave = () => dot.classList.remove("on");
    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      dot.remove();
      document.documentElement.classList.remove("has-dot");
    };
  }, []);
  return null;
}
