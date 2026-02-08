import { Home, Menu, ChevronDown, Calculator, FileText, CreditCard, Crown, LogIn } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { LanguageSelector } from '@/components/simulator/LanguageSelector';
import { useLanguage } from '@/i18n/LanguageContext';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import logo from '@/assets/logo.png';

export function SiteNavigation() {
  const { t } = useLanguage();
  const { isLoggedIn, isPremium, user, logout } = useUser();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  const isArticlesActive = () => location.pathname.startsWith('/articles');

  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity min-w-0">
            <img src={logo} alt="HomeDecision Logo" className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0" />
            <div className="hidden sm:block min-w-0">
              <h1 className="text-lg font-bold text-foreground font-display truncate">
                {t.header.title}
              </h1>
              <p className="text-xs text-muted-foreground truncate">{t.header.subtitle}</p>
            </div>
          </Link>
          
          <div className="flex items-center gap-1 sm:gap-3">
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
                <DropdownMenuItem asChild>
                  <Link 
                    to="/pricing" 
                    className={`flex items-center gap-2 cursor-pointer ${isActive('/pricing') ? 'bg-accent' : ''}`}
                  >
                    <CreditCard className="h-4 w-4" />
                    Pricing
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link 
                    to="/articles" 
                    className={`flex items-center gap-2 cursor-pointer ${isArticlesActive() ? 'bg-accent' : ''}`}
                  >
                    <FileText className="h-4 w-4" />
                    Insights
                  </Link>
                </DropdownMenuItem>
                {isPremium && (
                  <DropdownMenuItem asChild>
                    <Link 
                      to="/compare" 
                      className={`flex items-center gap-2 cursor-pointer ${isActive('/compare') ? 'bg-accent' : ''}`}
                    >
                      <Crown className="h-4 w-4 text-primary" />
                      Compare
                    </Link>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <LanguageSelector />

            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    {isPremium && <Crown className="h-3 w-3 text-primary" />}
                    <span className="hidden sm:inline max-w-24 truncate">{user?.email}</span>
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-popover">
                  {isPremium && (
                    <DropdownMenuItem asChild>
                      <Link to="/compare" className="flex items-center gap-2 cursor-pointer">
                        <Crown className="h-4 w-4 text-primary" />
                        Compare Scenarios
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {!isPremium && (
                    <DropdownMenuItem asChild>
                      <Link to="/pricing" className="flex items-center gap-2 cursor-pointer">
                        <Crown className="h-4 w-4" />
                        Upgrade to Premium
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive">
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="outline" size="sm">
                <Link to="/auth" className="gap-2">
                  <LogIn className="h-4 w-4" />
                  <span className="hidden sm:inline">Sign In</span>
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
