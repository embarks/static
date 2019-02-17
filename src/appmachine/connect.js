
import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

export const Context = React.createContext(null);

export function wrap(mapStateToProps = () => [], dispatchToProps = {}) {
  if (typeof mapStateToProps !== 'function') {
    throw new Error('function wrap(mapStateToProps, mapDispatchToProps) map expects a function for mapStateToProps');

  }
  let dispatchPropKeys = [];
  try {
    dispatchPropKeys = Object.keys(dispatchToProps);
  } catch(error) {
    throw new Error('function wrap(mapStateToProps, mapDispatchToProps) expects an object for mapDispatchToProps');
  }
  const mapDispatch = (dispatch) => {
    return dispatchPropKeys.reduce((props, key) =>
      ({
        ...props,
        [key]: (...args) => dispatch(dispatchToProps[key](...args))
      })
    , {});
  };
  return (WrappedComponent) => function Wrapped(props) {
    return( 
      <Context.Consumer>
        {
          ({ dispatch, state }) => {
            return <WrappedComponent {...props} {...mapDispatch(dispatch)} {...mapStateToProps(state)} />;
          }}
      </Context.Consumer>
    );
  };

}

export const Root = ({ children, machine }) => {
  const [state, dispatch] = useReducer(machine.root, machine.initialState);
  return (
    <Context.Provider value={{ dispatch, state }}>
      {children}
    </Context.Provider>
  );
};

Root.propTypes = {
  children: PropTypes.node,
  machine: PropTypes.shape({
    root: PropTypes.func.isRequired,
    initialState: PropTypes.object
  })
};

export default Root;


