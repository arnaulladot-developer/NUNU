"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

export interface CarouselImage {
  src: string;
  alt: string;
  badge?: string;
}

interface CarouselProps {
  images: CarouselImage[];
  ariaLabel: string;
  sizes: string;
  /** Relació d'aspecte 16:9 (fitxa de projecte) en comptes de 4:5 (producte). */
  gran?: boolean;
}

/**
 * Carrusel de fotos amb `scroll-snap` natiu: el gest de passar el dit
 * funciona sense JavaScript; aquest component només afegeix els botons,
 * els punts i el marcador de foto activa amb `IntersectionObserver`
 * (mateix disseny que la maqueta HTML, §7.9 design-system.md).
 */
export function Carousel({ images, ariaLabel, sizes, gran = false }: CarouselProps) {
  const pistaRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [actiu, setActiu] = useState(0);
  const reduceMotionRef = useRef(false);

  useEffect(() => {
    reduceMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const pista = pistaRef.current;
    if (!pista || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            const index = itemRefs.current.findIndex((el) => el === entry.target);
            if (index !== -1) setActiu(index);
          }
        });
      },
      { root: pista, threshold: 0.6 },
    );

    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [images]);

  const vaA = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(images.length - 1, index));
    const item = itemRefs.current[clamped];
    const pista = pistaRef.current;
    if (!item || !pista) return;
    pista.scrollTo({
      left: item.offsetLeft,
      behavior: reduceMotionRef.current ? "auto" : "smooth",
    });
  }, [images.length]);

  return (
    <div className={`carrusel${gran ? " carrusel-gran" : ""}`}>
      <div className="carrusel-pista" ref={pistaRef}>
        {images.map((imatge, index) => (
          <div
            key={imatge.src}
            className="carrusel-item placeholder"
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
          >
            <Image
              src={imatge.src}
              alt={imatge.alt}
              fill
              sizes={sizes}
              style={{ objectFit: "cover" }}
              priority={index === 0}
            />
            {imatge.badge && <span className="badge-exemple">{imatge.badge}</span>}
          </div>
        ))}
      </div>
      <button
        type="button"
        className="carrusel-fletxa carrusel-anterior"
        aria-label="Foto anterior"
        onClick={() => vaA(actiu - 1)}
      >
        ‹
      </button>
      <button
        type="button"
        className="carrusel-fletxa carrusel-seguent"
        aria-label="Foto següent"
        onClick={() => vaA(actiu + 1)}
      >
        ›
      </button>
      <div className="carrusel-punts" role="tablist" aria-label={ariaLabel}>
        {images.map((imatge, index) => (
          <button
            key={imatge.src}
            type="button"
            role="tab"
            aria-label={`Foto ${index + 1}`}
            aria-selected={index === actiu}
            className={index === actiu ? "actiu" : undefined}
            onClick={() => vaA(index)}
          />
        ))}
      </div>
    </div>
  );
}
