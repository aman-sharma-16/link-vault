const notProvidedWarningMsg = (name: string) => {
  return `${
    name[0].toUpperCase() + name.slice(1, name.length)
  } is not provided.`;
};


export { notProvidedWarningMsg };
