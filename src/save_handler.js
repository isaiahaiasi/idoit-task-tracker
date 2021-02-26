import { eventTokens } from './model/modelBase';
import { globalEvents } from './events';

// Just takes an object with save, load, remove methods
const SaveHandler = ({ save, load, remove }) => {
  const handleLoad = load;

  const handleSave = (saveableItem) => {
    save(saveableItem);
  };

  globalEvents.publish(eventTokens.onStateUpdate);
  globalEvents.subscribe(eventTokens.onStateUpdate, handleSave);

  globalEvents.publish(eventTokens.onItemDelete);
  globalEvents.subscribe(eventTokens.onItemDelete, remove);

  return { handleLoad };
};

export default SaveHandler;
