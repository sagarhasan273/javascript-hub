import { useState, useEffect } from 'react';
import { Save, Pen, X, List, Code, AlignLeft } from 'lucide-react';
import { Question } from '../data/types';

interface QuestionFormProps {
  editingQuestion: Question | null;
  onSave: (question: Omit<Question, 'id'> & { id?: number }) => void;
  onCancel: () => void;
  scrollToForm: boolean;
}

export default function QuestionForm({
  editingQuestion,
  onSave,
  onCancel,
  scrollToForm,
}: QuestionFormProps) {
  const [title, setTitle] = useState('');
  const [definition, setDefinition] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    if (editingQuestion) {
      setTitle(editingQuestion.title);
      setDefinition(editingQuestion.definition);
      setAnswer(editingQuestion.answer);
    } else {
      setTitle('');
      setDefinition('');
      setAnswer('');
    }
  }, [editingQuestion]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Question title is required.');
      return;
    }

    onSave({
      id: editingQuestion?.id,
      title: title.trim(),
      definition: definition.trim(),
      answer: answer.trim(),
    });

    setTitle('');
    setDefinition('');
    setAnswer('');
  };

  return (
    <div
      id="addQuestionForm"
      className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mb-10"
    >
      <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-slate-800">
        {editingQuestion ? (
          <>
            <Pen size={22} className="text-blue-600" />
            Edit Question
          </>
        ) : (
          <>
            <Save size={22} className="text-blue-600" />
            Create Question
          </>
        )}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-semibold mb-2 text-slate-700">
            Question Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., What is closure?"
            className="w-full px-4 py-3 border border-slate-300 rounded-2xl text-base bg-slate-50 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2 text-slate-700">
            Short Definition / Summary
          </label>
          <input
            type="text"
            value={definition}
            onChange={(e) => setDefinition(e.target.value)}
            placeholder="A brief one-liner definition"
            className="w-full px-4 py-3 border border-slate-300 rounded-2xl text-base bg-slate-50 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2 text-slate-700">
            Full Answer (supports HTML: lists, code, text)
          </label>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={7}
            placeholder={`Use <ol>, <ul>, <pre><code>, <p> etc.
Example:
<ol><li>First point</li><li>Second point</li></ol>
<pre><code>const x = 10;</code></pre>`}
            className="w-full px-4 py-3 border border-slate-300 rounded-2xl text-base bg-slate-50 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all font-mono text-sm"
          />
          <div className="flex gap-4 mt-2 text-xs text-slate-500 flex-wrap">
            <span className="flex items-center gap-1"><List size={14} /> <code>&lt;ol&gt;</code> ordered</span>
            <span className="flex items-center gap-1"><List size={14} /> <code>&lt;ul&gt;</code> unordered</span>
            <span className="flex items-center gap-1"><Code size={14} /> <code>&lt;pre&gt;&lt;code&gt;</code></span>
            <span className="flex items-center gap-1"><AlignLeft size={14} /> <code>&lt;p&gt;</code></span>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors"
          >
            {editingQuestion ? (
              <>
                <Pen size={18} />
                Update Question
              </>
            ) : (
              <>
                <Save size={18} />
                Save Question
              </>
            )}
          </button>

          {editingQuestion && (
            <button
              type="button"
              onClick={onCancel}
              className="flex items-center gap-2 px-6 py-3 bg-slate-500 text-white rounded-full font-semibold hover:bg-slate-600 transition-colors"
            >
              <X size={18} />
              Cancel Edit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
