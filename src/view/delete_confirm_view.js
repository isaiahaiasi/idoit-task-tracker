export default function DeleteConfirmationView() {
  const modalTemplates = document.querySelector('#modal-templates').content;
  const node = modalTemplates.querySelector('.confirmation-form').cloneNode(true);

  return { node };
}
