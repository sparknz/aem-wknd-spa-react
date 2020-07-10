import React, { useContext } from 'react';

const CQContext = React.createContext();

function getCookieValueByRegEx(name) {
  const matches = document.cookie.match(
    '(^|;)\\s*' + name + '\\s*=\\s*([^;]+)',
  );
  return matches ? matches.pop() : '';
}

export function CQContextProvider({ children }) {
  const context = {
    isInEditor: getCookieValueByRegEx('wcmmode') === 'edit',
  };

  return <CQContext.Provider value={context}>{children}</CQContext.Provider>;
}

export function useCQContext() {
  const context = useContext(CQContext);
  if (!context) {
    throw new Error('useCQContext should be used inside the CQContextProvider');
  }
  return context;
}
