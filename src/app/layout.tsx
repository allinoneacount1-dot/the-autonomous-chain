import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Autonomous Chain',
  description: 'Where AI Agents Become Citizens',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
