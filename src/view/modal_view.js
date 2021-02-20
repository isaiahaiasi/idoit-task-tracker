// params:
//   - selector for modal content element (should be in 'modal' template)
//   - method to attach to button
//     - takes the modal content *element* as param
//     - returns: true/false whether to close the modal (for validation)
// returns: the function that opens the modal
// ! This method does NOT allow for passing validation errors
const ModalView = (templateContentSelector, submitFunc) => {
  const modalTemplates = document.querySelector('#modal-templates').content;
  const modal = modalTemplates.querySelector('.modal').cloneNode(true);

  let modalContent;

  const resetModalContent = () => {
    modalContent = modalTemplates
      .querySelector(templateContentSelector)
      .cloneNode(true);
  };
  resetModalContent();

  modal.querySelector('.modal-content').appendChild(modalContent);

  const openModal = () => {
    document.body.appendChild(modal);
  };

  const closeModal = () => {
    modal.remove();
    resetModalContent();
  };

  const submitBtn = modal.querySelector('.submit-btn');
  submitBtn.addEventListener('click', () => {
    if (submitFunc(modalContent)) {
      closeModal();
    }
  });

  const closeBtn = modal.querySelector('.close-btn');
  closeBtn.addEventListener('click', closeModal);

  return { openModal };
};

export default ModalView;
