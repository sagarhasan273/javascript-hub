import { Question } from '../types';

export const question: Question = {
  id: 4,
  title: "What is JSON and its common operations",
  definition: "JSON (JavaScript Object Notation) is a lightweight text-based data format using JavaScript object syntax for data transmission.",
  answer: `<p>JSON is widely used for transmitting data between server and client. Files have <code>.json</code> extension and MIME type <code>application/json</code>.</p>

<h4>Common Operations:</h4>

<ol>
  <li><strong>Parsing:</strong> Transform JSON string to JavaScript object.</li>
  <li><strong>Stringification:</strong> Convert JavaScript object to JSON string.</li>
</ol>

<pre><code>// Parsing
const jsonString = '{"name":"John","age":30}';
const obj = JSON.parse(jsonString);
// Result: { name: "John", age: 30 }

// Stringification
const obj = { name: "Jane", age: 25 };
const jsonString = JSON.stringify(obj);
// Result: '{"name":"Jane","age":25}'</code></pre>`
};
