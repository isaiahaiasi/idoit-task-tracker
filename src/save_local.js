import ModelBase from './model/modelBase';
import Task from './model/task';
import Project from './model/project';
import Directory from './model/directory';
import defaultData from './demo_dir.json';

const _getConstructor = (saveableItemLiteral) => {
  // This is so annoying, because I feel like I'm close to being class-agnostic
  switch (saveableItemLiteral.Type) {
    case 'Task':
      return Task;
    case 'Project':
      return Project;
    case 'Directory':
      return Directory;
    default:
      console.log(`Did not find valid type for ${saveableItemLiteral.title}`);
      return ModelBase;
  }
};

const _assignNestedObj = (saveableItem) => {
  if (!saveableItem || !saveableItem.children) {
    console.error('Tried to load invalid object.');
    return null;
  }

  const children = saveableItem.children.map((child) => _assignNestedObj(child));
  const Constructor = _getConstructor(saveableItem);

  // I feel like using the spread operator to override properties
  //  PROBABLY isn't best practice, but idk... seems okay?
  return new Constructor({ ...saveableItem, children });
};

const _loadNestedObj = (ID) => {
  const item = JSON.parse(window.localStorage.getItem(ID));

  if (!item) {
    console.warn(`Could not find localStorage data for ${ID}!`);
    return null;
  }

  const children = item.children.length > 0
    ? item.children.map((childID) => _loadNestedObj(childID))
    : [];

  return { ...item, children };
};

const load = (localStorageKey) => {
  const nestedObj = _loadNestedObj(localStorageKey);

  if (!nestedObj) {
    return null;
  }

  return _assignNestedObj(nestedObj);
};

const loadDefault = () => {
  console.log(defaultData);
  return _assignNestedObj(defaultData);
};

// remove a localStorage key (ie, when the referenced obj is deleted)
const remove = (saveableItem) => {
  console.log(`removing ${saveableItem.title} from localStorage`);
  saveableItem.children.forEach((child) => remove(child));
  window.localStorage.removeItem(saveableItem.getID());
};

// save an item in localstorage at its ID's location
const save = (saveableItem) => {
  console.log(`saving ${saveableItem.title}`);
  const dirJSON = JSON.stringify(saveableItem.getSerializable());
  window.localStorage.setItem(saveableItem.getID(), dirJSON);
};

const saveLocal = {
  save, load, loadDefault, remove,
};

export default saveLocal;
