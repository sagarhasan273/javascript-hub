// data/questions/Question21.tsx
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
  InlineCode,
  UnorderedList,
} from "../../components/content";
import { question21Meta } from "./registry";
import { useLevel } from "../../hooks";

export function Question21({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question21Meta.id}
      title={question21Meta.title}
      definition={question21Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        In JavaScript, <Bold>switch statements</Bold> have a <Bold>single block scope</Bold>. This means variables declared with <InlineCode>let</InlineCode> or <InlineCode>const</InlineCode> inside different <InlineCode>case</InlineCode> clauses will conflict and cause <Bold>redeclaration errors</Bold>. To avoid this, you need to create <Bold>block scopes</Bold> using curly braces <InlineCode>{`{}`}</InlineCode> around each <InlineCode>case</InlineCode>.
      </PlainText>

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🌱</Box>
          Beginner: Understanding the Problem
        </Title>

        <PlainText>
          In a <InlineCode>switch</InlineCode> statement, all <InlineCode>case</InlineCode> clauses share the same scope. This can cause redeclaration errors:
        </PlainText>

        <CodeComponent
          code={`// ❌ This will cause an error
switch (fruit) {
  case 'apple':
    let color = 'red';
    console.log(color);
    break;
  case 'banana':
    let color = 'yellow'; // ❌ SyntaxError: Identifier 'color' has already been declared
    console.log(color);
    break;
}

// ✅ This works - using block scope with {}
switch (fruit) {
  case 'apple': {
    let color = 'red';
    console.log(color);
    break;
  }
  case 'banana': {
    let color = 'yellow'; // ✅ Works! Different scope
    console.log(color);
    break;
  }
}`}
          language="javascript"
          title="switch-scope-error.js"
          defaultOpen={true}
        />

        <Note type="warning" icon="⚠️">
          <Bold>Important:</Bold> <InlineCode>let</InlineCode> and <InlineCode>const</InlineCode> are <Bold>block-scoped</Bold>. Without creating a new block with <InlineCode>{`{}`}</InlineCode>, all <InlineCode>case</InlineCode> clauses are in the same scope.
        </Note>

        <CardComponent variant="success" title="✅ Solution">
          <PlainText>
            Simply wrap each <InlineCode>case</InlineCode> with <Bold>curly braces</Bold> <InlineCode>{`{}`}</InlineCode> to create a new block scope:
          </PlainText>
          <CodeComponent
            code={`switch (value) {
  case 'one': {
    let message = 'First case';
    console.log(message);
    break;
  }
  case 'two': {
    let message = 'Second case';
    console.log(message);
    break;
  }
}`}
            language="javascript"
            title="solution.js"
            defaultOpen={true}
            showTitle={false}
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
          Advanced: Deep Dive into Switch Scope
        </Title>

        <PlainText>
          Understanding why this happens and all possible solutions:
        </PlainText>

        <CodeComponent
          code={`// 1. The problem - Same scope
let fruit = 'apple';

switch (fruit) {
  case 'apple':
    let color = 'red'; // Declared in switch scope
    console.log(color);
    break;
  case 'banana':
    // let color = 'yellow'; // ❌ SyntaxError
    break;
}

// 2. Solution 1: Block scope with {}
switch (fruit) {
  case 'apple': {
    let color = 'red';
    console.log(color);
    break;
  }
  case 'banana': {
    let color = 'yellow';
    console.log(color);
    break;
  }
}

// 3. Solution 2: Different variable names
switch (fruit) {
  case 'apple':
    let appleColor = 'red';
    console.log(appleColor);
    break;
  case 'banana':
    let bananaColor = 'yellow';
    console.log(bananaColor);
    break;
}

// 4. Solution 3: Using var (not recommended)
switch (fruit) {
  case 'apple':
    var color1 = 'red'; // var is function-scoped
    console.log(color1);
    break;
  case 'banana':
    var color2 = 'yellow'; // Different name required
    console.log(color2);
    break;
}

// 5. Understanding the scope
// This is what the switch looks like internally
{
  // Switch block scope
  case 'apple':
    let color = 'red'; // Would work if it's the only declaration
    break;
  case 'banana':
    // let color = 'yellow'; // ❌ Same scope
    break;
}`}
          language="javascript"
          title="switch-scope-advanced.js"
          defaultOpen={true}
        />

        <CardComponent variant="info" title="🎯 Best Practices">
          <UnorderedList
            items={[
              <>Always use <Bold>block scope</Bold> (<InlineCode>{`{}`}</InlineCode>) around <InlineCode>case</InlineCode> clauses with <InlineCode>let</InlineCode> or <InlineCode>const</InlineCode></>,
              <>Consider using <InlineCode>if-else</InlineCode> chains instead of <InlineCode>switch</InlineCode> for complex logic</>,
              <>Be consistent - either use blocks for all cases or none</>,
              <>Use <Bold>meaningful variable names</Bold> even when using blocks</>,
            ]}
          />
        </CardComponent>

        <Note type="info" icon="💡">
          <Bold>Pro Tip:</Bold> Some linters (like ESLint) will warn you about this issue. Enable the <InlineCode>no-case-declarations</InlineCode> rule to catch these errors automatically.
        </Note>
      </LevelContent>

      {/* ============================================ */}
      {/* EXPERT LEVEL */}
      {/* ============================================ */}
      <LevelContent level="expert" currentLevel={level}>
        <Gap size={2} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#ef4444', mr: 1 }}>🚀</Box>
          Expert: Advanced Patterns & Best Practices
        </Title>

        <PlainText>
          Expert-level understanding of switch scope and alternative patterns:
        </PlainText>

        <CodeComponent
          code={`// 1. Using IIFE inside switch cases
switch (fruit) {
  case 'apple': (() => {
    let color = 'red';
    console.log(color);
  })(); break;
  case 'banana': (() => {
    let color = 'yellow';
    console.log(color);
  })(); break;
}

// 2. Switch with object literal (functional approach)
const handlers = {
  apple: () => {
    let color = 'red';
    console.log(color);
  },
  banana: () => {
    let color = 'yellow';
    console.log(color);
  }
};

const handler = handlers[fruit];
if (handler) handler();

// 3. Switch with Map (modern approach)
const handlerMap = new Map([
  ['apple', () => {
    let color = 'red';
    console.log(color);
  }],
  ['banana', () => {
    let color = 'yellow';
    console.log(color);
  }]
]);

const handlerFn = handlerMap.get(fruit);
if (handlerFn) handlerFn();

// 4. Switch with let and block scope - advanced pattern
let result;
switch (fruit) {
  case 'apple': {
    const color = 'red';
    result = \`Apple is \${color}\`;
    break;
  }
  case 'banana': {
    const color = 'yellow';
    result = \`Banana is \${color}\`;
    break;
  }
  default: {
    result = 'Unknown fruit';
  }
}
console.log(result);

// 5. Refactoring switch to if-else when needed
if (fruit === 'apple') {
  let color = 'red';
  console.log(color);
} else if (fruit === 'banana') {
  let color = 'yellow';
  console.log(color);
} else {
  console.log('Unknown fruit');
}

// 6. Using const in switch cases
switch (fruit) {
  case 'apple': {
    const COLOR = 'red'; // const also works
    console.log(COLOR);
    break;
  }
  case 'banana': {
    const COLOR = 'yellow'; // Different scope, no conflict
    console.log(COLOR);
    break;
  }
}`}
          language="javascript"
          title="switch-expert.js"
          defaultOpen={false}
        />

        <CardComponent variant="info" title="🔬 Scope Analysis">
          <PlainText component="div">
            • <Bold>switch</Bold> creates a <Bold>single block scope</Bold><br />
            • <Bold>case</Bold> clauses do NOT create new scopes<br />
            • <Bold>{'{}'}</Bold> creates a new block scope<br />
            • <Bold>let</Bold> and <Bold>const</Bold> are block-scoped<br />
            • <Bold>var</Bold> is function-scoped (doesn't help here)
          </PlainText>
        </CardComponent>

        <CardComponent variant="default" title="💡 Expert Tips">
          <UnorderedList
            items={[
              <>Use <Bold>object literals</Bold> or <Bold>Map</Bold> for complex conditional logic</>,
              <>Consider <Bold>if-else</Bold> chains for readability when <InlineCode>switch</InlineCode> is too verbose</>,
              <>Always use <Bold>blocks</Bold> when declaring variables in <InlineCode>case</InlineCode> clauses</>,
              <>Use <Bold>const</Bold> instead of <InlineCode>let</InlineCode> when the value doesn't change</>,
              <>Enable ESLint rules to catch these issues early</>,
            ]}
          />
        </CardComponent>

        <CardComponent variant="success" title="✅ Recommended Pattern">
          <CodeComponent
            code={`// Best practice: Always use blocks
switch (value) {
  case 'type1': {
    const data = processType1();
    console.log(data);
    break;
  }
  case 'type2': {
    const data = processType2();
    console.log(data);
    break;
  }
  default: {
    const data = processDefault();
    console.log(data);
  }
}`}
            language="javascript"
            title="recommended.js"
            defaultOpen={true}
            showTitle={false}
          />
        </CardComponent>

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> The <InlineCode>switch</InlineCode> statement's scoping behavior is often misunderstood. By <Bold>always using blocks</Bold> around <InlineCode>case</InlineCode> clauses, you avoid redeclaration errors and make your code <Bold>more robust</Bold> and <Bold>maintainable</Bold>.
        </HLText>

        <Note type="warning" icon="⚠️">
          <Bold>Expert Warning:</Bold> Even with blocks, <Bold>fallthrough</Bold> behavior still works across blocks. Be careful with <InlineCode>break</InlineCode> statements when using blocks.
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
            <>Switch statements have a <Bold>single block scope</Bold></>,
            <>Use <Bold>curly braces</Bold> <InlineCode>{`{}`}</InlineCode> around <InlineCode>case</InlineCode> clauses to create new scopes</>,
            <>This prevents <Bold>redeclaration errors</Bold> with <InlineCode>let</InlineCode> and <InlineCode>const</InlineCode></>,
            <>Alternative: Use <Bold>different variable names</Bold> for each case</>,
            <>Consider <Bold>object literals</Bold> or <Bold>Map</Bold> for complex logic</>,
            <>Enable ESLint's <InlineCode>no-case-declarations</InlineCode> rule</>,
            <>Be consistent - use blocks for all cases or none</>,
          ]}
        />
      </CardComponent>

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> The safest approach is to <Bold>always use blocks</Bold> (<InlineCode>{`{}`}</InlineCode>) around <InlineCode>case</InlineCode> clauses. This makes your code <Bold>more predictable</Bold> and <Bold>easier to maintain</Bold>.
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> Block scope with <InlineCode>{`{}`}</InlineCode> is your <Bold>friend</Bold> when working with <InlineCode>switch</InlineCode> statements and <InlineCode>let</InlineCode>/<InlineCode>const</InlineCode> declarations!
      </Note>
    </QuestionWrapper>
  );
}