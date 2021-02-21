import ModelBase from './modelBase';
import ProjectView from '../view/project_view';

class Project extends ModelBase {
  constructor(title, description, tasks = []) {
    super(title, tasks);
    this.description = description;
  }

  makeView() {
    return ProjectView(this);
  }
}

export { Project as default };
