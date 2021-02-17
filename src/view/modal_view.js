// params:
//   - selector for modal content element (should be in 'modal' template)
//   - method to attach to button (which takes the modal content element as param)
// return a function that creates the modal
const ModalView = (templateContentSelector, submitFunc) => {
  const modalTemplates = document.querySelector('#modal-templates').content;
  const modal = modalTemplates.querySelector('modal').cloneNode(true);

  let modalContent = modalTemplates.querySelector(templateContentSelector)
    .querySelector.content.cloneNode(true);

  const resetModalContent = () => {
    modalContent = modalTemplates
      .querySelector(templateContentSelector)
      .cloneNode(true);
  };

  const openModal = () => {
    document.body.appendChild(modal);
  };

  const closeModal = () => {
    modal.remove();
    resetModalContent();
  };

  const submitBtn = modal.querySelector('.submit-btn');
  submitBtn.addEventListener('click', () => {
    submitFunc(modalContent);
    closeModal();
  });

  return openModal;
};

export default ModalView;
