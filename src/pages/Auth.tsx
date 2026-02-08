import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SiteNavigation } from '@/components/SiteNavigation';
import { Footer } from '@/components/simulator/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUser } from '@/contexts/UserContext';
import { useLanguage } from '@/i18n/LanguageContext';
import { Mail, Lock, ArrowRight, Crown } from 'lucide-react';

type AuthMode = 'login' | 'signup';

const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, signup, upgradeToPremium } = useUser();
  const { language } = useLanguage();

  const redirectTo = searchParams.get('redirect') || '/compare';
  const requestedPlan = searchParams.get('plan');

  const [mode, setMode] = useState<AuthMode>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const content = {
    en: {
      loginTitle: 'Welcome back',
      signupTitle: 'Create your account',
      loginSubtitle: 'Sign in to access your scenarios',
      signupSubtitle: 'Start comparing scenarios with Premium',
      emailLabel: 'Email',
      emailPlaceholder: 'your@email.com',
      passwordLabel: 'Password',
      passwordPlaceholder: '••••••••',
      loginBtn: 'Sign In',
      signupBtn: 'Create Account',
      forgotPassword: 'Forgot password?',
      noAccount: "Don't have an account?",
      hasAccount: 'Already have an account?',
      signupLink: 'Sign up',
      loginLink: 'Sign in',
      premiumBadge: 'Premium Access',
      premiumDesc: 'You\'ll get access to unlimited scenarios, comparisons, and saved history.',
      error: 'Invalid email or password',
    },
    es: {
      loginTitle: 'Bienvenido de vuelta',
      signupTitle: 'Crea tu cuenta',
      loginSubtitle: 'Inicia sesión para acceder a tus escenarios',
      signupSubtitle: 'Comienza a comparar escenarios con Premium',
      emailLabel: 'Email',
      emailPlaceholder: 'tu@email.com',
      passwordLabel: 'Contraseña',
      passwordPlaceholder: '••••••••',
      loginBtn: 'Iniciar Sesión',
      signupBtn: 'Crear Cuenta',
      forgotPassword: '¿Olvidaste tu contraseña?',
      noAccount: '¿No tienes cuenta?',
      hasAccount: '¿Ya tienes cuenta?',
      signupLink: 'Regístrate',
      loginLink: 'Inicia sesión',
      premiumBadge: 'Acceso Premium',
      premiumDesc: 'Tendrás acceso a escenarios ilimitados, comparaciones e historial guardado.',
      error: 'Email o contraseña inválidos',
    },
  };

  const c = content[language] || content.en;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = mode === 'login' 
        ? await login(email, password)
        : await signup(email, password);

      if (success) {
        if (requestedPlan === 'premium') {
          upgradeToPremium();
        }
        navigate(redirectTo);
      } else {
        setError(c.error);
      }
    } catch (err) {
      setError(c.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>{mode === 'login' ? 'Sign In' : 'Sign Up'} | HomeDecision</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <SiteNavigation />

      <main className="flex-1 container max-w-md mx-auto px-4 py-16">
        <div className="card-elevated-lg p-8 animate-fade-in">
          {/* Premium Badge */}
          {requestedPlan === 'premium' && (
            <div className="mb-6 p-4 rounded-lg bg-primary/10 border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Crown className="h-5 w-5 text-primary" />
                <span className="font-semibold text-foreground">{c.premiumBadge}</span>
              </div>
              <p className="text-sm text-muted-foreground">{c.premiumDesc}</p>
            </div>
          )}

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {mode === 'login' ? c.loginTitle : c.signupTitle}
            </h1>
            <p className="text-muted-foreground">
              {mode === 'login' ? c.loginSubtitle : c.signupSubtitle}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{c.emailLabel}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={c.emailPlaceholder}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{c.passwordLabel}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={c.passwordPlaceholder}
                  className="pl-10"
                  required
                  minLength={6}
                />
              </div>
            </div>

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  {mode === 'login' ? c.loginBtn : c.signupBtn}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          {/* Forgot Password (login only) */}
          {mode === 'login' && (
            <div className="text-center mt-4">
              <button className="text-sm text-primary hover:underline">
                {c.forgotPassword}
              </button>
            </div>
          )}

          {/* Switch Mode */}
          <div className="text-center mt-6 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground">
              {mode === 'login' ? c.noAccount : c.hasAccount}{' '}
              <button
                type="button"
                className="text-primary font-medium hover:underline"
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              >
                {mode === 'login' ? c.signupLink : c.loginLink}
              </button>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Auth;
