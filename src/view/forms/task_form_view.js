import { format as dateFormat } from 'date-fns';

// Serves as both "Add Task" & "Edit Task" forms
export default function TaskForm() {
  const modalTemplates = document.querySelector('#modal-templates').content;
  const node = modalTemplates.querySelector('.add-task-form').cloneNode(true);

  // initialize min date
  const dateInput = node.querySelector('input[type="date"]');
  dateInput.min = dateFormat(new Date(), 'yyyy-MM-dd');

  // Sets the form fields based on the properties of a given task
  const set = (task) => {
    const title = node.querySelector('.modal-title');
    title.textContent = 'Edit task';
    const submitBtn = node.querySelector('.submit-btn');
    submitBtn.textContent = 'Save task';

    const modTitle = node.querySelector('input[name="task-title"]');
    const modDescription = node.querySelector('input[name="task-description"]');
    const modPriority = node.querySelector('select[name="task-priority"]');
    const modFormDate = node.querySelector('input[name="task-due-date"]');

    modTitle.value = task.title;
    modDescription.value = task.description;
    modPriority.value = task.priority;
    if (task.dueDate != null) {
      // Date needs to be formatted in a precise way or it will not set
      modFormDate.value = dateFormat(task.dueDate, 'yyyy-MM-dd');
    }
  };

  // Returns an object w the new task properties
  const get = () => {
    const title = node.querySelector('input[name="task-title"]');
    const description = node.querySelector('input[name="task-description"]').value;
    const priority = node.querySelector('select[name="task-priority"]').value;

    const formDate = node.querySelector('input[name="task-due-date"]')
      .value
      .split('-');
    const dueDate = (formDate[0] && formDate[1] && formDate[2])
      ? new Date(formDate[0], formDate[1] - 1, formDate[2])
      : null;

    // Validation
    const titleValidation = node.querySelector('.field-validation[for="task-title"]');
    title.addEventListener('input', () => titleValidation.classList.remove('reveal'));

    if (!title.value) {
      titleValidation.classList.add('reveal');
      return null;
    }

    return {
      title: title.value, description, priority, dueDate,
    };
  };

  return { get, set, node };
}
