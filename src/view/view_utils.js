function removeAllChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

// eslint-disable-next-line import/prefer-default-export
export { removeAllChildren };
