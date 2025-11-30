import React from 'react';
import { 
  Calculator, 
  FlaskConical, 
  Globe, 
  BookOpen, 
  Languages, 
  Monitor, 
  Brain, 
  Lightbulb, 
  ArrowLeft, 
  Sparkles,
  ChevronRight,
  ChevronDown,
  BookMarked,
  GraduationCap,
  Search,
  Zap,
  X,
  CheckCircle,
  Circle,
  Play,
  Clock,
  User,
  Film,
  Youtube,
  ExternalLink,
  Target
} from 'lucide-react';
import { IconName } from '../types';

export const Icon: React.FC<{ name: IconName; className?: string; size?: number }> = ({ name, className, size = 24 }) => {
  const icons: Record<IconName, React.ElementType> = {
    Calculator,
    FlaskConical,
    Globe,
    BookOpen,
    Languages,
    Monitor,
    Brain,
    Lightbulb,
    ArrowLeft,
    Sparkles,
    Play,
    Clock,
    User,
    Film,
    Youtube,
    ExternalLink,
    Target
  };

  const IconComponent = icons[name] || Sparkles;
  return <IconComponent className={className} size={size} />;
};

export { 
  ChevronRight, 
  ChevronDown,
  BookMarked, 
  GraduationCap, 
  ArrowLeft, 
  Sparkles, 
  Lightbulb, 
  Search, 
  Brain, 
  Monitor, 
  Zap, 
  X, 
  CheckCircle, 
  Circle,
  Play,
  Clock,
  User,
  Film,
  Youtube,
  ExternalLink,
  Target
};