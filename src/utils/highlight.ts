// utils/highlight.ts

// Decode HTML entities in the entire content
function decodeHtmlEntities(text: string): string {
  if (!text) return '';
  return text
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

// JavaScript syntax highlighter
export function highlightJS(code: string): string {
  // First decode any HTML entities in the code
  let highlighted = decodeHtmlEntities(code);

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

  // Strings (green) - handle double quotes, single quotes, and template literals
  highlighted = highlighted.replace(
    /("[^"\\]*(\\.[^"\\]*)*"|'[^'\\]*(\\.[^'\\]*)*'|`[^`\\]*(\\.[^`\\]*)*`)/g,
    '<span class="text-emerald-400">$1</span>'
  );

  // Numbers (orange)
  highlighted = highlighted.replace(
    /\b(\d+\.?\d*)\b/g,
    '<span class="text-orange-400">$1</span>'
  );

  // Single-line comments
  highlighted = highlighted.replace(
    /(\/\/.*?)(?=\n|$)/g,
    '<span class="text-slate-500 italic">$1</span>'
  );

  // Multi-line comments
  highlighted = highlighted.replace(
    /(\/\*[\s\S]*?\*\/)/g,
    '<span class="text-slate-500 italic">$1</span>'
  );

  // Arrow functions and comparison operators
  highlighted = highlighted.replace(
    /(=>|>=|<=|==|===|!=|!==)/g,
    '<span class="text-pink-400">$1</span>'
  );

  // Other operators (but avoid messing with arrow functions)
  highlighted = highlighted.replace(
    /([+\-*/%&|^~?])/g,
    '<span class="text-pink-300">$1</span>'
  );

  return highlighted;
}

// Main function to highlight code blocks in HTML content
export function highlightCodeBlocks(html: string): string {
  if (!html) return '';
  
  // First, decode all HTML entities in the entire content
  let decodedHtml = decodeHtmlEntities(html);
  
  // Find and highlight all <pre><code> blocks
  decodedHtml = decodedHtml.replace(
    /<pre><code>([\s\S]*?)<\/code><\/pre>/g,
    (match, code) => {
      // The code is already decoded from the previous step
      const highlighted = highlightJS(code);
      // Return with the highlighted code inside pre tags
      return `<pre class="bg-slate-900 rounded-xl p-4 overflow-x-auto"><code class="text-sm font-mono">${highlighted}</code></pre>`;
    }
  );
  
  // Handle inline <code> tags (not inside pre)
  // Only if they don't already have highlighting classes
  decodedHtml = decodedHtml.replace(
    /<code(?![^>]*class="[^"]*text-)[^>]*>([\s\S]*?)<\/code>/g,
    (match, code) => {
      // Decode the content
      const decodedCode = decodeHtmlEntities(code);
      // Apply basic highlighting to inline code
      const highlighted = highlightJS(decodedCode);
      return `<code class="bg-slate-100 px-1.5 py-0.5 rounded text-sm font-mono text-pink-600">${highlighted}</code>`;
    }
  );
  
  return decodedHtml;
}

// Alternative: Minimal processing version if you just want to fix the display
export function highlightCodeBlocksMinimal(html: string): string {
  if (!html) return '';
  
  // Just decode HTML entities and return
  return decodeHtmlEntities(html);
}