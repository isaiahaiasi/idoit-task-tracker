// ! The current implementation does NOT allow for passing validation errors
// * params:
//   - SELECTOR for modal content element (should be in 'modal' template)
//   - METHOD to attach to button
//     - takes the modal content *element* as param
//     - returns: true/false whether to close the modal (for validation)
//   - OPTIONS: an object with optional properties:
//     - init: a function that is run to perform any modal initialization logic
//     - titleText: replaces the default title text
//     - btnText: replaces the default submit button text
//     TODO: options for more buttons??
// * returns: the function that opens the modal

const ModalView = (templateContentSelector, submitFunc, options) => {
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

  if (options && options.init) {
    options.init(modalContent);
  }

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

  const closeBtn = modal.querySelector('.delete-btn');
  const bg = modal.querySelector('.modal-bg');
  const closeListeners = [closeBtn, bg];
  closeListeners.forEach((el) => {
    el.addEventListener('click', closeModal);
  });

  return { openModal };
};

export default ModalView;
