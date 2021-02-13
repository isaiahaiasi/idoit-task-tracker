class Project {
  constructor(title, description, tasks = []) {
    this.title = title;
    this.description = description;
    this.tasks = tasks;
  }

  addTask(...tasks) {
    tasks.forEach((task) => this.tasks.push(task));
  }
}

export { Project as default };
