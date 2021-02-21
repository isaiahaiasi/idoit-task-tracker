import Project from '../model/project';
import ModalView from './modal_view';

// ! Currently, this isn't doing a good job of separating DOM & logic,
// ! B/c this "view" is where I'm storing all my projects
// Tab for each project
const DirectoryItem = (itemModel, contentContainer) => {
  const projectPreviewTemplate = document.querySelector('#item-preview-template');
  const itemView = itemModel.makeView();

  const node = projectPreviewTemplate.content
    .querySelector('.item-preview')
    .cloneNode(true);
  node.querySelector('._title').textContent = itemModel.title;

  const select = () => {
    contentContainer.appendChild(itemView.node);
    itemView.render();
    node.classList.add('selected');
  };

  const deselect = () => {
    itemView.node.remove();
    node.classList.remove('selected');
  };

  return { node, select, deselect };
};

// Directory (collection of projects, displayed in sidebar)
const DirectoryView = (itemModels, contentContainer) => {
  const template = document.querySelector('#sidebar-template');
  const node = template.content.querySelector('.sidebar').cloneNode(true);
  let projectPreviews = [];

  // called on projectPreview.node.onClick
  const _selectItem = (itemPreview) => {
    projectPreviews.forEach((pv) => {
      pv.deselect();
    });

    itemPreview.select();
  };

  const _clearItems = () => {
    projectPreviews.forEach((item) => {
      item.deselect();
      item.node.remove();
    });
    projectPreviews = [];
  };

  const _render = () => {
    _clearItems();
    itemModels.forEach((itemModel) => {
      const projectPreview = DirectoryItem(itemModel, contentContainer);
      node.appendChild(projectPreview.node);
      projectPreviews.push(projectPreview);

      projectPreview.node.addEventListener('click', () => {
        _selectItem(projectPreview);
      });
    });

    // ! TEMP
    projectPreviews[0].select();
    // (should track which index is active for re-rendering)
  };

  const _addItem = (item) => {
    itemModels.push(item);
    _render();
  };

  const _handleProjectForm = (form) => {
    const title = form.querySelector('input[name="project-title"]').value;
    const description = form.querySelector('input[name="project-description"]').value;

    // Validate form input
    if (title === '') {
      return false;
    }

    const newProject = new Project(title, description);
    _addItem(newProject);
    return true;
  };

  const addTaskBtn = node.querySelector('.add-project-btn');
  addTaskBtn.addEventListener('click', () => {
    ModalView('.add-project-form', _handleProjectForm).openModal();
  });

  _render();

  return { node };
};

export default DirectoryView;
