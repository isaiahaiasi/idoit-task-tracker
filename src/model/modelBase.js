import EventHandler from '../events';

const eventTokens = {
  onStateUpdate: 'onStateUpdate',
};

class ModelBase {
  constructor(title, children = []) {
    this.title = title;
    this.children = children;

    this.events = EventHandler();
    this.events.publish(eventTokens.onStateUpdate);

    this.children.forEach(this.subscribeToChildStateChange, this);
  }

  makeView() {
    console.error(`${this.title} has not implemented its makeView method!`);
  }

  stateUpdated() {
    this.events.invoke(eventTokens.onStateUpdate);
  }

  subscribeToChildStateChange(child) {
    child.events.subscribe(eventTokens.onStateUpdate, () => this.stateUpdated());
  }

  addChild(..._children) {
    _children.forEach((child) => {
      this.subscribeToChildStateChange(child);
      this.children.push(child);
    });

    this.stateUpdated();
  }

  deleteChild(..._children) {
    if (this.children.length < 1) {
      console.error(`Tried to delete a child of ${this.title}, but it doesn't have any children!`);
      return;
    }

    _children.forEach((child) => {
      const taskIndex = this.children.indexOf(child);

      if (taskIndex < 0) {
        console.error(`Tried to remove ${child.title} from ${this.title}`
          + ' but the project does not contain this task!');
        return;
      }

      this.children.splice(this.children.indexOf(child), 1);
    });

    this.stateUpdated();
  }
}

export default ModelBase;
export { eventTokens };
