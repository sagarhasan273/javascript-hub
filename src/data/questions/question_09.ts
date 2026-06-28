import { Question } from '../types';

export const question: Question = {
  id: 9,
  title: "What is the difference between == and === operators",
  definition: "== performs type coercion before comparison; === compares both value and type without coercion.",
  answer: `<h4>Strict Equality (===)</h4>
<p>Compares value AND type without conversion.</p>
<ul>
  <li><code>NaN === NaN</code> is <code>false</code></li>
  <li><code>+0 === -0</code> is <code>true</code></li>
  <li>Objects equal only if same reference</li>
  <li><code>null === undefined</code> is <code>false</code></li>
</ul>

<h4>Loose Equality (==)</h4>
<p>Converts operands to same type before comparing.</p>
<ul>
  <li><code>null == undefined</code> is <code>true</code></li>
  <li><code>"1" == 1</code> is <code>true</code></li>
  <li><code>0 == false</code> is <code>true</code></li>
</ul>

<pre><code>0 == false      // true (type coercion)
0 === false     // false (different types)
1 == "1"        // true
1 === "1"       // false
null == undefined // true
null === undefined // false
NaN === NaN     // false
[] == []        // false (different references)</code></pre>`
};
