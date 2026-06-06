'use client';
import { CSSProperties } from 'react';

interface IconProps {
  className?: string;
  size?: number;
  style?: CSSProperties;
}

const S = ({ size, className, style, children }: IconProps & { children: React.ReactNode }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    {children}
  </svg>
);

export function IconChain({ className = '', size = 24, style }: IconProps) {
  return <S size={size} className={className} style={style}>
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </S>;
}

export function IconShield({ className = '', size = 24, style }: IconProps) {
  return <S size={size} className={className} style={style}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </S>;
}

export function IconCpu({ className = '', size = 24, style }: IconProps) {
  return <S size={size} className={className} style={style}>
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
  </S>;
}

export function IconVote({ className = '', size = 24, style }: IconProps) {
  return <S size={size} className={className} style={style}>
    <path d="M9 11l3 3L22 4" />
    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
  </S>;
}

export function IconLayers({ className = '', size = 24, style }: IconProps) {
  return <S size={size} className={className} style={style}>
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </S>;
}

export function IconZap({ className = '', size = 24, style }: IconProps) {
  return <S size={size} className={className} style={style}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </S>;
}

export function IconGlobe({ className = '', size = 24, style }: IconProps) {
  return <S size={size} className={className} style={style}>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
  </S>;
}

export function IconArrowRight({ className = '', size = 24, style }: IconProps) {
  return <S size={size} className={className} style={style}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </S>;
}

export function IconGithub({ className = '', size = 24, style }: IconProps) {
  return <S size={size} className={className} style={style}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
  </S>;
}

export function IconExternal({ className = '', size = 24, style }: IconProps) {
  return <S size={size} className={className} style={style}>
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </S>;
}
