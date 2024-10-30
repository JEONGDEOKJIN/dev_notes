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


