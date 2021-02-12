class project {
  constructor(title, description, tasks = []) {
    this.title = title;
    this.description = description;
    this.tasks = tasks;
  }
}

export { project as default };
