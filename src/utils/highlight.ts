// JavaScript syntax highlighter
export function highlightJS(code: string): string {
  // Escape HTML first
  let highlighted = escapeHtml(code);

  // Keywords (purple/blue)
  highlighted = highlighted.replace(
    /\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|new|this|class|extends|constructor|static|get|set|async|await|import|export|from|default|typeof|instanceof|try|catch|finally|throw|yield|true|false|null|undefined|NaN|Infinity)\b/g,
    '<span class="text-purple-400 font-semibold">$1</span>'
  );

  // Built-in objects (yellow)
  highlighted = highlighted.replace(
    /\b(Object|Array|String|Number|Boolean|Function|Symbol|Map|Set|Promise|JSON|console|Math|Date|Error|RegExp|parseInt|parseFloat|isNaN|isFinite)\b/g,
    '<span class="text-yellow-300">$1</span>'
  );

  // Methods (cyan)
  highlighted = highlighted.replace(
    /\.(log|parse|stringify|keys|values|entries|create|assign|prototype|call|apply|bind|slice|splice|push|pop|shift|unshift|map|filter|reduce|forEach|find|includes|indexOf|split|join|replace|match|trim|toUpperCase|toLowerCase|getPrototypeOf|setPrototypeOf|defineProperty|getOwnPropertyNames|freeze|seal|entries|from|of|fill|reverse|sort|concat|includes|indexOf|lastIndexOf|every|some|findIndex|flat|flatMap|copyWithin|values|keys)\b/g,
    '.<span class="text-cyan-400">$1</span>'
  );

  // Strings (green) - handle both single and double quotes
  highlighted = highlighted.replace(
    /(&quot;[^&]*&quot;|&#x27;[^&]*&#x27;|"[^"]*"|'[^']*')/g,
    '<span class="text-emerald-400">$1</span>'
  );

  // Template literals
  highlighted = highlighted.replace(
    /(`[^`]*`)/g,
    '<span class="text-emerald-400">$1</span>'
  );

  // Numbers (orange)
  highlighted = highlighted.replace(
    /\b(\d+\.?\d*)\b/g,
    '<span class="text-orange-400">$1</span>'
  );

  // Comments (gray italic) - single line
  highlighted = highlighted.replace(
    /(\/\/.*?)(\n|$)/g,
    '<span class="text-slate-500 italic">$1</span>$2'
  );

  // Multi-line comments
  highlighted = highlighted.replace(
    /(\/\*[\s\S]*?\*\/)/g,
    '<span class="text-slate-500 italic">$1</span>'
  );

  // Arrow functions
  highlighted = highlighted.replace(
    /(&gt;|>)/g,
    '<span class="text-pink-400">$1</span>'
  );

  // Operators
  highlighted = highlighted.replace(
    /([=+\-*/%!&|^~?:])/g,
    '<span class="text-pink-300">$1</span>'
  );

  return highlighted;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

// Process HTML content and highlight code blocks
export function highlightCodeBlocks(html: string): string {
  // Find all <pre><code> blocks and highlight them
  return html.replace(
    /<pre><code>([\s\S]*?)<\/code><\/pre>/g,
    (match, code) => {
      // Decode HTML entities
      const decodedCode = code
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#x27;/g, "'");

      const highlighted = highlightJS(decodedCode);
      return `<pre><code>${highlighted}</code></pre>`;
    }
  );
}
