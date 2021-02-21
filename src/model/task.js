import ModelBase from './modelBase';
import TaskView from '../view/task_view';

class Task extends ModelBase {
  constructor(title, description, dueDate, priority) {
    super(title);
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.isComplete = false;
  }

  makeView() {
    return TaskView(this);
  }

  setIsComplete(value) {
    this.isComplete = value;
    // console.log(`${this.title} is ${this.isComplete ? '' : 'not '}complete`);
  }

  setTitle(title) {
    this.title = title;
  }

  setDescription(description) {
    this.description = description;
  }

  setDueDate(dueDate) {
    if (!dueDate) {
      this.dueDate = null;
    } else {
      this.dueDate = dueDate;
    }
  }

  setPriority(priority) {
    this.priority = priority;
  }
}

const priorities = Object.freeze([
  'low',
  'medium',
  'high',
]);

const taskMock = (function taskMock() {
  const _testTitles = [
    'Wash the dog',
    'Learn Sass',
    'Do the dishes',
    'Change the sheets',
    'Learn React',
    'Learn .net core',
    'Clean the living room',
    'Finish Crash Landing Interface',
    'Overthrow the bourgeousie',
    'Write stirring defense of semicolons',
    'Listen to Syntax',
    'Practice scales on guitar',
  ];

  const _testDescriptions = [
    'Description description description description',
    'lorem ipsum fkeafek aofeka fokea pfke pafk eapof ea',
  ];

  const _getRandom = (list) => list[Math.floor(Math.random() * list.length)];

  const _getRandomDate = () => {
    const rMonth = Math.floor(Math.random() * 12);
    const rDay = Math.floor(Math.random() * 30 + 1);
    const rYear = 2021;
    const newDate = new Date(rYear, rMonth, rDay);
    return newDate;
  };

  function getMockTask() {
    return new Task(
      _getRandom(_testTitles),
      _getRandom(_testDescriptions),
      _getRandomDate(),
      _getRandom(priorities),
    );
  }

  function getMockTasks(num) {
    const mocks = [];
    for (let i = 0; i < num; i += 1) {
      mocks.push(getMockTask());
    }
    return mocks;
  }

  return { getMockTask, getMockTasks };
}());

export { Task as default, taskMock, priorities };
