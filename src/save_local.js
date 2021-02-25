import Task from './model/task';
import Project from './model/project';
import Directory from './model/directory';

const SAVENAME = 'DIR_DATA';

// take an array of projects & save it to localStorage
const save = (directory) => {
  console.log(`saving ${directory.title}`);
  const dirJSON = JSON.stringify(directory.getSerializable());
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

  const rawDir = JSON.parse(rawJSON);
  const dir = new Directory({ title: 'Default directory' });

  rawDir.children.forEach((project) => {
    const children = [];

    project.children.forEach((child) => {
      children.push(new Task({
        title: child.title,
        description: child.description,
        dueDate: new Date(child.dueDate),
        priority: child.priority,
        isComplete: child.isComplete,
      }));
    });

    dir.addChild(new Project({
      title: project.title,
      description: project.description,
      children,
    }));
  });

  console.log(rawDir);
  console.log(dir);
  return dir;
};

export { save, load };
