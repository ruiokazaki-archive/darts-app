import { InGamePage } from './components/in-game-page';

export const runtime = 'edge';
export const preferredRegion = 'home';
export const dynamic = 'force-dynamic';

export default async function Home() {
  return (
    <main>
      <h1>In Game</h1>
      <InGamePage />
    </main>
  );
}
