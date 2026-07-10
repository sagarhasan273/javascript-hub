// data/questions/Question13.tsx
import { Box } from "@mui/material";
import { QuestionWrapper } from "../../components/QuestionWrapper";
import { LevelContent } from "../../components/LevelContent";
import {
  Title,
  PlainText,
  Bold,
  CardComponent,
  HLText,
  CodeComponent,
  Note,
  Gap,
  TableComponent,
  UnorderedList,
} from "../../components/content";
import { question13Meta } from "../registry";
import { useLevel } from "../../hooks";

export function Question13({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question13Meta.id}
      title={question13Meta.title}
      definition={question13Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        A <Bold>first-order function</Bold> is a function that <Bold>does not</Bold> take another function as an argument and <Bold>does not</Bold> return a function as its result. It operates on <Bold>primitive values</Bold> (numbers, strings, booleans) and <Bold>data structures</Bold> (arrays, objects).
      </PlainText>

      <PlainText>
        Unlike <Bold>higher-order functions</Bold> that deal with functions, first-order functions work directly with data. They are the <Bold>building blocks</Bold> of functional programming.
      </PlainText>

      <Gap size={2} />

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🌱</Box>
          Beginner: Understanding First-Order Functions
        </Title>

        <PlainText>
          A first-order function is a regular function that <Bold>works with data</Bold> and <Bold>doesn't deal with other functions</Bold>. It takes simple values as input and returns simple values as output.
        </PlainText>

        <Title level={4}>Simple First-Order Functions</Title>
        <CodeComponent
          code={`// First-order functions work with primitive values
function add(a, b) {
  return a + b; // Takes numbers, returns a number
}

function greet(name) {
  return \`Hello, \${name}!\`; // Takes string, returns string
}

function isEven(number) {
  return number % 2 === 0; // Takes number, returns boolean
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Using first-order functions
console.log(add(5, 3));           // 8
console.log(greet("Alice"));      // Hello, Alice!
console.log(isEven(4));           // true
console.log(capitalize("hello")); // Hello`}
          language="javascript"
          title="first-order.js"
          defaultOpen={true}
        />

        <PlainText>
          <Bold>Characteristics of First-Order Functions:</Bold>
        </PlainText>

        <CardComponent variant="info" title="📋 Key Characteristics">
          <UnorderedList
            items={[
              <>✅ Takes <Bold>primitive values</Bold> (numbers, strings, booleans) as arguments</>,
              <>✅ Takes <Bold>data structures</Bold> (arrays, objects) as arguments</>,
              <>✅ Returns <Bold>primitive values</Bold> or <Bold>data structures</Bold></>,
              <>✅ <Bold>Does NOT</Bold> take functions as arguments</>,
              <>✅ <Bold>Does NOT</Bold> return functions</>,
              <>✅ <Bold>Simple</Bold> and <Bold>predictable</Bold></>,
            ]}
          />
        </CardComponent>

        <Title level={4}>First-Order vs Higher-Order Functions</Title>
        <CodeComponent
          code={`// First-order function - works with data only
function doubleNumber(num) {
  return num * 2;
}

// First-order function - works with arrays
function sumArray(arr) {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    total += arr[i];
  }
  return total;
}

// Higher-order function - takes a function as argument
function applyOperation(arr, operation) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(operation(arr[i]));
  }
  return result;
}

// Using first-order functions
console.log(doubleNumber(5)); // 10
console.log(sumArray([1, 2, 3, 4])); // 10

// Using higher-order function
const doubled = applyOperation([1, 2, 3], doubleNumber);
console.log(doubled); // [2, 4, 6]`}
          language="javascript"
          title="comparison.js"
          defaultOpen={true}
        />

        <Note type="info" icon="💡">
          <Bold>Remember:</Bold> First-order functions are like <Bold>workers</Bold> - they take data, process it, and return results. They don't manage other workers (functions).
        </Note>

        <CardComponent variant="success" title="✅ Beginner Summary">
          <UnorderedList
            items={[
              <>First-order functions work with <Bold>data</Bold>, not functions</>,
              <>They take <Bold>primitive values</Bold> or <Bold>data structures</Bold></>,
              <>They return <Bold>values</Bold>, not functions</>,
              <>They are <Bold>simpler</Bold> and <Bold>easier to understand</Bold></>,
              <>They are the <Bold>building blocks</Bold> of your code</>,
            ]}
          />
        </CardComponent>
      </LevelContent>

      {/* ============================================ */}
      {/* ADVANCED LEVEL */}
      {/* ============================================ */}
      <LevelContent level="advanced" currentLevel={level}>
        <Gap size={2} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#f59e0b', mr: 1 }}>⚡</Box>
          Advanced: First-Order Functions in Practice
        </Title>

        <PlainText>
          In real-world applications, first-order functions are used for <Bold>data transformation</Bold>, <Bold>validation</Bold>, <Bold>formatting</Bold>, and <Bold>business logic</Bold>. They form the core of your application logic.
        </PlainText>

        <Title level={4}>Common Use Cases</Title>

        <CodeComponent
          code={`// 1. Data Validation (First-Order)
function validateEmail(email) {
  return email.includes('@') && email.includes('.');
}

function validatePhone(phone) {
  return phone.length === 10 && /^[0-9]+$/.test(phone);
}

function validateAge(age) {
  return age >= 18 && age <= 100;
}

// 2. Data Formatting (First-Order)
function formatCurrency(amount) {
  return \`$\${amount.toFixed(2)}\`;
}

function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function formatName(first, last) {
  return \`\${capitalize(first)} \${capitalize(last)}\`;
}

// 3. Data Transformation (First-Order)
function calculateDiscount(price, percentage) {
  return price - (price * percentage / 100);
}

function getFullAddress(street, city, state, zip) {
  return \`\${street}, \${city}, \${state} \${zip}\`;
}

// Using first-order functions
console.log(validateEmail('john@example.com')); // true
console.log(formatCurrency(29.99)); // $29.99
console.log(calculateDiscount(100, 20)); // 80`}
          language="javascript"
          title="practical.js"
          defaultOpen={true}
        />

        <Title level={4}>First-Order Functions in Business Logic</Title>
        <CodeComponent
          code={`// E-commerce example with first-order functions
function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price * items[i].quantity;
  }
  return total;
}

function applyTax(total, taxRate) {
  return total + (total * taxRate / 100);
}

function applyDiscount(total, discountPercent) {
  return total - (total * discountPercent / 100);
}

function getShippingCost(total) {
  if (total > 100) return 0;
  return 10;
}

// Business logic using first-order functions
function processOrder(items, discountPercent = 0) {
  let total = calculateTotal(items);
  total = applyTax(total, 10); // 10% tax
  total = applyDiscount(total, discountPercent);
  const shipping = getShippingCost(total);
  
  return {
    subtotal: calculateTotal(items),
    tax: total * 0.10,
    discount: total * discountPercent / 100,
    shipping: shipping,
    total: total + shipping
  };
}

const order = processOrder(
  [
    { name: 'Laptop', price: 999, quantity: 1 },
    { name: 'Mouse', price: 25, quantity: 2 }
  ],
  10 // 10% discount
);

console.log(order);
/*
{
  subtotal: 1049,
  tax: 104.9,
  discount: 94.41,
  shipping: 0,
  total: 1059.49
}
*/`}
          language="javascript"
          title="business-logic.js"
          defaultOpen={false}
        />

        <Title level={4}>Comparison Table</Title>
        <CardComponent variant="info" title="📊 First-Order vs Higher-Order Functions">
          <TableComponent
            headers={['Feature', 'First-Order', 'Higher-Order']}
            rows={[
              ['Takes Functions', '❌ No', '✅ Yes'],
              ['Returns Functions', '❌ No', '✅ Yes'],
              ['Works with Data', '✅ Yes', '✅ Yes (also functions)'],
              ['Complexity', 'Simple', 'More complex'],
              ['Predictability', 'Very predictable', 'Depends on callbacks'],
              ['Testing', 'Easy to test', 'Requires mocking'],
              ['Common Use', 'Business logic', 'Abstraction & composition'],
            ]}
          />
        </CardComponent>

        <Note type="info" icon="💡">
          <Bold>Pro Tip:</Bold> Most of your application code should be <Bold>first-order functions</Bold>. Use higher-order functions for <Bold>abstraction</Bold> and <Bold>composition</Bold>.
        </Note>
      </LevelContent>

      {/* ============================================ */}
      {/* EXPERT LEVEL */}
      {/* ============================================ */}
      <LevelContent level="expert" currentLevel={level}>
        <Gap size={2} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#ef4444', mr: 1 }}>🚀</Box>
          Expert: Optimizing with First-Order Functions
        </Title>

        <PlainText>
          First-order functions are the <Bold>foundation</Bold> of clean code. They are <Bold>pure</Bold>, <Bold>testable</Bold>, and <Bold>composable</Bold>. Expert developers use them to create <Bold>maintainable</Bold> and <Bold>scalable</Bold> applications.
        </PlainText>

        <Title level={4}>Pure First-Order Functions</Title>
        <CodeComponent
          code={`// Pure first-order functions (no side effects)
function add(a, b) {
  return a + b; // Same input always returns same output
}

function multiply(a, b) {
  return a * b; // No side effects
}

function getFullName(first, last) {
  return \`\${first} \${last}\`;
}

// Impure first-order functions (has side effects)
let counter = 0;
function incrementCounter() {
  counter++; // Modifies external state
  return counter;
}

function logMessage(message) {
  console.log(message); // Side effect (console output)
  return message;
}

// Best practice: Keep first-order functions pure
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// Even when working with arrays, return new arrays
function addItemToCart(cart, item) {
  return [...cart, item]; // Pure - returns new array
}

function removeItemFromCart(cart, itemId) {
  return cart.filter(item => item.id !== itemId);
}`}
          language="javascript"
          title="pure-functions.js"
          defaultOpen={false}
        />

        <Title level={4}>Composing First-Order Functions</Title>
        <CodeComponent
          code={`// Composing first-order functions
function applyTax(amount, taxRate) {
  return amount + (amount * taxRate / 100);
}

function applyDiscount(amount, discountPercent) {
  return amount - (amount * discountPercent / 100);
}

function applyShipping(amount, shippingCost) {
  return amount + shippingCost;
}

// Pipeline pattern with first-order functions
function processPayment(amount, taxRate = 10, discountPercent = 0, shippingCost = 0) {
  // Chain first-order functions
  let total = amount;
  total = applyTax(total, taxRate);
  total = applyDiscount(total, discountPercent);
  total = applyShipping(total, shippingCost);
  return total;
}

// Alternative: Using reduce (more functional)
function processPayment2(amount, operations) {
  return operations.reduce((total, operation) => {
    return operation(total);
  }, amount);
}

const operations = [
  (amount) => applyTax(amount, 10),
  (amount) => applyDiscount(amount, 5),
  (amount) => applyShipping(amount, 10)
];

console.log(processPayment2(100, operations));`}
          language="javascript"
          title="composition.js"
          defaultOpen={false}
        />

        <Title level={4}>Testing First-Order Functions</Title>
        <CodeComponent
          code={`// First-order functions are easy to test
function calculateAverage(numbers) {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b, 0);
  return sum / numbers.length;
}

function isPrime(num) {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

// Test cases
console.log(calculateAverage([1, 2, 3, 4])); // 2.5
console.log(calculateAverage([])); // 0
console.log(isPrime(7)); // true
console.log(isPrime(4)); // false
console.log(isPrime(1)); // false

// Using assertions (simplified testing)
function assert(condition, message) {
  if (!condition) throw new Error(message);
  console.log(\`✅ Test passed: \${message}\`);
}

assert(calculateAverage([1, 2, 3, 4]) === 2.5, 'Average of [1,2,3,4] is 2.5');
assert(calculateAverage([]) === 0, 'Empty array average is 0');
assert(isPrime(7) === true, '7 is prime');
assert(isPrime(4) === false, '4 is not prime');`}
          language="javascript"
          title="testing.js"
          defaultOpen={false}
        />

        <Title level={4}>Performance Considerations</Title>
        <CardComponent variant="info" title="⚡ Performance Tips">
          <UnorderedList
            items={[
              <>First-order functions are <Bold>faster</Bold> than higher-order functions (no function call overhead)</>,
              <>They are <Bold>easier to optimize</Bold> by the JavaScript engine</>,
              <>They produce <Bold>cleaner stack traces</Bold> for debugging</>,
              <>They <Bold>reduce complexity</Bold> and <Bold>improve readability</Bold></>,
              <>They are <Bold>more predictable</Bold> and <Bold>less error-prone</Bold></>,
            ]}
          />
        </CardComponent>

        <Title level={4}>Expert Best Practices</Title>
        <CardComponent variant="default" title="💡 Pro Insights">
          <UnorderedList
            items={[
              <>Keep most functions <Bold>first-order</Bold> and <Bold>pure</Bold></>,
              <>Use <Bold>higher-order functions</Bold> only when necessary</>,
              <>First-order functions are <Bold>easier to test</Bold> and <Bold>debug</Bold></>,
              <>They make your code <Bold>more predictable</Bold> and <Bold>maintainable</Bold></>,
              <>Use them for <Bold>business logic</Bold> and <Bold>data transformations</Bold></>,
              <>They are the <Bold>foundation</Bold> of clean, <Bold>functional</Bold> code</>,
            ]}
          />
        </CardComponent>

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> While higher-order functions are powerful, <Bold>80-90%</Bold> of your functions should be <Bold>first-order</Bold>. This keeps your code <Bold>simple</Bold>, <Bold>testable</Bold>, and <Bold>maintainable</Bold>. Use higher-order functions for <Bold>abstraction</Bold> and <Bold>composition</Bold>, not for every operation.
        </HLText>

        <Note type="warning" icon="⚠️">
          <Bold>Expert Warning:</Bold> Don't over-engineer with higher-order functions. <Bold>First-order functions</Bold> are simpler, faster, and easier to understand. Only use higher-order functions when they <Bold>significantly improve</Bold> code reusability or readability.
        </Note>
      </LevelContent>

      {/* ============================================ */}
      {/* SUMMARY - Shown at all levels */}
      {/* ============================================ */}
      <Gap size={2} />

      <Title level={3}>
        <Box component="span" sx={{ color: '#10b981', mr: 1 }}>📌</Box>
        Summary
      </Title>

      <CardComponent variant="info" title="🎯 Key Takeaways">
        <UnorderedList
          items={[
            <>First-order functions work with <Bold>data</Bold>, not functions</>,
            <>They take <Bold>primitive values</Bold> or <Bold>data structures</Bold> as arguments</>,
            <>They return <Bold>values</Bold>, not functions</>,
            <>They are <Bold>simpler</Bold>, <Bold>faster</Bold>, and <Bold>more predictable</Bold></>,
            <>They are <Bold>easier to test</Bold> and <Bold>debug</Bold></>,
            <>They form the <Bold>majority</Bold> of code in well-designed applications</>,
            <>Use higher-order functions <Bold>sparingly</Bold> for abstraction</>,
            <>First-order functions are the <Bold>building blocks</Bold> of clean code</>,
          ]}
        />
      </CardComponent>

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> Keep your functions <Bold>first-order</Bold> and <Bold>pure</Bold> whenever possible. This is the <Bold>golden rule</Bold> of writing clean, maintainable, and bug-free code.
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> First-order functions are the <Bold>simple, predictable</Bold> functions that make up the core of your application. Master them, and your code will be <Bold>cleaner</Bold>, <Bold>faster</Bold>, and <Bold>more reliable</Bold>!
      </Note>
    </QuestionWrapper>
  );
}