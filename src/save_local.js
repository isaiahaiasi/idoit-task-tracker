import Task from './model/task';
import Project from './model/project';

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
    return null;
  }

  const rawDir = JSON.parse(rawJSON);

  // TODO: implement real directory model
  const dir = [];
  rawDir.forEach((project) => {
    const children = [];
    project.children.forEach((child) => {
      children.push(new Task(
        child.title,
        child.description,
        new Date(child.dueDate),
        child.priority,
      ));
    });

    dir.push(new Project(
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
