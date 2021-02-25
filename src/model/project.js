import ModelBase from './modelBase';
import ProjectView from '../view/project_view';

class Project extends ModelBase {
  constructor({
    title, description, children = [], id,
  }) {
    super({ title, children, id });
    this.description = description;
    this.stateUpdated();
  }

  getSerializable() {
    return {
      ...super.getSerializable(),
      Type: 'Project',
      description: this.description,
    };
  }

  makeView() {
    return ProjectView(this);
  }
}

export { Project as default };
