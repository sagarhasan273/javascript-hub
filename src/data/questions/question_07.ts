import { Question } from '../types';

export const question: Question = {
  id: 7,
  title: "What is the difference between slice and splice",
  definition: "slice() is immutable and extracts elements; splice() is mutable and adds/removes/replaces elements.",
  answer: `<table>
  <tr>
    <th>slice()</th>
    <th>splice()</th>
  </tr>
  <tr>
    <td>Does NOT modify original array (immutable)</td>
    <td>Modifies original array (mutable)</td>
  </tr>
  <tr>
    <td>Returns shallow copy of selected elements</td>
    <td>Returns array of removed elements</td>
  </tr>
  <tr>
    <td>Used to extract elements</td>
    <td>Used to add, remove, or replace elements</td>
  </tr>
  <tr>
    <td><code>array.slice(start, end)</code></td>
    <td><code>array.splice(start, deleteCount, ...items)</code></td>
  </tr>
</table>

<p><strong>Summary:</strong></p>
<ul>
  <li>Use <code>slice()</code> when you want to copy elements without altering the original.</li>
  <li>Use <code>splice()</code> when you need to add, remove, or replace elements.</li>
</ul>`
};
