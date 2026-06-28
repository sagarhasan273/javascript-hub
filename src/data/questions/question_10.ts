import { Question } from '../types';

export const question: Question = {
  id: 10,
  title: "What are lambda expressions or arrow functions",
  definition: "Arrow functions provide a concise syntax and inherit this from surrounding context, cannot be used as constructors.",
  answer: `<p>Arrow functions (introduced in ES6) are shorter and more readable.</p>

<h4>Key Features:</h4>
<ul>
  <li>No own <code>this</code>, <code>arguments</code>, <code>super</code>, or <code>new.target</code></li>
  <li>Inherit these from surrounding (lexical) context</li>
  <li>Cannot be used as constructors</li>
  <li>No <code>prototype</code> property</li>
  <li>Cannot use <code>new</code>, <code>yield</code></li>
</ul>

<h4>Syntax Examples:</h4>
<pre><code>// Multiple parameters
const add = (a, b) => a + b;

// Single parameter (no parentheses needed)
const double = x => x * 2;

// No parameters
const greet = () => "Hello!";

// Multiple statements
const calculate = (a, b) => {
  const sum = a + b;
  return sum * 2;
};</code></pre>`
};
