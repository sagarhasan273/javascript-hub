// data/questions/Question03.tsx
import { Box } from "@mui/material";
import { QuestionWrapper } from "../../components/QuestionWrapper";
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
  InlineCode,
  UnorderedList,
} from "../../components/content";
import { question03Meta } from "./registry";

export function Question03({
  index = 0,
  isActive = false,
}: {
  index?: number;
  isActive?: boolean;
}) {
  return (
    <QuestionWrapper
      id={question03Meta.id}
      title={question03Meta.title}
      definition={question03Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction */}
      <PlainText>
        <Bold>call</Bold>, <Bold>apply</Bold>, and <Bold>bind</Bold> are methods
        that allow you to explicitly set the <InlineCode>this</InlineCode> value
        in a function. They are used to control the context in which a function
        executes.
      </PlainText>

      <PlainText>
        All three methods are available on every JavaScript function and are
        used to borrow methods from other objects or to set the execution
        context.
      </PlainText>

      <Gap size={2} />

      {/* 1. call() */}
      <Title level={3}>
        <Box component="span" sx={{ color: "#2563eb", mr: 1 }}>
          📞
        </Box>
        1. Function.prototype.call()
      </Title>
      <PlainText>
        The <InlineCode>call()</InlineCode> method calls a function with a given{" "}
        <InlineCode>this</InlineCode> value and arguments provided individually
        (one by one).
      </PlainText>

      <CodeComponent
        code={`// Syntax
functionName.call(thisArg, arg1, arg2, ...);

// Example
function greet(greeting, punctuation) {
  console.log(greeting + ', ' + this.name + punctuation);
}

const person = { name: 'Alice' };

greet.call(person, 'Hello', '!'); // Output: Hello, Alice!`}
        language="javascript"
        title="call-example.js"
        defaultOpen={true}
      />

      <PlainText>
        <Bold>Use cases:</Bold>
      </PlainText>
      <PlainText component="div">
        • Borrowing methods from other objects
        <br />
        • Converting array-like objects to arrays
        <br />• Function inheritance
      </PlainText>

      <Note type="info" icon="💡">
        <Bold>Key Point:</Bold> Arguments are passed individually
        (comma-separated) to <InlineCode>call()</InlineCode>.
      </Note>

      <Gap size={2} />

      {/* 2. apply() */}
      <Title level={3}>
        <Box component="span" sx={{ color: "#8b5cf6", mr: 1 }}>
          📋
        </Box>
        2. Function.prototype.apply()
      </Title>
      <PlainText>
        The <InlineCode>apply()</InlineCode> method calls a function with a
        given <InlineCode>this</InlineCode> value and arguments provided as an
        array (or array-like object).
      </PlainText>

      <CodeComponent
        code={`// Syntax
functionName.apply(thisArg, [arg1, arg2, ...]);

// Example
function greet(greeting, punctuation) {
  console.log(greeting + ', ' + this.name + punctuation);
}

const person = { name: 'Alice' };

greet.apply(person, ['Hello', '!']); // Output: Hello, Alice!`}
        language="javascript"
        title="apply-example.js"
        defaultOpen={true}
      />

      <PlainText>
        <Bold>Use cases:</Bold>
      </PlainText>
      <PlainText component="div">
        • When you have an array of arguments
        <br />
        • Using Math.max/min with arrays
        <br />• Array concatenation and manipulation
      </PlainText>

      <Note type="info" icon="💡">
        <Bold>Key Point:</Bold> Arguments are passed as an array (or array-like
        object) to <InlineCode>apply()</InlineCode>.
      </Note>

      <Gap size={2} />

      {/* 3. bind() */}
      <Title level={3}>
        <Box component="span" sx={{ color: "#f59e0b", mr: 1 }}>
          🔗
        </Box>
        3. Function.prototype.bind()
      </Title>
      <PlainText>
        The <InlineCode>bind()</InlineCode> method creates a new function that,
        when called, has its <InlineCode>this</InlineCode> value set to the
        provided value, with a given sequence of arguments preceding any
        provided when the new function is called.
      </PlainText>

      <CodeComponent
        code={`// Syntax
const boundFunction = functionName.bind(thisArg, arg1, arg2, ...);

// Example
function greet(greeting, punctuation) {
  console.log(greeting + ', ' + this.name + punctuation);
}

const person = { name: 'Alice' };
const greetAlice = greet.bind(person, 'Hello');

greetAlice('!'); // Output: Hello, Alice!`}
        language="javascript"
        title="bind-example.js"
        defaultOpen={true}
      />

      <PlainText>
        <Bold>Use cases:</Bold>
      </PlainText>
      <PlainText component="div">
        • Partial function application (currying)
        <br />
        • Event handlers that need a specific context
        <br />• Setting up context in callbacks
      </PlainText>

      <Note type="warning" icon="⚠️">
        <Bold>Important:</Bold> Unlike <InlineCode>call()</InlineCode> and{" "}
        <InlineCode>apply()</InlineCode> which execute immediately,{" "}
        <InlineCode>bind()</InlineCode> returns a new function that can be
        called later.
      </Note>

      <Gap size={2} />

      {/* Comparison Table */}
      <Title level={3}>
        <Box component="span" sx={{ color: "#ec4899", mr: 1 }}>
          📊
        </Box>
        Quick Comparison
      </Title>

      <TableComponent
        headers={["Method", "Execution", "Arguments", "Returns"]}
        rows={[
          ["call()", "Immediately", "Individual arguments", "Function result"],
          ["apply()", "Immediately", "Array of arguments", "Function result"],
          [
            "bind()",
            "Later (when called)",
            "Individual arguments",
            "New function",
          ],
        ]}
      />

      <Gap size={2} />

      {/* Practical Examples */}
      <Title level={3}>
        <Box component="span" sx={{ color: "#06b6d4", mr: 1 }}>
          🎯
        </Box>
        Practical Examples
      </Title>

      <PlainText>
        <Bold>Example 1: Borrowing methods</Bold>
      </PlainText>
      <CodeComponent
        code={`// Using call to borrow array methods
function printArgs() {
  // Convert arguments to array using call
  const args = Array.prototype.slice.call(arguments);
  console.log(args);
}

printArgs(1, 2, 3); // [1, 2, 3]

// Using apply with Math.max
const numbers = [1, 5, 3, 9, 2];
const max = Math.max.apply(null, numbers);
console.log(max); // 9`}
        language="javascript"
        title="practical-examples.js"
        defaultOpen={true}
      />

      <Gap size={1} />

      <PlainText>
        <Bold>Example 2: Event handling with bind</Bold>
      </PlainText>
      <CodeComponent
        code={`// bind in event handlers
const counter = {
  count: 0,
  increment: function() {
    this.count++;
    console.log(this.count);
  }
};

// Without bind - this would refer to the button
// document.getElementById('btn').addEventListener('click', counter.increment);

// With bind - this refers to counter
document.getElementById('btn').addEventListener('click', counter.increment.bind(counter));`}
        language="javascript"
        title="event-handler-bind.js"
        defaultOpen={false}
      />

      <Gap size={2} />

      {/* Best Practices */}
      <Title level={3}>
        <Box component="span" sx={{ color: "#fbbf24", mr: 1 }}>
          ⭐
        </Box>
        Best Practices
      </Title>

      <CardComponent variant="success" title="✅ Do's">
        <PlainText component="div" sx={{ mb: 0 }}>
          • Use <InlineCode>call()</InlineCode> when you know the exact number
          of arguments
          <br />• Use <InlineCode>apply()</InlineCode> when you have an array of
          arguments
          <br />• Use <InlineCode>bind()</InlineCode> when you need to set
          context for later execution
          <br />• Always use <InlineCode>bind()</InlineCode> for event handlers
          in classes
        </PlainText>
      </CardComponent>

      <CardComponent variant="warning" title="⚠️ Don'ts">
        <PlainText component="div" sx={{ mb: 0 }}>
          • Don't overuse <InlineCode>bind()</InlineCode> as it creates a new
          function
          <br />• Avoid using <InlineCode>call()</InlineCode> with a large
          number of arguments
          <br />• Don't forget that <InlineCode>bind()</InlineCode> doesn't
          execute the function
          <br />• Avoid using <InlineCode>apply()</InlineCode> with huge arrays
          (performance)
        </PlainText>
      </CardComponent>

      <Gap size={2} />

      {/* Summary */}
      <Title level={3}>
        <Box component="span" sx={{ color: "#10b981", mr: 1 }}>
          📌
        </Box>
        Summary
      </Title>

      <CardComponent variant="info" title="🎯 Key Takeaways">
        <UnorderedList
          items={[
            <>
              <Bold>call()</Bold> - Executes immediately with comma-separated
              arguments
            </>,
            <>
              <Bold>apply()</Bold> - Executes immediately with array arguments
            </>,
            <>
              <Bold>bind()</Bold> - Returns a new function to be called later
            </>,
            <>
              All three methods allow you to control the{" "}
              <InlineCode>this</InlineCode> context
            </>,
            <>They enable function borrowing and method reuse</>,
            <>Choose based on your specific use case and argument format</>,
          ]}
        />
      </CardComponent>

      <Gap size={2} />

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> Understanding these three methods is essential
        for writing flexible, reusable JavaScript code. They give you complete
        control over function execution context.
      </HLText>

      <Gap size={2} />

      {/* Bonus: Call vs Apply vs Bind Visualization */}
      <Title level={3}>
        <Box component="span" sx={{ color: "#ec4899", mr: 1 }}>
          🎨
        </Box>
        Visual Comparison
      </Title>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr", // 1 column on mobile
            md: "1fr 1fr", // 2 columns on tablet
            lg: "repeat(3, 1fr)", // 3 columns on desktop
          },
          gap: 2,
          my: 2,
          width: "100%",
        }}
      >
        {[
          {
            method: "call()",
            icon: "📞",
            color: "#2563eb",
            bgColor: "rgba(37, 99, 235, 0.08)",
            description: "Immediate execution with individual arguments",
            syntax: "fn.call(this, arg1, arg2)",
          },
          {
            method: "apply()",
            icon: "📋",
            color: "#8b5cf6",
            bgColor: "rgba(139, 92, 246, 0.08)",
            description: "Immediate execution with array arguments",
            syntax: "fn.apply(this, [arg1, arg2])",
          },
          {
            method: "bind()",
            icon: "🔗",
            color: "#f59e0b",
            bgColor: "rgba(245, 158, 11, 0.08)",
            description: "Returns a new function for later execution",
            syntax: "const bound = fn.bind(this, arg1, arg2)",
          },
        ].map((item) => (
          <Box
            key={item.method}
            sx={{
              bgcolor: item.bgColor,
              borderRadius: 2,
              p: { xs: 2, sm: 2.5, md: 3 }, // Responsive padding
              border: `2px solid ${item.color}30`,
              transition: "all 0.3s ease",
              minWidth: 0, // Prevents overflow
              overflow: "hidden",
              "&:hover": {
                transform: { xs: "none", sm: "translateY(-4px)" },
                boxShadow: `0 8px 24px ${item.color}20`,
                borderColor: item.color,
              },
            }}
          >
            <Box sx={{ fontSize: { xs: "1.8rem", sm: "2rem" }, mb: 1 }}>
              {item.icon}
            </Box>
            <Box
              sx={{
                fontSize: { xs: "0.95rem", sm: "1.1rem", md: "1.2rem" },
                fontWeight: 700,
                color: item.color,
                mb: 1,
                wordBreak: "break-word",
              }}
            >
              {item.method}
            </Box>
            <PlainText
              variant="body2"
              sx={{
                mb: 1.5,
                color: "grey.600",
                fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.9rem" },
              }}
            >
              {item.description}
            </PlainText>
            <Box sx={{ overflow: "hidden" }}>
              <CodeComponent
                code={item.syntax}
                language="javascript"
                title=""
                showTitle={false}
                showCopyButton={false}
                defaultOpen={true}
                showLineNumbers={false}
              />
            </Box>
          </Box>
        ))}
      </Box>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> All three methods serve the same purpose -
        controlling <InlineCode>this</InlineCode> context - but they differ in
        how they accept arguments and when they execute.
      </Note>
    </QuestionWrapper>
  );
}
