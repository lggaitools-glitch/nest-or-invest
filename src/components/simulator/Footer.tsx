import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 mt-12">
      <div className="container max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p className="flex items-center gap-1">
            Built with <Heart className="h-4 w-4 text-destructive" /> for smart financial decisions
          </p>
          <div className="flex items-center gap-4">
            <span>© 2024 Rent vs Buy Simulator</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">Educational purposes only</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
