import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ja'>
      <body className='bg-zinc-900'>{children}</body>
    </html>
  );
}
