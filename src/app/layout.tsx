import './globals.css';

// default values
export const dynamic = 'auto';
export const dynamicParams = true;
export const revalidate = false;
export const fetchCache = 'auto';
export const preferredRegion = 'auto';

// changed values
export const runtime = 'edge';

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
