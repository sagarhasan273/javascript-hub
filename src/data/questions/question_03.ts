import { Question } from '../types';

export const question: Question = {
  id: 3,
  title: "What is the Difference Between call, apply, and bind",
  definition: "call and apply invoke functions immediately with different argument passing, while bind returns a new function for later execution.",
  answer: `<p>All three methods control the <code>this</code> value in which a function is executed.</p>

<h4>call()</h4>
<p>Invokes function immediately, arguments passed individually (comma-separated).</p>
<pre><code>func.call(thisArg, arg1, arg2, ...)</code></pre>

<h4>apply()</h4>
<p>Invokes function immediately, arguments passed as an array.</p>
<pre><code>func.apply(thisArg, [argsArray])</code></pre>

<h4>bind()</h4>
<p>Returns a new function for later execution, does NOT invoke immediately.</p>
<pre><code>var boundFunc = func.bind(thisArg, arg1, arg2, ...)</code></pre>

<p><strong>Example:</strong></p>
<pre><code>var employee = { firstName: "John", lastName: "Rodson" };

function invite(greeting1, greeting2) {
  console.log(greeting1 + " " + this.firstName + ", " + greeting2);
}

invite.call(employee, "Hello", "How are you?");
invite.apply(employee, ["Hello", "How are you?"]);

var boundInvite = invite.bind(employee);
boundInvite("Hello", "How are you?");</code></pre>`
};
