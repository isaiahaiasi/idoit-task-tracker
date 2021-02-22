import { eventTokens } from './model/modelBase';

// Just takes a save method, & an object w an eventhandler
const SaveHandler = ({ save, load }, directory) => {
  const events = directory?.events;
  const handleSave = () => {
    save(directory);
    console.log('saved');
  };
  const handleLoad = load;

  if (!events) {
    console.warn('Save handler was passed an invalid object:');
    console.warn('no events property!');
    return null;
  }

  // listen for any state being updated, save when event invoked
  const startListening = () => {
    if (!events.subscribe(eventTokens.onStateUpdate, handleSave)) {
      console.warn('Save handler was passed an invalid object:');
      console.warn(`Couldn't subscribe to its ${eventTokens.onStateUpdate} event!`);
    }
  };

  // Stop listening to save event
  const stopListening = () => {
    events.unsubscribe(eventTokens.onStateUpdate, save);
  };

  return { startListening, stopListening, handleLoad };
};

export default SaveHandler;
