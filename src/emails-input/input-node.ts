// @ts-ignore
import styles from './styles';
interface InputNodeAPI {
  create: () => HTMLInputElement;
}

const InputNodeFn = (): InputNodeAPI => {
  const create = (): HTMLInputElement => {
    // TODO optimise creation with a template to be cloned
    const input = document.createElement('input');
    input.placeholder = 'add more people...';
    input.className = styles.input;
    return input;
  };

  return {
    create,
  };
};

export const InputNode = InputNodeFn();
