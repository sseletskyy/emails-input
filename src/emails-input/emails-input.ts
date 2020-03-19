import { EmailNode } from './email-node';

interface EmailsInputAPI {
  getEmails: () => string[];
  setEmails: (emails: string[]) => void;
}
export function EmailsInput(containerNode: HTMLElement): EmailsInputAPI {
  const getEmails = (): string[] => {
    return [];
  };

  const _validateIncomingEmails = (emails: string[] | any) => {
    if (
      !Array.isArray(emails) ||
      emails.find(email => typeof email !== 'string')
    ) {
      throw new Error(
        'EmailsInput : setEmails method expects an array of strings as an argument'
      );
    }
  };

  const setEmails = (emails: string[]): void => {
    _validateIncomingEmails(emails);
    emails.forEach(email => {
      const item = EmailNode.create(email);
      containerNode.appendChild<HTMLDivElement>(item);
    });
  };
  return {
    getEmails,
    setEmails,
  };
}

// if (window && document) {
//   document.addEventListener('DOMContentLoaded', () => {
//     (function() {
//       var EmailsInput = ClassEmailsInput;
//     })();
//   });
// }

// @ts-ignore
window['EmailsInput'] = EmailsInput;
