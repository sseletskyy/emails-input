export interface EmailChangeCallbackFn {
  (emails: string[]): void;
}
export interface UnsubscribeFn {
  (): void;
}

export interface EmailsInputAPI {
  getEmails: () => string[];
  setEmails: (emails: string[]) => void;
  onEmailsChange: (callback: EmailChangeCallbackFn) => UnsubscribeFn;
  // extra methods
  isEmailValid: (email: string) => boolean;
  destroy: () => void;
}

export interface Config {
  defaultEmails: string[];
  maxHeight: string;
  minHeight: string;
}
