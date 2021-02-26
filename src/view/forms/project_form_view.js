export default function ProjectForm() {
  const modalTemplates = document.querySelector('#modal-templates').content;
  const node = modalTemplates.querySelector('.add-project-form').cloneNode(true);

  const get = () => {
    const title = node.querySelector('input[name="project-title"]');
    const description = node.querySelector('input[name="project-description"]');

    const titleValidation = node.querySelector('.field-validation[for="project-title"]');
    title.addEventListener('input', () => titleValidation.classList.remove('reveal'));

    if (!title.value) {
      titleValidation.classList.add('reveal');
      return false;
    }

    return { title: title.value, description: description.value };
  };

  return { get, node };
}
