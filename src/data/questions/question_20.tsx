// data/questions/Question20.tsx
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
import { question20Meta } from "./registry";
import { useLevel } from "../../hooks";

export function Question20({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  const { level } = useLevel();

  return (
    <QuestionWrapper
      id={question20Meta.id}
      title={question20Meta.title}
      definition={question20Meta.definition}
      index={index}
      isActive={isActive}
    >
      {/* Introduction - Shown at all levels */}
      <PlainText>
        The name <Bold>let</Bold> was chosen for variable declaration in JavaScript because it <Bold>reflects the mathematical meaning</Bold> of "let" used in algebra and logic, and it aligns with <Bold>other programming languages</Bold> that use similar keywords.
      </PlainText>

      {/* ============================================ */}
      {/* BEGINNER LEVEL */}
      {/* ============================================ */}
      <LevelContent level="beginner" currentLevel={level}>
        <Title level={3}>
          <Box component="span" sx={{ color: '#10b981', mr: 1 }}>🌱</Box>
          Beginner: Why "let"?
        </Title>

        <PlainText>
          The keyword <InlineCode>let</InlineCode> was chosen for several reasons:
        </PlainText>

        <CardComponent variant="info" title="📝 Why `let`?">
          <UnorderedList
            items={[
              <>📐 <Bold>Mathematical Origin:</Bold> "Let x = 5" is a common phrase in mathematics</>,
              <>🌍 <Bold>Other Languages:</Bold> Similar to <InlineCode>let</InlineCode> in other languages</>,
              <>🔄 <Bold>Clear Meaning:</Bold> It clearly indicates variable declaration</>,
              <>🚫 <Bold>No Conflict:</Bold> Wasn't a reserved word in existing JavaScript</>,
            ]}
          />
        </CardComponent>

        <PlainText>
          <Bold>Mathematical Connection:</Bold>
        </PlainText>

        <CodeComponent
          code={`// In mathematics, we write:
// Let x = 5
// Let y = 10
// Then x + y = 15

// In JavaScript, we write:
let x = 5;
let y = 10;
console.log(x + y); // 15

// The syntax is intentionally similar!`}
          language="javascript"
          title="let-math.js"
          defaultOpen={true}
        />

        <Note type="info" icon="💡">
          <Bold>Fun Fact:</Bold> The word "let" in JavaScript was <Bold>not</Bold> chosen randomly. It has a <Bold>long history</Bold> in mathematics and computer science.
        </Note>
      </LevelContent>

      {/* ============================================ */}
      {/* ADVANCED LEVEL */}
      {/* ============================================ */}
      <LevelContent level="advanced" currentLevel={level}>
        <Gap size={2} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#f59e0b', mr: 1 }}>⚡</Box>
          Advanced: The History of `let`
        </Title>

        <PlainText>
          Understanding the history of <InlineCode>let</InlineCode> helps appreciate its design:
        </PlainText>

        <CardComponent variant="info" title="📜 Historical Context">
          <PlainText component="div">
            • <Bold>1960s:</Bold> ALGOL 60 used <InlineCode>let</InlineCode> for variable declaration<br />
            • <Bold>1970s:</Bold> ML (MetaLanguage) adopted <InlineCode>let</InlineCode><br />
            • <Bold>1980s:</Bold> Standard ML and Miranda used <InlineCode>let</InlineCode><br />
            • <Bold>1990s:</Bold> Haskell continued the tradition<br />
            • <Bold>2000s:</Bold> F# and Scala included <InlineCode>let</InlineCode><br />
            • <Bold>2015:</Bold> JavaScript adopted <InlineCode>let</InlineCode> in ES6
          </PlainText>
        </CardComponent>

        <CodeComponent
          code={`// let in different languages

// ALGOL 60 (1960s)
let x = 5;

// ML (1970s)
val x = 5; // ML uses 'val'
// let x = 5 in ... end; // let expression

// Haskell (1990s)
let x = 5 in x * 2

// F# (2000s)
let x = 5

// Scala (2000s)
var x = 5 // Scala uses 'var' and 'val'

// JavaScript (2015)
let x = 5;

// The influence of mathematics:
// In math: "Let x be a number"
// In JavaScript: "let x = 5"`}
          language="javascript"
          title="let-history.js"
          defaultOpen={true}
        />

        <CardComponent variant="info" title="🎯 Why Not Other Keywords?">
          <UnorderedList
            items={[
              <>❌ <Bold>var:</Bold> Already existed, had issues</>,
              <>❌ <Bold>const:</Bold> Used for constants, not mutable variables</>,
              <>❌ <Bold>block:</Bold> Not descriptive enough</>,
              <>❌ <Bold>local:</Bold> Too generic</>,
              <>✅ <Bold>let:</Bold> Clear, concise, and historically significant</>,
            ]}
          />
        </CardComponent>

        <Note type="info" icon="💡">
          <Bold>Pro Tip:</Bold> The choice of <InlineCode>let</InlineCode> reflects the JavaScript committee's (TC39) desire to <Bold>align with existing practices</Bold> while fixing <InlineCode>var</InlineCode>'s issues.
        </Note>
      </LevelContent>

      {/* ============================================ */}
      {/* EXPERT LEVEL */}
      {/* ============================================ */}
      <LevelContent level="expert" currentLevel={level}>
        <Gap size={2} />

        <Title level={3}>
          <Box component="span" sx={{ color: '#ef4444', mr: 1 }}>🚀</Box>
          Expert: The Design of `let`
        </Title>

        <PlainText>
          Deep dive into the design decisions behind <InlineCode>let</InlineCode>:
        </PlainText>

        <CodeComponent
          code={`// 1. let vs var - The Design Philosophy

// var - function scoped, hoisted
function example1() {
  console.log(x); // undefined (hoisted)
  var x = 5;
  console.log(x); // 5
}

// let - block scoped, TDZ
function example2() {
  // console.log(x); // ReferenceError (TDZ)
  let x = 5;
  console.log(x); // 5
}

// 2. let in the global scope
let globalLet = 10;
console.log(window.globalLet); // undefined
// This prevents accidental global pollution

// 3. let in loops - new binding each iteration
let arr = [];
for (let i = 0; i < 3; i++) {
  arr.push(() => console.log(i));
}
arr.forEach(fn => fn()); // 0, 1, 2

// 4. let in switch statements
let x = 1;
switch(x) {
  case 1:
    let y = 10;
    console.log(y);
    break;
  // case 2:
    // let y = 20; // SyntaxError
  //   break;
}

// 5. The Temporal Dead Zone (TDZ)
// TDZ is a design choice to prevent using variables before declaration
{
  // TDZ starts
  // console.log(x); // ReferenceError
  let x = 5; // TDZ ends
}

// 6. let and const - Similar but different
let mutable = 5;
mutable = 10; // Works

const immutable = 5;
// immutable = 10; // TypeError`}
          language="javascript"
          title="let-design.js"
          defaultOpen={false}
        />

        <CardComponent variant="info" title="🔬 TC39 Decision Process">
          <PlainText component="div">
            • <Bold>2013:</Bold> Proposal for <InlineCode>let</InlineCode> submitted to TC39<br />
            • <Bold>2014:</Bold> Multiple rounds of review and feedback<br />
            • <Bold>2015:</Bold> <InlineCode>let</InlineCode> included in ES6 specification<br />
            • <Bold>2016:</Bold> Major browsers implemented <InlineCode>let</InlineCode><br />
            • <Bold>Today:</Bold> <InlineCode>let</InlineCode> is the standard for mutable variables
          </PlainText>
        </CardComponent>

        <CardComponent variant="default" title="💡 Expert Insights">
          <UnorderedList
            items={[
              <>📚 <Bold>Educational Value:</Bold> "let" is familiar to mathematicians and CS students</>,
              <>🌐 <Bold>Global Influence:</Bold> Used in many languages across different paradigms</>,
              <>🔄 <Bold>Forward Compatibility:</Bold> Safe to add as a new keyword</>,
              <>🎯 <Bold>Clear Intent:</Bold> Developers understand it means "declare a variable"</>,
              <>📝 <Bold>Short and Concise:</Bold> Easy to type and remember</>,
            ]}
          />
        </CardComponent>

        <HLText type="info">
          💡 <Bold>Expert Insight:</Bold> The choice of <InlineCode>let</InlineCode> in JavaScript was <Bold>deliberate and well-researched</Bold>. It represents the language's <Bold>evolution</Bold> from a simple scripting language to a <Bold>modern, professional programming language</Bold>.
        </HLText>

        <Note type="success" icon="🎯">
          <Bold>Key Takeaway:</Bold> <InlineCode>let</InlineCode> is <Bold>more than just a keyword</Bold> - it's a <Bold>bridge</Bold> between mathematics, computer science theory, and practical programming.
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
            <>📐 <Bold>Mathematical Origin:</Bold> "let" is used in algebra and logic</>,
            <>📜 <Bold>Historical Significance:</Bold> Used in many languages since the 1960s</>,
            <>🌍 <Bold>Global Standard:</Bold> Consistent with other programming languages</>,
            <>🎯 <Bold>Clear Intent:</Bold> Clearly indicates variable declaration</>,
            <>🚫 <Bold>No Conflicts:</Bold> Not a reserved word in existing JavaScript</>,
            <>🔄 <Bold>Forward Thinking:</Bold> Designed for modern JavaScript development</>,
          ]}
        />
      </CardComponent>

      <HLText type="info">
        💡 <Bold>Pro Tip:</Bold> Understanding the <Bold>history and reasoning</Bold> behind language features makes you a <Bold>better developer</Bold>. It helps you appreciate why things are the way they are.
      </HLText>

      <Note type="success" icon="🎉">
        <Bold>Remember:</Bold> The name <InlineCode>let</InlineCode> was <Bold>carefully chosen</Bold> to represent the <Bold>evolution</Bold> of JavaScript into a <Bold>modern, robust programming language</Bold>.
      </Note>
    </QuestionWrapper>
  );
}