

## React 에서 제어 컴포넌트 방식으로 form 데이터 다루기 

- 주요 기능 
```
- 값 최신화 
- submit 이벤트 발생하고 제출
- 유효성 검사
- 에러 메시지
```



```jsx
import React, { useState, ChangeEvent, SyntheticEvent } from "react";

type FoodDeliveryFormType = {
  customerName: string;
  mobile: string;
};

type FoodDeliveryFormErrorType = {
  customerName: string;
  mobile: string;
};

export const FoodDeliveryForm = () => {
  const [values, setValues] = useState<FoodDeliveryFormType>({
    customerName: "",
    mobile: "",
  });

  const [errors, setErrors] = useState<FoodDeliveryFormErrorType>({
    customerName: "",
    mobile: "",
  });

  // Input Change Handler
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    // Clear specific field error
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  // Validate Form Data
  const validateFormData = () => {
    let tempErrors: FoodDeliveryFormErrorType = {
      customerName: "",
      mobile: "",
    };

    if (values.customerName.trim() === "") {
      tempErrors.customerName = "Customer name is required.";
    }
    if (values.mobile.trim() === "") {
      tempErrors.mobile = "Mobile number is required.";
    }

    setErrors(tempErrors);

    // Check if all errors are empty
    return Object.values(tempErrors).every((error) => error === "");
  };

  // Form Submit Handler
  const onSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateFormData()) {
      console.log("Form data is valid:", values);
    } else {
      console.log("Form is invalid:", errors);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-floating mb-3">
        <input
          type="text"
          name="customerName"
          className={`form-control ${errors.customerName ? "is-invalid" : ""}`}
          placeholder="Customer Name"
          value={values.customerName}
          onChange={handleInputChange}
        />
        <label htmlFor="customerName">Customer Name</label>
        {errors.customerName && (
          <div className="invalid-feedback">{errors.customerName}</div>
        )}
      </div>
      <div className="form-floating mb-3">
        <input
          type="text"
          name="mobile"
          className={`form-control ${errors.mobile ? "is-invalid" : ""}`}
          placeholder="Mobile Number"
          value={values.mobile}
          onChange={handleInputChange}
        />
        <label htmlFor="mobile">Mobile Number</label>
        {errors.mobile && <div className="invalid-feedback">{errors.mobile}</div>}
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};


```


## destructuring and the spread syntax (#⭐⭐⭐⭐⭐⭐)

```jsx
// Example of an object
const user = {
  name: "galacticexplorer",
  password: "faafa987",
  email: "galactic@explorer.com",
};

// Destructuring from the object
const { name, email } = user; // Extract 'name' and 'email'
console.log(name); // Output: galacticexplorer
console.log(email); // Output: galactic@explorer.com

// Creating a new object using spread syntax
const userProfile = {
  ...user, // Spread all properties of 'user'
  role: "admin", // Add a new property
};
console.log(userProfile);
// Output:
// {
//   name: "galacticexplorer",
//   password: "faafa987",
//   email: "galactic@explorer.com",
//   role: "admin"
// }

// Example of an array
const numbers = [1, 2, 3, 4, 5];

// Destructuring from an array
const [first, second, ...rest] = numbers; // Get the first two numbers and the rest
console.log(first); // Output: 1
console.log(second); // Output: 2
console.log(rest); // Output: [3, 4, 5]

// Combining arrays with spread syntax
const newNumbers = [...numbers, 6, 7];
console.log(newNumbers); // Output: [1, 2, 3, 4, 5, 6, 7]

```


```jsx
// Define the user object
const user = {
  name: "galacticexplorer",
  password: "faafa987",
};

// Define a dynamic key
const keyName = "nickName";

// Create a new object with the dynamic key
const userProfile = {
  ...user, // Spread the properties of the `user` object
  [keyName]: "Galactic Explorer", // Add the dynamic key with its value
};

console.log(userProfile);
// Output:
// {
//   name: "galacticexplorer",
//   password: "faafa987",
//   nickName: "Galactic Explorer"
// }
```