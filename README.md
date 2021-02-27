# i-do-it task tracker
The Odin Project: To-Do List

*Struggles with task management got you feeling dumb? Maybe you need IDOIT!*

[Use IDOIT here](https://isaiahaiasi.github.io/idoit-task-tracker/)

## Structure
In an effort to avoid over-engineering, I'm starting by basically implementing a "model-view-controller" structure without a controller. I'm pretty sure this means I **will** be doing a lot of refactoring, but the process of refactoring what MUST be refactored is probably a better learning experience than trying to predict what MIGHT ought to be refactored.

^ (for the record, I am NOT happy with this foolish person from the past!)

## Features
- Add and remove projects.
- Add, remove, and edit tasks.
- Optionally hide completed tasks.
- Expand tasks to view details, edit, or delete.
- Tasks will sort automatically whenever you add new ones or reopen the project.
- All your work is saved to localStorage as you do it.
- Minor CSS animations for many actions

## The Features that Weren't
- Still haven't dipped into Firebase
- No custom sorting via drag-n-drop, or sorting options
- No mobile support
- No dark mode
- Sidebar can't be hidden
- Can't view multiple projects side-by-side

## Reflection
(not the kind that broke my minified production build...)

I found this to be quite a difficult project (albeit, largely due to the poor planning outlined above). It's taken twice as long to complete as any of the other projects. There are a lot of things that could still be improved, but all the critical features are in place, and I think it's time to move on to new challenges.

**A few focus areas going forward:**
- Finding more succinct implementations of features. This isn't the first time my project has had 2x LOC of most other projects, and I feel like a lot of that extra bulk is spaghetti.
- Learning how to implement Object Oriented programming principles/SOLID/DRY/etc. These are a lot to get my head around, and will definitely take more than one messy project before things start to clean up. One thing to look into are standard design patterns, and which make sense to implement in JavaScript, and what those implementations might look like.
