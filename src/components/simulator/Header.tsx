import { Home, TrendingUp } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10">
              <div className="flex items-center">
                <Home className="h-5 w-5 text-primary" />
                <TrendingUp className="h-4 w-4 text-primary -ml-1" />
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground font-display">
                Rent vs Buy
              </h1>
              <p className="text-xs text-muted-foreground">Wealth Simulator</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-1 rounded-full bg-accent text-accent-foreground font-medium">
              Free Version
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
