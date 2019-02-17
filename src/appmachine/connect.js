
import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

export const Context = React.createContext(null);

export function wrap(stateToProps = () => [], dispatchToProps = {}) {
  const dispatchPropKeys = Object.keys(dispatchToProps);
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
            return <WrappedComponent {...props} {...mapDispatch(dispatch)} {...stateToProps(state)} />;
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


