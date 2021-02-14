# Naming standards
CSS classes that are just identifiers for plugging variables into, have an underscore prefix. Eg, to grab the element that should contain a task's title, I want can use myTaskView.querySelector('._title')

# MODEL
## Project
- title
- description
- list of tasks

## Task
- title
- description
- due date
- priority

# VIEW
## Task (simple)
- ### Displays
  - Task title
  - Task priority
  - Task due date
- ### Inputs
  - Mark complete
  - Delete
  - Expand
  - Sort
## Task (details)
- ### Displays
  - Task title
  - Task description
  - Task priority
  - Task due date
- ### Inputs
  - Mark complete
  - Shrink
  - Edit
  - Delete
