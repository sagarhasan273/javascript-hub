import { Question } from '../types';

export const question: Question = {
  id: 8,
  title: "How do you compare Object and Map",
  definition: "Objects use string/symbol keys only; Maps allow any key type, maintain insertion order, and are optimized for frequent changes.",
  answer: `<p>Both associate keys with values, but Maps are better for certain scenarios:</p>

<table>
  <tr>
    <th>Feature</th>
    <th>Object</th>
    <th>Map</th>
  </tr>
  <tr>
    <td>Key Types</td>
    <td>Strings, symbols only</td>
    <td>Any value (objects, functions, primitives)</td>
  </tr>
  <tr>
    <td>Key Order</td>
    <td>Not guaranteed</td>
    <td>Insertion order preserved</td>
  </tr>
  <tr>
    <td>Size</td>
    <td><code>Object.keys(obj).length</code></td>
    <td><code>map.size</code></td>
  </tr>
  <tr>
    <td>Iterability</td>
    <td>Not directly iterable</td>
    <td>Directly iterable with for...of</td>
  </tr>
  <tr>
    <td>Performance</td>
    <td>Less efficient for frequent changes</td>
    <td>Optimized for additions/deletions</td>
  </tr>
</table>

<pre><code>const map = new Map();
map.set('name', 'John');
map.set({ id: 1 }, 'Object as key');
console.log(map.size); // 2</code></pre>`
};
