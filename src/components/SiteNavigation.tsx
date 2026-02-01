import { Home, Menu, ChevronDown, Calculator } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { LanguageSelector } from '@/components/simulator/LanguageSelector';
import { useLanguage } from '@/i18n/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import logo from '@/assets/logo.png';

export function SiteNavigation() {
  const { t } = useLanguage();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src={logo} alt="HomeDecision Logo" className="h-10 w-10" />
            <div>
              <h1 className="text-lg font-bold text-foreground font-display">
                {t.header.title}
              </h1>
              <p className="text-xs text-muted-foreground">{t.header.subtitle}</p>
            </div>
          </Link>
          
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Menu className="h-4 w-4" />
                  <span className="hidden sm:inline">{t.simulate.nav.menu}</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-popover">
                <DropdownMenuItem asChild>
                  <Link 
                    to="/" 
                    className={`flex items-center gap-2 cursor-pointer ${isActive('/') ? 'bg-accent' : ''}`}
                  >
                    <Home className="h-4 w-4" />
                    {t.simulate.nav.home}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link 
                    to="/simulate" 
                    className={`flex items-center gap-2 cursor-pointer ${isActive('/simulate') ? 'bg-accent' : ''}`}
                  >
                    <Calculator className="h-4 w-4" />
                    {t.simulate.nav.simulate}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <LanguageSelector />
          </div>
        </div>
      </div>
    </header>
  );
}
