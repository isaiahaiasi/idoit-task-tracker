class Task {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}

function getTestTask() {
  return new Task(
    'my title',
    'my description yadda yadda yadda',
    '3/1/21',
    'high',
  );
}

export { Task as default, getTestTask };
