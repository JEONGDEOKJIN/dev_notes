# **O: Open-closed principle (변경에 열려 있도록 해라)**

# **Description**

The core meaning of the Open/Closed principle is made clear by the statement: *open to extension, closed for modification. *The idea is that a class, once implemented, should be closed for any further modification. If any more functionality is needed, it can be added later using extension features such as **inheritance**. This is primarily done so as to not break existing code as well as unit tests. It also results in a modular code.

# **The Challenge**

Suppose there is a `NotificationService` that helps us send out an email to the end user. The gist is self-explanatory. There are 2 classes — `EmailService` and `NotificationService`.`NotificationService` calls the`sendEmail` on`EmailService`.

```ts
class EmailService {
  public sendEmail(email: string, message: string): void {
    console.log(`Email Sent: ${message} to ${email}`);
  }
}

class NotificationService {
  private _emailService: EmailService;
  constructor() {
    this._emailService = new EmailService();
  }
  public sendNotification(email: string, message: string) {
    this._emailService.sendEmail(email, message);
  }
}

const main = () => {
  const notificationService = new NotificationService();
  notificationService.sendNotification(
    "hello@example.com",
    "Generic Notification"
  );
};

main();
```

Now, extending this example — let’s add a requirement to create a notification when an order is completed, sending both an Email and an SMS to the end user. One way to solve this would be to create a new SMSService which is also initialized in the NotificationService class.

```ts
class EmailService {
  public sendEmail(email: string, message: string): void {
    console.log(`Email Sent: ${message}`);
  }
}

class SMSService {
  public sendSms(phone: number, message: string): void {
    console.log(`Message ${message} sent to ${phone}`);
  }
}

class NotificationService {
  private _emailService: EmailService;
  private _smsService: SMSService;

  constructor() {
    this._emailService = new EmailService();
    this._smsService = new SMSService();
  }
  public sendNotification(
    email: string,
    message: string,
    phone: number,
    smsMessage: string
  ) {
    this._emailService.sendEmail(email, message);
    if (phone && smsMessage) {
      this._smsService.sendSms(phone, smsMessage);
    }
  }
}

const main = () => {
  const orderNotificationService = new NotificationService();
  orderNotificationService.sendNotification(
    "hello@example.com",
    "Generic Notification",
    9876543210,
    "SMS Notification"
  );
};

main();
```

# **Where this Fails**

The above solution works well, looks clean, and produces the desired functional outcome. But the tests fail, and all instances of these services will need to be modified in the code. Additionally, what if the code is closed to modification already — for instance, what if the base classes are part of a library? This is where sticking to the Open/Closed principle aids us.

# **Solution**

Let’s try to fix the above and add the SMS Service without modifying the base`NotificationService` class.

```ts
class EmailService {
  public sendEmail(email: string, message: string): void {
    console.log(`Email Sent: ${message}`);
  }
}

class SMSService {
  public sendSms(phone: number, message: string): void {
    console.log(`Message ${message} sent to ${phone}`);
  }
}

class NotificationService {
  private _emailService: EmailService;
  constructor() {
    this._emailService = new EmailService();
  }
  public sendNotification(email: string, message: string) {
    this._emailService.sendEmail(email, message);
  }
}

class OrderNotificationService extends NotificationService {
  private _smsService: SMSService;
  constructor() {
    super();
    this._smsService = new SMSService();
  }

  public sendOrderNotification(
    email: string,
    emailMessage: string,
    phone?: number,
    smsMessage?: string
  ) {
    if (email && emailMessage) {
      this.sendNotification(email, emailMessage);
    }
    if (phone && smsMessage) {
      this._smsService.sendSms(phone, smsMessage);
    }
  }
}

const main = () => {
  const orderNotificationService = new OrderNotificationService();
  orderNotificationService.sendOrderNotification(
    "hello@example.com",
    "Order accepted",
    9876543210,
    "Order Accepted"
  );
};

main();
```

In the above solution, rather than modifying the `NotificationService` class, we instead create a separate `OrderNotificationService` class. This extends the generic `NotificationService` and instantiates the`SMSService` class. There are a number of pros to this approach:

1. The previous code remains untouched
2. No breaking test cases
3. No referential changes to other parts of the code

# **Summary**

Two key ideas for summarising the Open/Closed principle are as follows:

1. A module will be considered open if it’s available for extension.
2. A module will be considered closed if it’s available for use by other submodules.

This principle is most crucial for enterprise/large codebases. The impact is large because modifying a module might have unforeseen consequences in various submodule implementations.


```ts
interface Car {
	function goFront;
}

interface TaxiDriver {
	function runTaxi;
}

class Avante implements Car {
	function goFront = () => {
		...
	};
}

class Sonata implements Car {
	function goFront = () => {
		...
	};
}

class Ferari implements Car {
	function goFront = () => {
		...
	};
}

class TaxiDriver implements TaxiDriver {
	constructor (car: Car){
		this.car = car
	}
	
	function runTaxi(){
		this.car.goFront()
	}
}

taxiDriver = new TaxiDriver(Ferari());
taxiDriver.runTaxi();
```

- sidecar pattern
- interface 상속


# 개방 폐쇄 원칙에 따른 컴포넌트 설계 

```bash
- 기능 추가시 본체를 수정하지 말고 '확장' 할 것
- 리액트 컴포넌트에서 '확장' 방식 중 하나는 children 을 사용
```

### button 컴포넌트에 '기능을 추가' 하고 싶으면, 확장 기능(extend) 으로써 children 을 사용하기 

- buton 컴포넌트 
```ts
// components/Button.tsx
import React, { ReactNode } from 'react';

type ButtonProps = {
  onClick: () => void;
  styleType?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'm' | 'd' | 'lx'; // 사이즈 옵션 추가
  children: ReactNode;
};

const Button: React.FC<ButtonProps> = ({ onClick, styleType = 'primary', size = 'm', children }) => {
  const getButtonStyle = () => {
    switch (styleType) {
      case 'secondary':
        return 'bg-gray-500 text-white';
      case 'danger':
        return 'bg-red-500 text-white';
      default:
        return 'bg-blue-500 text-white';
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'sm':
        return 'w-20 h-8 text-sm'; // 작은 사이즈
      case 'm':
        return 'w-32 h-10 text-base'; // 중간 사이즈 (기본값)
      case 'd':
        return 'w-40 h-12 text-lg'; // 큰 사이즈
      case 'lx':
        return 'w-48 h-14 text-xl'; // 매우 큰 사이즈
      default:
        return '';
    }
  };

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded ${getButtonStyle()} ${getSizeStyle()}`}
    >
      {children}
    </button>
  );
};

export default Button;
```

- [button 에 '아이콘' 을 넣는 기능을 추가 하고 싶을 경우] 1) 기존 Button 본체의 props 를 수정하는게 아니라 2) children 으로 들어갈 수 있게 하고 3) 컴포넌트를 하나 더 만든다. 

```ts
// components/IconButton.tsx
import React from 'react';
import Button from './Button';
import { IconType } from 'react-icons';

type IconButtonProps = {
  icon: IconType;
  label: string;
  onClick: () => void;
  styleType?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'm' | 'd' | 'lx';
};

const IconButton: React.FC<IconButtonProps> = ({ icon: Icon, label, onClick, styleType, size }) => {
  return (
    <Button onClick={onClick} styleType={styleType} size={size}>
      <Icon className="mr-2 inline-block" />
      {label}
    </Button>
  );
};

export default IconButton;

```

### HOC 를 이용한 extend 

- Problem:
You have a DataDisplay component that shows data. You want to add a loading indicator when the data is being fetched, but without modifying the DataDisplay component itself.

- Solution:
We’ll use a Higher-Order Component (HOC) called withLoadingIndicator to add a loading feature.

- Step 1: Define the DataDisplay Component
This component simply displays data it receives as props.

```js
const DataDisplay = ({ data }) => (
  <div>
    <h1>Data:</h1>
    <p>{data}</p>
  </div>
);

export default DataDisplay;

```

- Step 2: Create the withLoadingIndicator HOC
The HOC will wrap the DataDisplay component and show a loading message if data is still being fetched.

```js
const withLoadingIndicator = (WrappedComponent) => {
  return ({ isLoading, ...props }) => {
    if (isLoading) {
      return <p>Loading...</p>; // Show loading indicator
    }
    return <WrappedComponent {...props} />; // Render original component
  };
};

```

Step 3: Use the HOC to Create an "Extended" Component
We’ll create a new component that has the loading feature.

```js
const DataDisplayWithLoading = withLoadingIndicator(DataDisplay);
```

Step 4: Use DataDisplayWithLoading in Your App
Now, you can use DataDisplayWithLoading and control whether it shows the loading message or the actual data.

```js
const App = () => {
  const isLoading = true; // or false, depending on the loading state
  const data = "Here is some data";

  return <DataDisplayWithLoading isLoading={isLoading} data={data} />;
};
```

- summary 
  - Original Component: DataDisplay just displays data, without any loading logic.
  - Higher-Order Component: withLoadingIndicator takes DataDisplay and wraps it to add loading logic. It checks the isLoading prop, and if true, it shows "Loading...". Otherwise, it renders the original DataDisplay component.
  - Extended Component: DataDisplayWithLoading now has the added loading feature, but the DataDisplay component remains unchanged.
  - This way, you "extend" DataDisplay with a loading feature, achieving the Open/Closed Principle by keeping DataDisplay closed for modification but open for extension.