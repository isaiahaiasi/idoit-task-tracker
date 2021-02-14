import ModelBase from './modelBase';
import ProjectView from '../view/project_view';

class Project extends ModelBase {
  constructor(title, parent, description, tasks = []) {
    super(title, parent, tasks);
    this.description = description;
  }

  makeView() {
    return ProjectView(this);
  }
}

export { Project as default };
