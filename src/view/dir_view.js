import { removeAllChildren } from './view_utils';
import ProjectView from './project_view';

const DirectoryItem = (project, contentContainer) => {
  const projectPreviewTemplate = document.querySelector('#project-preview-template');
  const projectView = ProjectView(project);

  const node = projectPreviewTemplate.content
    .querySelector('.project-preview')
    .cloneNode(true);
  node.querySelector('._title').textContent = project.title;

  const select = () => {
    removeAllChildren(contentContainer);
    contentContainer.appendChild(projectView.node);
    projectView.render();
    node.classList.add('selected');
  };

  const deselect = () => {
    projectView.node.remove();
    node.classList.remove('selected');
  };

  return { node, select, deselect };
};

// Directory (collection of projects, displayed in sidebar)
const DirectoryView = (projects, contentContainer) => {
  const template = document.querySelector('#sidebar-template');
  const node = template.content.querySelector('.sidebar').cloneNode(true);
  const projectPreviews = [];

  // called on projectPreview.node.onClick
  const _selectItem = (projectPreview) => {
    projectPreviews.forEach((pv) => {
      pv.deselect();
    });

    projectPreview.select();
  };

  projects.forEach((project) => {
    const projectPreview = DirectoryItem(project, contentContainer);
    node.appendChild(projectPreview.node);
    projectPreviews.push(projectPreview);

    projectPreview.node.addEventListener('click', () => {
      _selectItem(projectPreview);
    });
  });

  projectPreviews[0].select();
  return { node };
};

export { DirectoryView as default };
