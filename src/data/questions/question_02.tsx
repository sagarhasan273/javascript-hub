// components/questions/Question02.tsx
import { QuestionWrapper } from '../../components/QuestionWrapper';
import {
  Title,
  PlainText,
  Bold,
  CodeComponent,
  Divider,
  CardComponent,
  HLText,
} from '../../components/content';

interface Question02Props {
  index?: number;
  isActive?: boolean;
}

export function Question02({ index = 0, isActive = false }: Question02Props) {
  return (
    <QuestionWrapper
      id={2}
      title="What is the difference between null and undefined?"
      definition="Both represent 'nothing' but with different meanings: undefined means not assigned, null means intentionally empty."
      index={index}
      isActive={isActive}
    >
      <Title level={3}>undefined - Not Assigned</Title>
      <PlainText>
        undefined is the default value for variables that have been declared but not assigned a value.
      </PlainText>
      <CodeComponent>{`// undefined examples
let name;                    // undefined
const obj = {};             
console.log(obj.age);        // undefined
function greet() {}
console.log(greet());        // undefined`}</CodeComponent>

      <Divider />

      <Title level={3}>null - Intentionally Empty</Title>
      <PlainText>
        null is a value that represents 'nothing' or 'empty' and must be explicitly assigned.
      </PlainText>
      <CodeComponent>{`// null examples
let name = null;             // explicitly empty
const obj = { age: null };   // property intentionally empty
function findUser(id) {
  if (!id) return null;      // explicitly returning nothing
}`}</CodeComponent>

      <Divider />

      <Title level={3}>Key Differences</Title>
      <CodeComponent>{`// Key differences
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
JSON.stringify({ value: null });      // {"value":null}`}</CodeComponent>

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