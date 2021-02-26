//* STYLE IMPORTS
import './styles/reset.css';
import './styles/style.css';

//* VIEW IMPORTS
import DirectoryView from './view/dir_view';

//* SAVE/LOAD IMPORTS
import saveLocal from './save_local';
import SaveHandler from './save_handler';

// SAVE HANDLING
const saveHandler = SaveHandler(saveLocal);

const directory = saveHandler.handleLoad('DIRECTORY') ?? saveLocal.loadDefault();

// POPULATING DOM
const projViewCntr = document.querySelector('.projects-container');

const sideBar = DirectoryView(directory, projViewCntr);

document.querySelector('.sidebar-container').appendChild(sideBar.node);
