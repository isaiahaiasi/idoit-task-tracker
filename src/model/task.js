class Task {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}

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

  const _testDescriptions = [];

  const _priorities = [
    'high',
    'medium',
    'low',
  ];

  const _getRandom = (list) => list[Math.floor(Math.random() * list.length)];

  const _getRandomDate = () => {
    const rMonth = Math.floor(Math.random() * 12);
    const rDay = Math.floor(Math.random() * 30);
    const rYear = 2021;
    return `${rMonth}/${rDay}/${rYear}`;
  };

  function getTestTask() {
    return new Task(
      _getRandom(_testTitles),
      _getRandom(_testDescriptions),
      _getRandomDate(),
      _getRandom(_priorities),
    );
  }

  return { getTestTask };
}());

export { Task as default, taskMock };
