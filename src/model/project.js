class Project {
  constructor(title, description, tasks = []) {
    this.title = title;
    this.description = description;
    this.tasks = tasks;
  }

  addTask(...aTasks) {
    aTasks.forEach((task) => this.tasks.push(task));
  }

  removeTask(...rTasks) {
    rTasks.forEach((task) => {
      const taskIndex = this.tasks.indexOf(task);

      // ERROR HANDLING
      if (taskIndex < 0) {
        console.error(`Tried to remove ${task.title} from ${this.title}`
          + ' but the project does not contain this task!');
        return;
      }

      this.tasks.splice(this.tasks.indexOf(task), 1);
    });
  }
}

export { Project as default };
