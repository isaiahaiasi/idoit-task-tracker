//* CUSTOM EVENT HANDLER
const CreateEventHandler = () => {
  const _events = new Map();

  // an event contains a name and a list of callbacks
  const _hasEvent = (eventName) => _events.has(eventName);

  // EVENT FACTORY
  const _createEvent = (eventName) => {
    const _listeners = [];

    const _containsListener = (listener) => _listeners.includes(listener);

    const getName = () => eventName;

    const addListener = (listener) => {
      if (_containsListener(listener)) {
        console.warn(`tried to add listener ${listener} to ${eventName}, but it was already subscribed!`);
        return false;
      }
      _listeners.push(listener);
      return true;
    };

    const removeListener = (listener) => {
      if (_containsListener(listener)) {
        console.warn(`tried to unsubscribe ${listener} from ${eventName}, but it isn't subscribed!`);
        return false;
      }
      _listeners.splice(_listeners.indexOf(listener), 1);
      return true;
    };

    const callListeners = (...args) => {
      if (_listeners.length < 1) {
        console.warn(`Tried to invoke ${eventName}, but it did not have any listeners!`);
        return false;
      }
      _listeners.forEach((listener) => listener(...args));
      return true;
    };

    return {
      getName, addListener, removeListener, callListeners, _listeners,
    };
  };

  const publish = (eventName) => {
    // functions to be called when the event is invoked
    if (_hasEvent(eventName)) {
      console.warn(`Tried to publish ${eventName} event, but that event already exists!`);
      return false;
    }
    _events.set(eventName, _createEvent(eventName));
    return true;
  };

  // call all subscribed functions
  const invoke = (eventName, ...args) => {
    if (!_hasEvent(eventName)) {
      console.warn(`Tried to invoke nonexistent event ${eventName}!`);
      return false;
    }
    _events.get(eventName).callListeners(...args);
    return true;
  };

  // If the event exists in _events, add these functions to its listeners
  const subscribe = (eventName, ...funcs) => {
    if (!_hasEvent(eventName)) {
      console.warn(`Tried to subscribe ${funcs[0]} to nonexistent event ${eventName}!`);
      return false;
    }

    let success = true;

    funcs.forEach((func) => {
      if (!_events.get(eventName).addListener(func)) {
        success = false;
      }
    });

    return success;
  };

  // Try to remove a listener, if the function exists in the event eventname
  const unsubscribe = (eventName, ...funcs) => {
    if (!_hasEvent(eventName)) {
      console.warn(`Tried to unsubscribe ${funcs[0]} from nonexistent event ${eventName}!`);
      return false;
    }

    let success = true;

    funcs.forEach((func) => {
      if (!_events.get(eventName).removeListener(func)) {
        success = false;
      }
    });

    return success;
  };

  // Remove event from _events
  const destroyEvent = (eventName) => {
    if (!_events.delete(eventName)) {
      console.warn(`tried to destroy nonexistent event ${eventName}!`);
      return false;
    }
    return true;
  };

  // Remove all events from event handler
  const resetEvents = () => _events.clear();

  return {
    publish, invoke, subscribe, unsubscribe, destroyEvent, resetEvents, _events,
  };
};

export const globalEvents = CreateEventHandler();

export default CreateEventHandler;
