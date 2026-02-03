import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface AvailableInLanguageProps {
  currentLanguage: 'en' | 'es';
  translationPath?: string;
}

export function AvailableInLanguage({
  currentLanguage,
  translationPath,
}: AvailableInLanguageProps) {
  if (!translationPath) {
    return null;
  }

  const text = currentLanguage === 'en' 
    ? 'Disponible en español' 
    : 'Available in English';

  return (
    <div className="mb-6">
      <Link
        to={translationPath}
        className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
      >
        {text}
        <ArrowRight className="h-3 w-3" />
      </Link>
    </div>
  );
}
