import ModelBase from './modelBase';

class Directory extends ModelBase {
  constructor({ title, children }) {
    super({ title, children });
    // Todo: Find way to selectively disable minification,
    //  so I can use reflection to grab 'Type'
    this.Type = 'Directory';
    this.stateUpdated();
  }

  // eslint-disable-next-line class-methods-use-this
  getID() {
    return 'DIRECTORY';
  }
}

export default Directory;
