//* View modules
//* Parent view (provides prototype methods for the other views)
//  - not actually sure what should go here, yet...

//* Task View
//  - simple view
//  - expanded view
// pass in the task properties I care about w destructuring??
const viewTask = ({ title, description }, parentContainer) => {
  const container = document.querySelector('#taskTemplate');
  const _renderSimple = () => {
    // Clear existing container
    // Add title & description properties
  };
};

//* Project View
//  - contains list of Task Views

//* Sidebar View
//  - contains list of all Projects

export { viewTask as default };
