import { Question } from '../types';

export const question: Question = {
  id: 2,
  title: "What is a prototype chain",
  definition: "A prototype chain enables inheritance by allowing objects to inherit properties from other objects through linked prototypes.",
  answer: `<p>When you try to access a property on an object, JavaScript first looks for it on that object itself. If not found, it looks up the prototype chain until it finds the property or reaches null.</p>

<pre><code>function Person() {}
const person1 = new Person();

console.log(Object.getPrototypeOf(person1) === Person.prototype); // true</code></pre>

<ul>
  <li>The prototype chain enables inheritance in JavaScript.</li>
  <li>If a property isn't found on an object, JavaScript looks up its prototype chain.</li>
  <li>The prototype can be accessed with <code>Object.getPrototypeOf(obj)</code> or <code>__proto__</code>.</li>
  <li>The chain ends when the prototype is <code>null</code>.</li>
</ul>`
};
