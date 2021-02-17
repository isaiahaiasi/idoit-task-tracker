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
  const projectPreviews = [];

  // called on projectPreview.node.onClick
  const _selectItem = (itemPreview) => {
    projectPreviews.forEach((pv) => {
      pv.deselect();
    });

    itemPreview.select();
  };

  itemModels.forEach((itemModel) => {
    const projectPreview = DirectoryItem(itemModel, contentContainer);
    node.appendChild(projectPreview.node);
    projectPreviews.push(projectPreview);

    projectPreview.node.addEventListener('click', () => {
      _selectItem(projectPreview);
    });
  });

  projectPreviews[0].select();
  return { node };
};

export default DirectoryView;
