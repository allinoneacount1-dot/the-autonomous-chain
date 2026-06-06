'use client';

import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Hook for GSAP scroll-triggered animations
 * Usage: add useGSAPAnimation() to any component
 */
export function useGSAPAnimation() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // ── Fade-up on scroll ──
    const fadeElements = document.querySelectorAll('.animate-on-scroll');
    fadeElements.forEach((el, i) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: i * 0.05,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    });

    // ── Stagger children ──
    const staggerContainers = document.querySelectorAll('.stagger-children');
    staggerContainers.forEach((container) => {
      const children = container.querySelectorAll('.stagger-item');
      gsap.to(children, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    });

    // ── Scale-in on scroll ──
    const scaleElements = document.querySelectorAll('.animate-scale-in');
    scaleElements.forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    });

    // ── Progress bar fill ──
    const progressBars = document.querySelectorAll('.progress-bar-animated');
    progressBars.forEach((bar) => {
      const forBar = bar.querySelector('.bar-for') as HTMLElement;
      const againstBar = bar.querySelector('.bar-against') as HTMLElement;
      if (forBar && againstBar) {
        const forWidth = forBar.getAttribute('data-width') || '50%';
        const againstWidth = againstBar.getAttribute('data-width') || '50%';
        gsap.fromTo(forBar, { width: '0%' }, {
          width: forWidth,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: bar, start: 'top 85%' },
        });
        gsap.fromTo(againstBar, { width: '0%' }, {
          width: againstWidth,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: bar, start: 'top 85%' },
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);
}

/**
 * Hook for count-up animation on stat values
 */
export function useCountUp(endValue: number, duration: number = 2, suffix: string = '') {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const obj = { val: 0 };
    gsap.to(obj, {
      val: endValue,
      duration,
      ease: 'power1.out',
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = Math.round(obj.val).toLocaleString() + suffix;
        }
      },
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger === ref.current) t.kill();
      });
    };
  }, [endValue, duration, suffix]);

  return ref;
}

/**
 * Hook for dashboard tab content animation
 */
export function useTabTransition() {
  const ref = useRef<HTMLDivElement>(null);

  const animateIn = useCallback(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
    );
  }, []);

  return { ref, animateIn };
}
