import { BottomNavigation } from './_components/bottom-navigation';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main>{children}</main>
      <footer className='sticky bottom-0 z-50 shadow-[0px_-16px_16px_-20px_rgba(0,0,0,0.45)]'>
        <BottomNavigation />
      </footer>
    </>
  );
}
