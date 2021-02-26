//! Pretty sure this is pointless :shrug:
import ModelBase from './modelBase';

class Directory extends ModelBase {
  constructor({ title, children }) {
    super({ title, children });
    this.stateUpdated();
  }

  // eslint-disable-next-line class-methods-use-this
  getID() {
    return 'DIRECTORY';
  }
}

export default Directory;
