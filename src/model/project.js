import ModelBase from './modelBase';
import ProjectView from '../view/project_view';

class Project extends ModelBase {
  constructor(title, description, children = []) {
    super(title, children);
    this.description = description;
  }

  makeView() {
    return ProjectView(this);
  }
}

export { Project as default };
