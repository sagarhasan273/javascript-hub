// data/questions/Question02.tsx
import { QuestionWrapper } from '../../components/QuestionWrapper';
import {
  Title,
  PlainText,
  Bold,
  Divider,
  CardComponent,
  HLText,
  CodeComponent,
} from '../../components/content';
import { question02Meta } from './registry';


export function Question02({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  return (
    <QuestionWrapper
      id={question02Meta.id}
      title={question02Meta.title}
      definition={question02Meta.definition}
      index={index}
      isActive={isActive}
    >
      <Title level={3}>undefined - Not Assigned</Title>
      <PlainText>
        undefined is the default value for variables that have been declared but not assigned a value.
      </PlainText>
      
      <CodeComponent
        code={`// undefined examples
let name;                    // undefined
const obj = {};             
console.log(obj.age);        // undefined
function greet() {}
console.log(greet());        // undefined`}
        language="javascript"
        title="undefined-examples.js"
      />

      <Divider />

      <Title level={3}>null - Intentionally Empty</Title>
      <PlainText>
        null is a value that represents 'nothing' or 'empty' and must be explicitly assigned.
      </PlainText>
      
      <CodeComponent
        code={`// null examples
let name = null;             // explicitly empty
const obj = { age: null };   // property intentionally empty
function findUser(id) {
  if (!id) return null;      // explicitly returning nothing
}`}
        language="javascript"
        title="null-examples.js"
      />

      <Divider />

      <Title level={3}>Key Differences</Title>
      
      <CodeComponent
        code={`// Key differences
// 1. Type
typeof undefined;    // "undefined"
typeof null;         // "object" (historical bug)

// 2. Equality
null == undefined;   // true (loose equality)
null === undefined;  // false (strict equality)

// 3. Default assignment
let x;
console.log(x);      // undefined

let y = null;
console.log(y);      // null

// 4. JSON
JSON.stringify({ value: undefined }); // {}
JSON.stringify({ value: null });      // {"value":null}`}
        language="javascript"
        title="null-vs-undefined.js"
      />

      <CardComponent variant="info">
        <PlainText>
          <Bold>💡 Pro Tip:</Bold> Use undefined for uninitialized values, and null when you want to explicitly indicate 'no value'.
        </PlainText>
      </CardComponent>

      <HLText type="warning">
        ⚠️ Remember: typeof null returns "object" - this is a historical bug in JavaScript!
      </HLText>
    </QuestionWrapper>
  );
}