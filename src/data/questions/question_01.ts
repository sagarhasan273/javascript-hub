import { Question } from '../types';

export const question: Question = {
  id: 1,
  title: "What are the possible ways to create objects in JavaScript",
  definition: "There are multiple ways to create objects: object literals, constructors, Object.create(), functions, classes, and singletons.",
  answer: `<p>There are many ways to create objects in JavaScript:</p>

<ol>
  <li><strong>Object literal syntax:</strong> The easiest way using curly braces.</li>
  <li><strong>Object constructor:</strong> Using <code>new Object()</code> (not recommended).</li>
  <li><strong>Object's create method:</strong> Creates object with specified prototype.</li>
  <li><strong>Function constructor:</strong> Using function with <code>new</code> keyword.</li>
  <li><strong>Function constructor with prototype:</strong> Shared properties across instances.</li>
  <li><strong>Object's assign method:</strong> Copy properties from source objects.</li>
  <li><strong>ES6 Class syntax:</strong> Syntactic sugar over prototype system.</li>
  <li><strong>Singleton pattern:</strong> Object instantiated only once.</li>
</ol>

<pre><code>// Object literal
var object = { name: "Sudheer", age: 34 };

// Object.create
var object = Object.create(null);

// Function constructor
function Person(name) {
  this.name = name;
}
var object = new Person("Sudheer");

// ES6 Class
class Person {
  constructor(name) {
    this.name = name;
  }
}
var object = new Person("Sudheer");</code></pre>`
};
