# EmailsInput

A plain javascript component to input email addresses

## Usage

Include js file with `<script src="emails-input.bundle.js"></script>` at the bottom of \<body\> tag, after the markup.

Include a script with initialization code.

```html
<body>
  ...
  <!-- a container element for the component -->
  <div class="emails-input"></div>
  ...
  <script src="emails-input.bundle.js"></script>
  <script>
    var inputContainerNode = document.querySelector('.emails-input');
    var emailsInput = EmailsInput(inputContainerNode);
  </script>
</body>
```

## Initialization

When the script is loaded, it adds a global variable `EmailsInput` which is a constructor function

```
window.EmailsInput
```

## Constructor function

Constructor function `EmailsInput` expects two arguments

- containerNode: `HTMLElement`
- config: `Partial<Config>` ( optional, default value is `{}`)

Optional second argument `config` implements typescript interface wrapped with `Partial`, which means all paramenters are optional.

```typescript
interface Config {
  defaultEmails: string[];
  maxHeight: string;
  minHeight: string;
}
```

### Description of parameters

| Name              | Type             | Description                                                                                                                                                                                                                                                                                                |
| ----------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **defaultEmails** | array of strings | - component will render with provided list of emails;<br>- component will raise an error if the type is not an array;<br>- component will raise an error if any element of the array is not a string;<br> - valid example `['invalid_email', 'valid@email.com', '12345']`;<br>- invalid example `[123]`    |
| **maxHeight**     | string           | sets internal style `{max-height: <value>}` to limit the maximum height of the container when too many emails are added;<br> - the format of the string should be the same as for related css property;<br>- component will raise an error if the type is not a string;<br>- examples: `'450px'`, `'5rem'` |
| **minHeight**     | string           | sets internal style `{min-height: <value>}` to limit the minimum height of the container <br> - the format of the string should be the same as for related css property;<br>- component will raise an error if the type is not a string;<br>- examples: `'100px'`, `'1rem'`                                |

## Instance API

Constructor function returns an instance of the component
which implements typescript interface `EmailsInputAPI`

```typescript
interface EmailsInputAPI {
  getEmails: () => string[];
  setEmails: (emails: string[]) => void;
  onEmailsChange: (callback: EmailChangeCallbackFn) => UnsubscribeFn;
  // extra method
  isEmailValid: (email: string) => boolean;
}

interface EmailChangeCallbackFn {
  (emails: string[]): void;
}
interface UnsubscribeFn {
  (): void;
}
```

### Description of methods

| Name               | Type     | Description                                                                                                                                                                                                                                                                                                                                                 |
| ------------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **getEmails**      | function | - a method to get all entered emails, both valid and invalid<br> - does not require any arguments<br>- returns array of strings<br>                                                                                                                                                                                                                         |
| **setEmails**      | function | - a method to replace all entered emails with new ones<br> - expects array of strings as the argument<br>- does not return anything<br>- all commas are removed from every string<br>- all trailing spaces are moved from every string<br>- a string in format `First Last Name <email@address.com>` is truncated to `email@address.com`                           |
| **onEmailsChange** | function | - a method provides ability to subscribe for emails list changes<br>- expects a callback function which will be called on any changes in emails list<br>- an array of strings will be provided as the argument to the callback function<br>- returns `unsubscribe` function, call it to unsubscribe callback from getting new updates <br>- see example below |
| **isEmailValid**   | function | - a method to check any string if it is a valid email                                                                                                                                                                                                                                                                                                         |

Email validation is implemented with RegExp from [W3C documentation](<https://html.spec.whatwg.org/multipage/input.html#e-mail-state-(type=email)>)

```regexp
/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
```

## Component behavior

- Component depends on the parent container’s width
- If parent width changes, inserted emails are redistributed by rows
- Component's styles are defined with css modules, so they don't conflict with other css styles
- If component has too many emails, user can scroll the component
- The last block of the component is an `input field` to insert email manually
- Email block is created by pressing Enter, entering comma, or by losing focus on the `input field`.
- New email block is added before `input field`
- Pasted string into the `input field` is converted into multiple email blocks immediately, if the string contains at least one comma character (`,`)
  - pasted string is split into multiple substrings separated by `comma`
  - if a substring has angle brackets (e.g. `John Smith <john@smith>`), then only the content inside of angle brackets will be inserted as an email block
  - if a substring has trailing spaces, they will be truncated
  - if the substring is empty after above manipulations, the email block will not be added (e.g. a substring `' Mike < > '` will not be added)
- Added email block contains a clickable `x` character to the right to be used for removing

## Examples of usage

#### Using several components on the same page

```html
...
<div class="emails-input-1"></div>
<div class="emails-input-2"></div>
...
<button class="add-email">Add Email</button>
<button class="get-valid-emails-count">
  Get Emails Counts
</button>
...
<script src="emails-input.bundle.js"></script>
<script type="application/javascript">
  function main() {
    const emailsInput = EmailsInput(document.querySelector('.emails-input-1'));
    const emailsInput2 = EmailsInput(document.querySelector('.emails-input-2'));

    emailsInput.setEmails(['mike@miro.com', 'incorrect']);
    emailsInput2.setEmails(['three', 'incorrect', 'emails']);

    // Get Valid Emails Count
    const countBtn = document.querySelector('button.get-valid-emails-count');
    function countClickHandler(instance) {
      return function() {
        const emails = instance.getEmails();
        const validEmails = emails.filter(function(email) {
          return instance.isEmailValid(email);
        });
        alert(
          'Number of valid emails in EmailsInput component: ' +
            validEmails.length
        );
      };
    }
    countBtn.addEventListener('click', countClickHandler(emailsInput));

    // Add Random email
    const addEmailBtn = document.querySelector('button.add-email');
    function randomEmail() {
      return [
        'random_',
        String(Math.floor(Math.random() * 999)),
        Math.random() > 0.5 ? '@' : '',
        'domain.com',
      ].join('');
    }
    function addEmailClickHandler(instance) {
      return function() {
        const emails = instance.getEmails();
        emails.push(randomEmail());
        instance.setEmails(emails);
      };
    }
    addEmailBtn.addEventListener('click', addEmailClickHandler(emailsInput));
  }
  document.addEventListener('DOMContentLoaded', main, false);
</script>
```

#### Subscribe to email list changes

Subscribe to email list changes - show alert with a list of emails.

Unsubscribe from changes in 1 minute.

Add email manually using input field, or delete some emails to see an alert of every change.

```html
...
<div class="emails-input-1"></div>
...
<script src="emails-input.bundle.js"></script>
<script type="application/javascript">
  function main() {
    const emailsInput = EmailsInput(document.querySelector('.emails-input-1'));
    emailsInput.setEmails(['mike@miro.com', 'incorrect']);

    function changeListener(emails) {
      alert('Email list was update: ' + emails.join('\n'));
    }
    const unsubscribe = emailsInput.onEmailsChange(changeListener);
    function stopSubscriptionInAMinute() {
      unsubscribe();
      alert('Email list subscription was stopped');
    }
    setTimeout(stopSubscriptionInAMinute, 60000);
  }
  document.addEventListener('DOMContentLoaded', main, false);
</script>
```

#### Using config

```html
...
<div class="emails-input-1"></div>
...
<script src="emails-input.bundle.js"></script>
<script type="application/javascript">
  function main() {
    const config = {
      defaultEmails: ['mike@miro.com', 'incorrect'],
      minHeight: '80px',
      maxHeight: '400px',
    };
    const emailsInput = EmailsInput(
      document.querySelector('.emails-input-1'),
      config
    );
    // emailsInput.getEmails() should return defaultEmails
  }
  document.addEventListener('DOMContentLoaded', main, false);
</script>
```

### Internal design

Component codebase consists of these files

- `emails-input.ts` - root file, contains all behavior logic
- `email-node.ts` - a presenter of email block, provides two API methods
  - `create` - to create a new email block (HTMLDivElement with `<span>` as a delete button)
  - `isDeleteButton` - to check if the target element is the one with 'X' character to delete the block. It is used in `onClick` handler of the root component
- `input-node.ts` - a presenter of input field, provides one API method
  - `create` - to create an HTMLInputElement
- `polyfills.ts` - contains an implementation of `CustomEvent` for `IE11`
- `styles.ts` - css styles for the component and its children. It uses npm library `astroturf` - zero runtime CSS-in-JS with Typescript support. Unfortunately, this library does not work with `jest` properly. That's why I implemented a mock for it. It's located in `./src/__mocks__/astroturf.js`
- `test-helper.ts` - some methods used in unit tests, this file is not included in production bundle.
- `utils.ts` - utility methods
  - `validateEmail` - check email using regexp
  - `parsePastedText` - split pasted text into multiple email strings
  - `isFunction` - implementation of type check

#### emails-input.ts

Root component defines 3 generic event listeners and 2 custom ones

- `keyup` -> method `_onKeyUp` - checks if `Enter` or `Comma` are pressed by user and dispatches custom event `COMPLETE_INPUT`
- `focusout` -> method `_onFocusout` - dispatches custom event `COMPLETE_INPUT`
- `COMPLETE_INPUT` -> method `_convertInputToNode` - creates a new email block based on value in input field
- `click` -> method `_onClick` checks the target element and dispatches custom event `DELETE_EMAIL_NODE`
- `DELETE_EMAIL_NODE` -> method `_deleteTargetEmail` - removes a clicked email block
- `paste` -> method `_onPaste` - parses pasted text in the input field and creates multiple email blocks in case pasted text contains `comma` characters (at least one)

Root component implements `Observer` pattern to provide `subscribe/unsubscribe` interface for external listeners.

Instance of the component implements method `onEmailsChange` (aka `subscribe`).

- it expects a `callback` function as an argument
- it returns `unsubscribe` function; this function should be called whenever `callback` should stop receiving updates
- whenever email list is changed, `callback` will be called with argument `string[]`, e.g.

```typescript
// given: email list is empty; callback function was provided as observer
const divContainer = document.querySelector('<some selector>');
const instance = EmailsInput(divContainer);
const callbackFn = (emailArray: string[]) => {
  console.log(emailArray.join(', '));
};
const cancelCallback = instance.onEmailsChange(callbackFn);
// when: user adds a new email block manually; email list contains a single value 'new@email'
// then: instance calls callback function automatically
// like that callbackFn(['new@email'])
// as the result a string 'new@email' is shown in the browser console

// given: stop receiving updates
cancelCallback();
// when: user adds a new email block; email list contains two values ['new@email','second']
// then: callbackFn is not called any more;
```

### Package.json scripts

`npm start` - to run development mode

`npm run start:open` - to run development mode and open a new tab in the browser

`npm test` - to run unit tests using jest

`npm run test:watch` - to run tests in watch mode

`npm run test:coverage` - to run tests and display test coverage

`npm run build:dev` - to build development version of the code in the folder `docs`

- Why in `docs`? Because `Github Pages` uses that folder by default.

`npm run build` - to build production version of the code in the folder `docs`

- Webpack will create two bundle files and one archive:
  - `index.bundle.js` - contains parent container layout and example javascript code for the `index.html`
  - `emails-input.bundle.js` - contains the component with included css styles
  - `emails-input.bubdle.js.gz` - compressed version of the component

`npm run build:analyzer` - to build production version of the code and open webpack analyzer in the browser

`npm run format` - to run `prettier` with flag --write for all files in `./src`
