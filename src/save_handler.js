const SAVENAME = 'DIR_DATA';

// take an array of projects & save it to localStorage
const save = (directory) => {
  const dirJSON = JSON.stringify(directory);
  window.localStorage.setItem(SAVENAME, dirJSON);
};

// return the saved array of projects from localStorage
const load = () => {
  const rawJSON = window.localStorage.getItem(SAVENAME);

  if (!rawJSON) {
    return false; // TODO ? or return test tasks...
  }

  const rawDir = JSON.parse(rawJSON);

  // TODO: convert raw objs to Projects & Tasks

  console.log(rawDir);
  return true;
};

export { save, load };
