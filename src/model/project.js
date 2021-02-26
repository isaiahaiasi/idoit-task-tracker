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
      description: this.description,
    };
  }

  makeView() {
    return ProjectView(this);
  }

  sort() {
    this.children.sort((a, b) => {
      if (a.isComplete) {
        return 1;
      }

      if (b.isComplete) {
        return -1;
      }

      // TODO: index priorities by "value"
      if ((a.priority === 'high' && b.priority !== 'high')
        || (a.priority === 'medium' && b.priority === 'low')) {
        return -1;
      }

      return 1;
    });
  }
}

export { Project as default };
