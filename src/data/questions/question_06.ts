import { Question } from '../types';

export const question: Question = {
  id: 6,
  title: "What is the purpose of the array splice method",
  definition: "The splice() method adds, removes, or replaces elements in an array by modifying it in place.",
  answer: `<p>The <code>splice()</code> method modifies the original array and returns removed elements.</p>

<h4>Syntax:</h4>
<pre><code>array.splice(start, deleteCount, item1, item2, ...)</code></pre>

<ul>
  <li><strong>start:</strong> Index to start changing the array.</li>
  <li><strong>deleteCount:</strong> Number of elements to remove (optional).</li>
  <li><strong>items:</strong> Elements to add (optional).</li>
</ul>

<pre><code>let arr1 = [1, 2, 3, 4, 5];
arr1.splice(0, 2);  // Returns [1, 2]
// arr1 is now [3, 4, 5]

let arr2 = [1, 2, 3, 4, 5];
arr2.splice(3);     // Returns [4, 5]
// arr2 is now [1, 2, 3]

let arr3 = [1, 2, 3, 4, 5];
arr3.splice(3, 1, "a", "b", "c"); // Returns [4]
// arr3 is now [1, 2, 3, "a", "b", "c", 5]</code></pre>

<p><strong>Note:</strong> splice() DOES mutate the original array.</p>`
};
