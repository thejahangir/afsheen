import React from 'react';
import { Subject, IconName } from '../types';
import { Icon } from './Icons';

interface SubjectCardProps {
  subject: Subject;
  onClick: (id: string) => void;
}

export const SubjectCard: React.FC<SubjectCardProps> = ({ subject, onClick }) => {
  return (
    <div 
      onClick={() => onClick(subject.id)}
      className="group relative bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:shadow-indigo-500/30 hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer border border-slate-700 hover:border-slate-600 overflow-hidden"
    >
      <div className={`absolute top-0 left-0 w-1 h-full ${subject.color} transition-all duration-300 group-hover:w-2 opacity-80`} />
      
      {/* Background glow effect on hover */}
      <div className={`absolute -right-10 -bottom-10 w-32 h-32 ${subject.color} blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-full pointer-events-none`} />

      <div className="relative z-10 flex flex-col items-start h-full">
        <div className={`p-3 rounded-xl ${subject.color} bg-opacity-20 mb-4 group-hover:scale-110 transition-transform duration-300 border border-white/5`}>
          {/* Ensure icon uses the text color equivalent of the bg color, or white */}
          <Icon name={subject.icon as IconName} className="text-slate-100" size={32} />
        </div>
        
        <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-indigo-400 transition-colors">
          {subject.name}
        </h3>
        
        <p className="text-slate-400 text-sm leading-relaxed mb-4">
          {subject.description}
        </p>
        
        <div className="mt-auto flex items-center text-sm font-semibold text-slate-500 group-hover:text-indigo-400 transition-colors">
          View Notes <span className="ml-2">→</span>
        </div>
      </div>
    </div>
  );
};