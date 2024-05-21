function createStore(reducer) {
    let state;
    let listeners = [];
  
    const getState = () => state;
  
    const dispatch = (action) => {
      state = reducer(state, action);
      listeners.forEach(listener => listener());
    };
  
    const subscribe = (listener) => {
      listeners.push(listener);
      return () => {
        listeners = listeners.filter(l => l !== listener);
      };
    };
  
    dispatch({ type: '@@INIT' });
  
    return { getState, dispatch, subscribe };
  }
  
  function counterReducer(state = { count: 0 }, action) {
    switch (action.type) {
      case 'ADD':
        return { count: state.count + 1 };
      case 'SUBTRACT':
        return { count: state.count - 1 };
      case 'RESET':
        return { count: 0 };
      default:
        return state;
    }
  }
  
  const store = createStore(counterReducer);
  
  store.subscribe(() => {
    console.log('State updated:', store.getState());
  });
  
  // Scenario 1: Initial State Verification
  console.log('Initial State:', store.getState());  // Should log: { count: 0 }
  
  // Scenario 2: Incrementing the Counter
  store.dispatch({ type: 'ADD' });
  store.dispatch({ type: 'ADD' });
  
  // Scenario 3: Decrementing the Counter
  store.dispatch({ type: 'SUBTRACT' });
  
  // Scenario 4: Resetting the Counter
  store.dispatch({ type: 'RESET' });