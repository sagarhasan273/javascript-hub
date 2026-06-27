import { Menu, X, ChevronRight, Code, PlusCircle, Search, XCircle } from 'lucide-react';
import { Question } from '../data/types';
import { useState, useMemo } from 'react';

interface SidebarProps {
  questions: Question[];
  currentQuestion: number | null;
  onSelectQuestion: (id: number) => void;
  onAddNew: () => void;
}

export default function Sidebar({
  questions,
  currentQuestion,
  onSelectQuestion,
  onAddNew,
}: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter questions based on search query
  const filteredQuestions = useMemo(() => {
    if (!searchQuery.trim()) return questions;

    const query = searchQuery.toLowerCase().trim();
    const queryNumber = parseInt(query, 10);

    return questions.filter((question) => {
      if (queryNumber && question.id === queryNumber) return true;
      if (question.title.toLowerCase().includes(query)) return true;
      if (question.definition.toLowerCase().includes(query)) return true;
      return false;
    });
  }, [questions, searchQuery]);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900 text-white rounded-xl shadow-lg hover:bg-slate-800 transition-colors"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-72 bg-gradient-to-b from-slate-900 to-slate-950 text-white
          flex flex-col shadow-2xl flex-shrink-0 transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-bold flex items-center gap-3">
            <Code size={26} className="text-amber-400" />
            My Q&A Builder
          </h2>
          <p className="text-slate-400 text-sm mt-1">Add unlimited questions</p>
        </div>

        {/* Search Bar */}
        <div className="px-4 py-4 border-b border-white/10">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search by # or text..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-white
                placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
              >
                <XCircle size={16} />
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="mt-2 text-xs text-slate-400">
              {filteredQuestions.length === 0
                ? 'No matches found'
                : `${filteredQuestions.length} question${filteredQuestions.length !== 1 ? 's' : ''} found`}
            </p>
          )}
        </div>

        {/* Question Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1.5">
          {filteredQuestions.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <Search size={28} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">No questions match</p>
            </div>
          ) : (
            filteredQuestions.map((question, index) => (
              <button
                key={question.id}
                onClick={() => {
                  onSelectQuestion(question.id);
                  setIsOpen(false);
                }}
                className={`w-full group flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200
                  ${currentQuestion === question.id
                    ? 'bg-blue-600 text-white font-semibold shadow-lg shadow-blue-500/30'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
              >
                <Code size={16} className={currentQuestion === question.id ? 'text-white' : 'text-slate-500'} />
                <span className="flex-1 text-sm truncate">
                  {index + 1}. {question.title}
                </span>
                <ChevronRight
                  size={16}
                  className={`flex-shrink-0 opacity-50 group-hover:opacity-100 transition-transform
                    ${currentQuestion === question.id ? 'rotate-90' : ''}`}
                />
              </button>
            ))
          )}
        </nav>

        {/* Add New Button */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => {
              onAddNew();
              setIsOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-xl
              font-semibold hover:bg-blue-700 transition-colors"
          >
            <PlusCircle size={20} />
            Add New Question
          </button>
        </div>
      </aside>
    </>
  );
}
