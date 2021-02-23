import Task from './model/task';
import Project from './model/project';
import Directory from './model/directory';

const SAVENAME = 'DIR_DATA';

// take an array of projects & save it to localStorage
const save = (directory) => {
  console.log('saving directory');
  const dirJSON = JSON.stringify(directory);
  window.localStorage.setItem(SAVENAME, dirJSON);
};

// return the saved array of projects from localStorage
const load = () => {
  console.log('Attempting to load from localStorage');

  const rawJSON = window.localStorage.getItem(SAVENAME);

  if (!rawJSON) {
    console.log('Could not find localStorage data!');
    return null;
  }

  console.log('Attempting to load from localStorage');

  console.log(rawJSON);

  const rawDir = JSON.parse(rawJSON);
  const dir = new Directory('Default directory');

  rawDir.children.forEach((project) => {
    const children = [];

    project.children.forEach((child) => {
      children.push(new Task(
        child.title,
        child.description,
        new Date(child.dueDate),
        child.priority,
        child.isComplete,
      ));
    });

    dir.addChild(new Project(
      project.title,
      project.description,
      children,
    ));
  });

  console.log(rawDir);
  console.log(dir);
  return dir;
};

export { save, load };
