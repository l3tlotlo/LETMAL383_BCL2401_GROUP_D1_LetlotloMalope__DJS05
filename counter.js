// Creating a store using reducer function to handle transitions
function createStore(reducer) {
    let state;
    let listeners = [];
  
    const getState = () => state;
  
    const dispatch = (action) => {
      state = reducer(state, action);
      listeners.forEach(listener => listener());
    };
  
    //Adding and removing a listener
    const subscribe = (listener) => {
      listeners.push(listener); // Adding a listener
      return () => {
        listeners = listeners.filter(l => l !== listener);
      };
    };
  
    dispatch({ type: '@@INIT' }); //Initialising the state
  
    return { getState, dispatch, subscribe };  
  }
  // Function containing calculation logic
  function counterReducer(state = { count: 0 }, action) {
    switch (action.type) {
      case 'ADD':
        return { count: state.count + 1 };// Incrementing count
      case 'SUBTRACT': 
        return { count: state.count - 1 };// Decrementing count
      case 'RESET':
        return { count: 0 }; //Resetting the count to 0
      default:
        return state;
    }
  }
  // Store with the counter reducer
  const store = createStore(counterReducer);
  
  //Subscribing to store updates and logging new state
  store.subscribe(() => {
    console.log('State updated:', store.getState());
  });
  
  // Initial State Verification
  console.log('Initial State:', store.getState());  // Should log: { count: 0 }
  
  // Incrementing the Counter
  store.dispatch({ type: 'ADD' });
  store.dispatch({ type: 'ADD' });
  
  // Decrementing the Counter
  store.dispatch({ type: 'SUBTRACT' });
  
  //  Resetting the Counter
  store.dispatch({ type: 'RESET' });