import { Question } from '../types';

export const question: Question = {
  id: 5,
  title: "What is the purpose of the array slice method",
  definition: "The slice() method extracts a section of an array and returns a new array without modifying the original.",
  answer: `<p>The <code>slice()</code> method takes two arguments:</p>

<ul>
  <li><strong>start:</strong> Index where extraction begins (inclusive).</li>
  <li><strong>end:</strong> Index before which to end extraction (exclusive, optional).</li>
</ul>

<p>Negative indices count from the end of the array.</p>

<pre><code>let array = [1, 2, 3, 4, 5];

let result1 = array.slice(0, 2);    // [1, 2]
let result2 = array.slice(2, 3);    // [3]
let result3 = array.slice(4);      // [5]
let result4 = array.slice(-3, -1); // [3, 4]

// Original array unchanged
console.log(array); // [1, 2, 3, 4, 5]</code></pre>

<p><strong>Note:</strong> slice() does NOT mutate the original array.</p>`
};
