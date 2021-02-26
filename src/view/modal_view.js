// ! The current implementation does NOT allow for passing validation errors
// * params:
//   - CONSTRUCTOR for the modal content
//   - METHOD to attach to button
//     - takes the modal content *element* as param
//     - returns: true/false whether to close the modal (for validation)
//   - OPTIONS: an object with optional properties:
//     - init: a function that is run to perform any modal initialization logic
//     - titleText: replaces the default title text
//     - btnText: replaces the default submit button text
//     TODO: options for more buttons??
// * returns: the function that opens the modal

const ModalView = (ModalConstructor, submitFunc, options) => {
  const modalTemplates = document.querySelector('#modal-templates').content;
  const modal = modalTemplates.querySelector('.modal').cloneNode(true);

  let modalContentView = ModalConstructor();

  const resetModalContent = () => {
    modalContentView = ModalConstructor();
  };

  modal.querySelector('.modal-content').appendChild(modalContentView.node);

  if (options && options.init) {
    options.init(modalContentView);
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
    if (submitFunc(modalContentView)) {
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
