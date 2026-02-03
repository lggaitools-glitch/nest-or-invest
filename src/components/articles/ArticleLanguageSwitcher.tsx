import { Link } from 'react-router-dom';

interface ArticleLanguageSwitcherProps {
  currentLanguage: 'en' | 'es';
  enPath?: string;
  esPath?: string;
}

export function ArticleLanguageSwitcher({
  currentLanguage,
  enPath,
  esPath,
}: ArticleLanguageSwitcherProps) {
  const renderLanguage = (
    code: 'en' | 'es',
    label: string,
    path: string | undefined,
    isActive: boolean
  ) => {
    if (isActive) {
      return (
        <span className="font-medium text-foreground">
          {label}
        </span>
      );
    }

    if (path) {
      return (
        <Link
          to={path}
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          {label}
        </Link>
      );
    }

    return (
      <span className="text-muted-foreground/50 cursor-not-allowed">
        {label}
      </span>
    );
  };

  return (
    <div className="flex items-center gap-2 text-sm">
      {renderLanguage('en', 'EN', enPath, currentLanguage === 'en')}
      <span className="text-muted-foreground/50">|</span>
      {renderLanguage('es', 'ES', esPath, currentLanguage === 'es')}
    </div>
  );
}
