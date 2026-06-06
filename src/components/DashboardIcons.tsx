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

export function IconLayout({ className = '', size = 20, style }: IconProps) {
  return <S size={size} className={className} style={style}>
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
  </S>;
}

export function IconWallet({ className = '', size = 20, style }: IconProps) {
  return <S size={size} className={className} style={style}>
    <path d="M21 12V7H5a2 2 0 010-4h14v4" /><path d="M3 5v14a2 2 0 002 2h16v-5" /><path d="M18 12a2 2 0 000 4h4v-4h-4z" />
  </S>;
}

export function IconVote({ className = '', size = 20, style }: IconProps) {
  return <S size={size} className={className} style={style}>
    <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
  </S>;
}

export function IconCoins({ className = '', size = 20, style }: IconProps) {
  return <S size={size} className={className} style={style}>
    <circle cx="8" cy="8" r="6" /><path d="M18.09 10.37A6 6 0 1110.34 18" /><path d="M7 6h1v4" /><path d="M16.71 13.88l.7.71-2.82 2.82" />
  </S>;
}

export function IconSettings({ className = '', size = 20, style }: IconProps) {
  return <S size={size} className={className} style={style}>
    <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
  </S>;
}

export function IconExternal({ className = '', size = 20, style }: IconProps) {
  return <S size={size} className={className} style={style}>
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
  </S>;
}

export function IconArrowRight({ className = '', size = 20, style }: IconProps) {
  return <S size={size} className={className} style={style}>
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </S>;
}

export function IconCheck({ className = '', size = 20, style }: IconProps) {
  return <S size={size} className={className} style={style}>
    <polyline points="20 6 9 17 4 12" />
  </S>;
}

export function IconX({ className = '', size = 20, style }: IconProps) {
  return <S size={size} className={className} style={style}>
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </S>;
}

export function IconLoader({ className = '', size = 20, style }: IconProps) {
  return <S size={size} className={className} style={style}>
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
  </S>;
}
