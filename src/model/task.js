import ModelBase from './modelBase';
import TaskView from '../view/task_view';

class Task extends ModelBase {
  constructor({
    title, description, dueDate, priority, id, isComplete = false,
  }) {
    super({ title, id });
    this.Type = 'Task';
    this.description = description;
    this.priority = priority;
    this.isComplete = isComplete;
    this.dueDate = dueDate ? new Date(dueDate) : null;
    this.stateUpdated();
  }

  getSerializable() {
    return {
      ...super.getSerializable(),
      description: this.description,
      dueDate: this.dueDate,
      priority: this.priority,
      isComplete: this.isComplete,
    };
  }

  makeView() {
    return TaskView(this);
  }

  setState({
    title, description, dueDate, priority, isComplete,
  }) {
    this.title = title ?? this.title;
    this.description = description ?? this.description;
    this.priority = priority ?? this.priority;
    this.isComplete = isComplete ?? this.isComplete;

    // null is ok, just not undefined
    if (dueDate !== undefined) {
      this.dueDate = dueDate;
    }

    this.stateUpdated();
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
    return new Task({
      title: _getRandom(_testTitles),
      description: _getRandom(_testDescriptions),
      dueDate: _getRandomDate(),
      priority: _getRandom(priorities),
    });
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
