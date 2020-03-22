export const getRootNode = (parent: HTMLElement): HTMLDivElement => {
  return parent.firstChild as HTMLDivElement;
};
export const getChildren = (parent: HTMLElement): HTMLElement[] => {
  return Array.from(getRootNode(parent).children) as HTMLElement[];
};
