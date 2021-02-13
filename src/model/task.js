class Task {
  constructor(title, description, dueDate, priority, project) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.project = project;
    this.isComplete = false;
  }

  setIsComplete(value) {
    this.isComplete = value;
    // console.log(`${this.title}: is ${this.isComplete ? '' : 'not '}complete`);
  }

  delete() {
    const projectTaskList = this.project.tasks;
    if (!projectTaskList) {
      console.error(`Could not find task list to remove ${this.title} from.`);
      return;
    }
    projectTaskList.remove(projectTaskList.indexOf(this));
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
    const rDay = Math.floor(Math.random() * 30);
    const rYear = 2021;
    return `${rMonth}/${rDay}/${rYear}`;
  };

  function getMockTask(project) {
    return new Task(
      _getRandom(_testTitles),
      _getRandom(_testDescriptions),
      _getRandomDate(),
      _getRandom(priorities),
      project,
    );
  }

  function getMockTasks(num, project) {
    const mocks = [];
    for (let i = 0; i < num; i += 1) {
      mocks.push(getMockTask(project));
    }
    return mocks;
  }

  return { getMockTask, getMockTasks };
}());

export { Task as default, taskMock, priorities };
