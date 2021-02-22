import { format as dateFormat } from 'date-fns';
import ModalView from './modal_view';

const taskView = (task, project) => {
  const template = document.querySelector('#task-template');
  const taskTemplate = template.content.querySelector('.task');
  const node = taskTemplate.cloneNode(true);
  const expandBtn = node.querySelector('.task-expand-btn');

  let _hideWhenComplete = false;

  const _deleteTask = () => {
    project.deleteChild(task);
    node.remove();
    return true;
  };

  const _updateHiddenState = () => {
    if (_hideWhenComplete && task.isComplete) {
      node.classList.add('hidden');
    } else {
      node.classList.remove('hidden');
    }
  };

  const setHideOnComplete = (bool) => {
    _hideWhenComplete = bool;
    _updateHiddenState();
  };

  const render = () => {
    node.querySelector('._title').textContent = task.title;
    node.querySelector('._priority').textContent = task.priority;
    node.querySelector('._description').textContent = task.description;
    if (task.dueDate != null) {
      node.querySelector('._due-date').textContent = dateFormat(task.dueDate, 'MM/dd/yyyy');
    } else {
      node.querySelector('._due-date').textContent = '';
    }
  };

  const _initListeners = () => {
    const isCompleteCheckbox = node.querySelector('.task-is-complete');
    isCompleteCheckbox.checked = task.isComplete;
    _updateHiddenState();
    isCompleteCheckbox.addEventListener('change', () => {
      task.setState({ isComplete: isCompleteCheckbox.checked });
      _updateHiddenState();
    });

    const deleteBtn = node.querySelector('.delete-btn');

    deleteBtn.addEventListener('click', () => {
      ModalView('.confirmation-form', _deleteTask).openModal();
    });
  };

  const toggleExpanded = (bool) => {
    if (bool === undefined) {
      node.classList.toggle('task-expanded');
      node.classList.toggle('selected');
    } else if (bool === true) {
      node.classList.add('task-expanded');
      node.classList.add('selected');
    } else {
      node.classList.remove('task-expanded');
      node.classList.remove('selected');
    }
  };

  const _handleEditTask = (form) => {
    const title = form.querySelector('input[name="task-title"]').value;
    const description = form.querySelector('input[name="task-description"]').value;
    const priority = form.querySelector('select[name="task-priority"]').value;

    const formDate = form.querySelector('input[name="task-due-date"]')
      .value
      .split('-');
    const dueDate = formDate
      ? new Date(formDate[0], formDate[1] - 1, formDate[2])
      : null;

    // Validation
    if (!title) {
      return false;
    }

    task.setState({
      title, description, priority, dueDate,
    });

    render();

    return true;
  };

  const _initEditTaskButton = () => {
    const editTaskBtn = node.querySelector('.task-edit-btn');
    editTaskBtn.addEventListener('click', () => {
      const options = {
        init: (modalContent) => {
          const title = modalContent.querySelector('.modal-title');
          title.textContent = 'Edit task';
          const submitBtn = modalContent.querySelector('.submit-btn');
          submitBtn.textContent = 'Save task';

          const modTitle = modalContent.querySelector('input[name="task-title"]');
          const modDescription = modalContent.querySelector('input[name="task-description"]');
          const modPriority = modalContent.querySelector('select[name="task-priority"]');
          const modFormDate = modalContent.querySelector('input[name="task-due-date"]');

          modTitle.value = task.title;
          modDescription.value = task.description;
          modPriority.value = task.priority;
          if (task.dueDate != null) {
            // Date needs to be formatted in a precise way or it will not set
            modFormDate.value = dateFormat(task.dueDate, 'yyyy-MM-dd');
          }
        },
      };

      ModalView('.add-task-form', _handleEditTask, options).openModal();
    });
  };

  _initEditTaskButton();

  _initListeners();
  render();

  return {
    node, task, setHideOnComplete, render, toggleExpanded, expandBtn,
  };
};

export default taskView;
