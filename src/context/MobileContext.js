import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const MobileContext = React.createContext(null);

export const MOBILE_RESOLUTION_WIDTH = 1024;

export const getWindowDimension = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

export const getMobileState = ({ width }) => width <= MOBILE_RESOLUTION_WIDTH;

export const MobileProvider = MobileContext.Provider;

export const MobileConsumer = MobileContext.Consumer;

export const MobileApp = ({ children }) => {
  const [windowDimension, setWindowDimension] = useState(getWindowDimension());

  useEffect(() => {
    window.onresize = () => setWindowDimension(getWindowDimension());
  }, []);

  return (
    <MobileProvider value={{
      isMobile: getMobileState(windowDimension),
      ...windowDimension,
    }}>
      {children}
    </MobileProvider>
  );
};

MobileApp.propTypes = {
  children: PropTypes.node,
};

export default MobileContext;
