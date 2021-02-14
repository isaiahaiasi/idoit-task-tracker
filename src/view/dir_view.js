import { removeAllChildren } from './view_utils';
import ProjectView from './project_view';

const ProjectPreview = (project, projectViewContainer) => {
  const projectPreviewTemplate = document.querySelector('#project-preview-template');
  const node = projectPreviewTemplate.content
    .querySelector('.project-preview')
    .cloneNode(true);
  node.querySelector('._title').textContent = project.title;

  const activateProjectView = () => {
    removeAllChildren(projectViewContainer);
    const projectView = ProjectView(project);
    projectViewContainer.appendChild(projectView.node);
    projectView.render();
  };

  node.addEventListener('click', activateProjectView);

  return { node, activateProjectView };
};

// Directory (collection of projects, displayed in sidebar)
const DirectoryView = (projects, projectViewContainer) => {
  const template = document.querySelector('#sidebar-template');
  const node = template.content.querySelector('.sidebar').cloneNode(true);
  const projectPreviews = [];
  projects.forEach((project) => {
    const projectPreview = ProjectPreview(project, projectViewContainer);
    node.appendChild(projectPreview.node);
    projectPreviews.push(projectPreview);
  });

  projectPreviews[0].activateProjectView();
  return { node };
};

export { DirectoryView as default };
