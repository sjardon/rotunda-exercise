# ErrorAlarm

## Introduction

We need a new alarm service that notify different error events. We are not concerned about these errors when their frequency is low. However, when lots of errors occur in a short period of time, there may be a problem with the application and we want to be notified immediately.

The solution will include the current logging logic but isolating it with a new alerts service. That allow us to abstract the alerts from the logging, so will be easy to add new kinds of alerts in the future.

## Goals

The final solution must guarantee:

1. Send notifications by email.
2. Send notifications when certanin amount of errors in a period of time is reached. E.g.: when more than ten errors occur in one minute, we want to receive an email notification.
3. Limit the notifications to one for period of time. E.g.: Must not send more than one email per minute.

## ErorAlarm Service

To achieve our goals I designed `ErrorAlarm` service. It's an isolated service that delegate in more granular tasks the general purpose. At least, we need to:

1.  Get logged data
2.  Validate some signals from it
3.  Send notifications if it's needed.
4.  Orchestate all this flow

We can check that structure in this diagram:

![ErrorAlarmService class diagram](error-alarm-class-diagram.jpg)

### DataSource

`DataSource` interface should have several methods that allow to `Signal` component get its needed information. In this way we can abstract where this information come and get a common type for the next process instances.

The sourcing process start getting the new log line from the log source and aggregating it to some cache. The internal cache has only the most recent rows, getting rid the oldest ones.

In our case, we can connect `ErrorAlarm` to our log text file adding a new `TextFile` data source. We only need to set the path and the log line schema to connect the source to our `ErrorAlarm` service.

```ts
interface DataSource {
  get(): Promise<LogRow[]>;
  getSince(startDate: Date): Promise<LogRow[]>;
  // We can include here any other access method that we want.
}
```

```ts
type LogRowCustomField = {
  key: string;
  value: string | number | boolean;
};

class LogRow {
  logline: string;
  createdAt: Date;
  customFields: LogRowCustomField[];

  getCustomFieldByKey(key: string): LogRowCustomField;
}
```

### Signal

`Signal` has the ability to make different operations (logical comparations, text search, count rows, etc) over any dataset provided by the `DataSource` interface. The final result is a boolean that indicates if the validation check the signal or not. Probably we can break this class in several parts to get the needed info, transform and use it from the `DataSource`.

```ts
class Signal {
  constructor(private dataSource: DataSource, private operators: Operator) {}

  async test(): Promise<boolean> {
    // Here we should make use of dataSource to get the needed log rows
    // and bring them to the operators functions that will validate the the signal.
  }
}

interface Operator<T, R> {
  // I got this Operator interface from an old personal project.
  values: T;
  resolve(): R;
}

class CountElements implements Operator<LogRow[], number> {
  constructor(values: T[]) {
    this.values = values;
  }

  resolve(): number {
    return this.values.length;
  }
}
```

To check if more than ten errors occur in one minute we can use the `DataSource.getSince` method and check if the total `LogRow` elements are more than ten with the `CountElements` operator and some other `Greater` operator for the comparison logic.

### Notificator

`Notificator` interface allow us to send notifications if the `Signal` class confirm the test. We can specify different rules of when send messages with the `NotificatorRule` class. `Notificator` will save in cache the sended `Notification` for futures usages.

To send our notifications by email we only need to add an `EmailMethod` to the `Notificator`.

```ts
class Notificator {
  constructor(
    private rules: NotificatorRule[],
    private methods: NotificatorMethod[]
  ) {}

  async notify(): Promise<boolean> {
    for (let rule of this.rules) {
      if (!(await rule.validate())) {
        return false;
      }
    }

    for (let method of this.methods) {
      const notification = method.notify();
      // save the notification
    }

    // if does not throw any error return true...
  }
}

interface NotificatorRule {
  validate(): Promise<boolean>;
}

interface NotificatorMethod {
  notify(): Promise<Notification>;
}

class Notification {
  // Here properties and methods that the sended message needs like status, etc.
}
```

### ErrorAlarm

As I told above, the `ErrorAlarm` responsavility is orchestate the differents components. This involves:

1. Instantiate every component, probably making usage of some factories.
2. Run a cron job to start the process or run every check whithin each `logError` call.
3. Run `Signal.test` and fire the `Notificator.notify` if it is `true`.

To initialize `ErrorAlarm` we should set all needed configuration in the bootstrap process of our system.

## References

I got inspiration from [this diagram](https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/media/alerts-overview/alerts.png) from [Azure Monitor alerts](https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/alerts-overview) and, regarding the notification signals, I got some ideas from [my personal trading bot project](https://github.com/sjardon/sj-trading).
