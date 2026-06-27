import { useState, useEffect, useRef } from 'react';
import { Eye, EyeOff, Edit, Trash2 } from 'lucide-react';
import { Question } from '../data/types';
import { highlightCodeBlocks } from '../utils/highlight';

interface QuestionCardProps {
  question: Question;
  index: number;
  onEdit: (question: Question) => void;
  onDelete: (id: number) => void;
  isActive: boolean;
}

export default function QuestionCard({
  question,
  index,
  onEdit,
  onDelete,
  isActive,
}: QuestionCardProps) {
  const [isAnswerVisible, setIsAnswerVisible] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isActive]);

  // Highlight code blocks in the answer
  const highlightedAnswer = highlightCodeBlocks(question.answer || '');

  return (
    <div
      ref={cardRef}
      id={`question-${question.id}`}
      className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 transition-all"
    >
      {/* Header */}
      <div className="flex justify-between items-start gap-4 mb-5 flex-wrap">
        <h3 className="text-xl font-bold flex items-center gap-3 text-slate-800">
          <span className="bg-blue-600 text-white rounded-full px-4 py-1 text-base font-bold">
            {index + 1}
          </span>
          {question.title}
        </h3>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => setIsAnswerVisible(!isAnswerVisible)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all
              ${isAnswerVisible
                ? 'bg-slate-100 text-slate-700 hover:bg-blue-600 hover:text-white'
                : 'bg-blue-600 text-white'
              }`}
          >
            {isAnswerVisible ? <Eye size={18} /> : <EyeOff size={18} />}
            {isAnswerVisible ? 'Hide' : 'Show'}
          </button>

          <button
            onClick={() => onEdit(question)}
            className="flex items-center gap-2 px-4 py-2 rounded-full font-semibold bg-slate-100 text-slate-700 hover:bg-blue-600 hover:text-white transition-all"
          >
            <Edit size={16} />
            Edit
          </button>

          <button
            onClick={() => {
              if (window.confirm('Delete this question?')) {
                onDelete(question.id);
              }
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-full text-red-600 border border-red-200 hover:bg-red-50 transition-all text-sm font-medium"
          >
            <Trash2 size={16} />
            Del
          </button>
        </div>
      </div>

      {/* Answer Body */}
      <div
        className={`transition-all duration-200 overflow-hidden ${isAnswerVisible ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        {/* Definition Box */}
        <div className="bg-blue-50 border-l-4 border-blue-600 rounded-xl p-5 mb-5">
          <strong className="text-slate-700">Definition:</strong>{' '}
          <span className="text-slate-600">{question.definition || 'N/A'}</span>
        </div>

        {/* Answer HTML Content with highlighted code */}
        <div
          className="prose prose-slate max-w-none"
          dangerouslySetInnerHTML={{ __html: highlightedAnswer }}
        />
      </div>
    </div>
  );
}
