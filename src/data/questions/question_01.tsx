// data/questions/Question01.tsx
import { QuestionWrapper } from '../../components/QuestionWrapper';
import {
  Title,
  PlainText,
  Bold,
  CodeComponent,
  Divider,
  Gap,
  Note,
} from '../../components/content';
import { question01Meta } from './registry';


export function Question01({ index = 0, isActive = false }: { index?: number; isActive?: boolean }) {
  return (
    <QuestionWrapper
      id={question01Meta.id}
      title={question01Meta.title}
      definition={question01Meta.definition}
      index={index}
      isActive={isActive}
    >
      <PlainText>
        There are many ways to create objects in JavaScript as mentioned below:
      </PlainText>

      {/* i. Object literal syntax */}
      <Title level={3}>i. Object literal syntax:</Title>
      <PlainText>
        The object literal syntax (or object initializer), is a comma-separated set of name-value pairs wrapped in curly braces.
      </PlainText>
      
      <CodeComponent
        code={`var object = {
  name: "Sudheer",
  age: 34,
};`}
        language="javascript"
        title="object-literal.js"
        defaultOpen={true}
      />

      <PlainText>
        Object literal property values can be of any data type, including array, function, and nested object.
      </PlainText>

      <Note type="info">
        <Bold>Note:</Bold> This is one of the easiest ways to create an object and it's most commonly used for creating simple, ad-hoc objects.
      </Note>

      <Gap size={2} />

      {/* ii. Object constructor */}
      <Title level={3}>ii. Object constructor:</Title>
      <PlainText>
        The simplest way to create an empty object is using the <code style={{ background: '#f0f0f0', padding: '2px 6px', borderRadius: '4px' }}>Object</code> constructor. Currently this approach is not recommended.
      </PlainText>

      <CodeComponent
        code={`var object = new Object();`}
        language="javascript"
        title="object-constructor.js"
        defaultOpen={true}
      />

      <PlainText>
        The <code style={{ background: '#f0f0f0', padding: '2px 6px', borderRadius: '4px' }}>Object()</code> is a built-in constructor function so "new" keyword is not required for creating plain objects. The above code snippet can be re-written as:
      </PlainText>

      <CodeComponent
        code={`var object = Object();`}
        language="javascript"
        title="object-constructor-alt.js"
        defaultOpen={true}
      />

      <PlainText>
        However, <code style={{ background: '#f0f0f0', padding: '2px 6px', borderRadius: '4px' }}>Object()</code> can be used to either create a plain object or convert a given value into its corresponding object wrapper, whereas <code style={{ background: '#f0f0f0', padding: '2px 6px', borderRadius: '4px' }}>new Object()</code> is specifically used to explicitly create a new object instance.
      </PlainText>

      <Note type="warning">
        ⚠️ This approach is not recommended for creating objects. Use object literal syntax instead.
      </Note>

      <Gap size={2} />

      {/* iii. Object's create method */}
      <Title level={3}>iii. Object's create method:</Title>
      <PlainText>
        The <code style={{ background: '#f0f0f0', padding: '2px 6px', borderRadius: '4px' }}>create</code> method of Object is used to create a new object by passing the specified prototype object and properties as arguments, i.e., this pattern is helpful to create new objects based on existing objects. In other words, this is useful for setting up prototypal inheritance. The second argument is optional and it is used to create properties on a newly created object.
      </PlainText>

      <PlainText>
        The following code creates a new empty object whose prototype is null.
      </PlainText>

      <CodeComponent
        code={`var object = Object.create(null);`}
        language="javascript"
        title="object-create.js"
        defaultOpen={true}
      />

      <PlainText>
        The following example creates an object along with additional new properties.
      </PlainText>

      <CodeComponent
        code={`let vehicle = {
  wheels: "4",
  fuelType: "Gasoline",
  color: "Green",
};

let carProps = {
  type: {
    value: "Volkswagen",
  },
  model: {
    value: "Golf",
  },
};

var car = Object.create(vehicle, carProps);
console.log(car);`}
        language="javascript"
        title="object-create-example.js"
        defaultOpen={true}
      />

      <Gap size={2} />

      {/* iv. Function constructor */}
      <Title level={3}>iv. Function constructor:</Title>
      <PlainText>
        In this approach, create any function and apply the new operator to create object instances. This was the main way to do constructor-based OOP before ES6 classes.
      </PlainText>

      <CodeComponent
        code={`function Person(name, age) {
  this.name = name;
  this.age = age;
}

var person = new Person("Sudheer", 34);`}
        language="javascript"
        title="function-constructor.js"
        defaultOpen={true}
      />

      <Note type="info">
        💡 <Bold>Tip:</Bold> The function constructor approach is still valid but ES6 classes are now the preferred way for object-oriented programming in JavaScript.
      </Note>

      <Divider />

      {/* Summary */}
      <Title level={3}>Summary</Title>
      <PlainText>
        JavaScript offers multiple ways to create objects, each with its own use cases:
      </PlainText>
      <PlainText component="div">
        • <Bold>Object literal</Bold> - Best for simple, one-off objects<br />
        • <Bold>Object constructor</Bold> - Not recommended (use literal instead)<br />
        • <Bold>Object.create()</Bold> - Best for prototypal inheritance<br />
        • <Bold>Function constructor</Bold> - Traditional OOP approach (pre-ES6)<br />
        • <Bold>ES6 Classes</Bold> - Modern OOP approach (covered in advanced section)
      </PlainText>
    </QuestionWrapper>
  );
}