import Project from '../model/project';
import ModalView from './modal_view';
import ProjectForm from './forms/project_form_view';
import DeleteConfirmationView from './delete_confirm_view';

// Tab for each project
const DirectoryItem = (itemModel, contentContainer) => {
  const projectPreviewTemplate = document.querySelector('#item-preview-template');
  const itemView = itemModel.makeView();

  const node = projectPreviewTemplate.content
    .querySelector('.item-preview')
    .cloneNode(true);
  node.querySelector('._title').textContent = itemModel.title;

  const deleteBtn = node.querySelector('.delete-btn');

  const select = () => {
    contentContainer.appendChild(itemView.node);
    itemView.render();
    node.classList.add('selected');
  };

  const deselect = () => {
    itemView.node.remove();
    node.classList.remove('selected');
  };

  return {
    node, select, deselect, deleteBtn, itemModel,
  };
};

// Directory (collection of projects, displayed in sidebar)
const DirectoryView = (directory, contentContainer) => {
  const template = document.querySelector('#sidebar-template');
  const node = template.content.querySelector('.sidebar').cloneNode(true);
  let projectPreviews = [];
  let selectedItem = directory.children[0];

  // called on projectPreview.node.onClick
  const _selectItem = (itemPreview) => {
    projectPreviews.forEach((pv) => {
      pv.deselect();
    });

    itemPreview?.select();
    selectedItem = itemPreview?.itemModel;
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
    directory.children.forEach((itemModel) => {
      const projectPreview = DirectoryItem(itemModel, contentContainer);
      node.appendChild(projectPreview.node);
      projectPreviews.push(projectPreview);

      projectPreview.node.addEventListener('click', () => {
        _selectItem(projectPreview);
      });

      projectPreview.deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // b/c the btn's container has the above click event listener
        ModalView(DeleteConfirmationView, () => {
          directory.deleteChild(itemModel);
          _render();
          return true;
        }).openModal();
      });
    });

    // Preserves the selected project when projectPreviews cleared, or when index of proj changes.
    // If selected proj no longer exists, default to first index
    _selectItem(
      projectPreviews.find((pv) => pv.itemModel === selectedItem)
      ?? projectPreviews[0],
    );
  };

  const _addItem = (item) => {
    directory.addChild(item);
    _render();
  };

  const _handleProjectForm = (form) => {
    const formValues = form.get();

    if (!formValues) {
      return false;
    }

    _addItem(new Project(formValues));
    return true;
  };

  const addTaskBtn = node.querySelector('.add-project-btn');
  addTaskBtn.addEventListener('click', () => {
    ModalView(ProjectForm, _handleProjectForm).openModal();
  });

  _render();

  return { node };
};

export default DirectoryView;
