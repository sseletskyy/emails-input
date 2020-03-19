export const getChildren = (parent: HTMLElement): HTMLElement[] => {
  return Array.from(parent.children) as HTMLElement[];
};
