import { BottomNavigation } from '@/shared/ui/bottom-navigation';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='grid min-h-[100dvh] grid-rows-[1fr_auto]'>
      <main>{children}</main>
      <footer className='sticky bottom-0 z-50 shadow-[0px_-16px_16px_-20px_rgba(0,0,0,0.45)]'>
        <BottomNavigation />
      </footer>
    </div>
  );
}
