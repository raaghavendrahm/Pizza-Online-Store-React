import { createContext } from 'react';

// When "ADD" button in Product in clicked, items in Navbar must be updated and that product (item) must be rendered in Cart. In react, passing data from parent to children component in through props and from child to parent is though functions as props. But, these are sibling components. Data flow among siblings are complex. This is solved by using "CONTEXT API". When context api is used, data will be stored in a centralized location, typically in root level (App level), so that data can be shared with all components easily. This is how state management is done with Context API. If project is bigger, for state management, libraries like "REDUX" are used. By using context api, passing props for every component can be prevented.

export const CartContext = createContext(null);
