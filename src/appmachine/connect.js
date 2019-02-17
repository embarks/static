
import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

export const Context = React.createContext(null);

export function wrap(mapStateToProps = () => [], dispatchToProps = {}) {
  if (!dispatchToProps) {
    const message = 'function wrap(mapStateToProps, mapDispatchToProps) expects an object with function values for mapDispatchToProps' +
      '\nIf no dispatch map is required, do not provide dispatchToProps';
    throw new Error(message);
  }
  if (mapStateToProps && typeof mapStateToProps !== 'function') {
    const message = 'function wrap(mapStateToProps, mapDispatchToProps) map expects a function for mapStateToProps' +
      '\nIf no state map is required, provide null to mapStateToProps';
    throw new Error(message);
  }
  let dispatchPropKeys = [];
  let mapDispatch = () => ({});
  try {
    dispatchPropKeys = Object.keys(dispatchToProps);
    mapDispatch = (dispatch) => {
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
              const stateToProps = mapStateToProps !== null ? mapStateToProps(state) : {};
              return <WrappedComponent {...props} {...mapDispatch(dispatch)} {...stateToProps} />;
            }}
        </Context.Consumer>
      );
    };
  }
  catch(error) {
    console.error('function wrap(mapStateToProps, mapDispatchToProps) expects an object with function values for mapDispatchToProps', error);
    return (WrappedComponent) => function DefaultConnectComponent(props) {
      return <WrappedComponent {...props} />;
    };
  }
}

export const Root = ({ children, machine }) => {
  try {
    const [state, dispatch] = useReducer(machine.root, machine.initialState);
    return (
      <Context.Provider value={{ dispatch, state }}>
        {children}
      </Context.Provider>
    );
  } catch (error) {
    console.error('Problem initializing root reducer', error);
    return children;
  }

};

Root.propTypes = {
  children: PropTypes.node,
  machine: PropTypes.shape({
    root: PropTypes.func.isRequired,
    initialState: PropTypes.object
  })
};

export default Root;


