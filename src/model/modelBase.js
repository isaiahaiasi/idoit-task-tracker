import EventHandler, { globalEvents } from '../events';
import setID from '../getID';

const eventTokens = {
  onStateUpdate: 'onStateUpdate',
  onItemDelete: 'onItemDelete',
};

class ModelBase {
  constructor({ title, id = setID(), children = [] }) {
    this.id = id;
    this.title = title;
    this.children = children;

    this.events = EventHandler();
    // this.events.publish(eventTokens.onStateUpdate);
  }

  getID() {
    return this.id;
  }

  // Return an object with only serializable state,
  // & with child IDs instead of full children
  getSerializable() {
    return {
      Type: this.constructor.name,
      id: this.id,
      title: this.title,
      children: this.children.map((child) => child.getID()),
    };
  }

  makeView() {
    console.error(`${this.title} has not implemented its makeView method!`);
  }

  stateUpdated() {
    // this.events.invoke(eventTokens.onStateUpdate, this);
    globalEvents.invoke(eventTokens.onStateUpdate, this);
  }

  addChild(..._children) {
    _children.forEach((child) => {
      this.children.push(child);
    });

    this.stateUpdated();
  }

  deleteChild(..._children) {
    if (this.children.length < 1) {
      console.warn(`Tried to delete a child of ${this.title}, but it has no children!`);
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

      globalEvents.invoke(eventTokens.onItemDelete, child);
    });

    this.stateUpdated();
  }
}

export default ModelBase;
export { eventTokens };
