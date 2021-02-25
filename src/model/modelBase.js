import EventHandler from '../events';
import setID from '../getID';

const eventTokens = {
  onStateUpdate: 'onStateUpdate',
};

class ModelBase {
  constructor({ title, id = setID(), children = [] }) {
    this.id = id;
    this.title = title;
    this.children = children;

    this.events = EventHandler();
    this.events.publish(eventTokens.onStateUpdate);

    this.children.forEach(this.subscribeToChildStateChange, this);
  }

  getID() {
    return this.id;
  }

  // Return an object with only serializable state, & with child IDs instead of full children
  getSerializable() {
    // const children = this.children.map((child) => child.id);
    return {
      id: this.id,
      title: this.title,
      // ! TEMP: I want to be able to save instances individually,
      // TODO: ... so this should map to child.id instead
      children: this.children.map((child) => child.getSerializable()),
    };
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
