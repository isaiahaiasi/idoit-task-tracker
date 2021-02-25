import ModelBase from './model/modelBase';
import Task from './model/task';
import Project from './model/project';
import Directory from './model/directory';

// save an item in localstorage at its ID's location
const save = (saveableItem) => {
  console.log(`saving ${saveableItem.title}`);
  const dirJSON = JSON.stringify(saveableItem.getSerializable());
  window.localStorage.setItem(saveableItem.getID(), dirJSON);
};

// remove a localStorage key (ie, when the referenced obj is deleted)
const remove = (saveableItem) => {
  console.log(`removing ${saveableItem.title} from localStorage`);
  saveableItem.children.forEach((child) => remove(child));
  window.localStorage.removeItem(saveableItem.getID());
};

// return the saved array of projects from localStorage
const load = (localStorageKey) => {
  console.log('Attempting to load from localStorage');

  const itemJSON = window.localStorage.getItem(localStorageKey);
  const itemLiteral = JSON.parse(itemJSON);

  if (!itemLiteral) {
    console.log(`Could not find localStorage data for ${localStorageKey}!`);
    return null;
  }

  console.log(`loading ${itemLiteral.title}`);

  // recursively load all children
  const children = itemLiteral.children.map((childID) => load(childID));

  itemLiteral.children = children;

  let ItemConstructor;
  switch (itemLiteral.Type) {
    case 'Task':
      ItemConstructor = Task;
      break;
    case 'Project':
      ItemConstructor = Project;
      break;
    case 'Directory':
      ItemConstructor = Directory;
      break;
    default:
      console.log(`Did not find valid type for ${itemLiteral.title}`);
      ItemConstructor = ModelBase;
      break;
  }
  return new ItemConstructor(itemLiteral);
};

const saveLocal = { save, load, remove };

export default saveLocal;
