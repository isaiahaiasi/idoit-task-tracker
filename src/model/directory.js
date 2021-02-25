//! Pretty sure this is pointless :shrug:
import ModelBase from './modelBase';

class Directory extends ModelBase {
  constructor({ title, children }) {
    super({ title, children });
    this.stateUpdated();
  }

  getSerializable() {
    return {
      ...super.getSerializable(),
      Type: 'Directory',
    };
  }

  getID() {
    console.log(`${this.title} id: DIRECTORY`);
    return 'DIRECTORY';
  }
}

export default Directory;
