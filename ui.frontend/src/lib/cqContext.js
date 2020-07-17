import React, { useContext } from 'react';
import { EditorContext } from '@adobe/cq-react-editable-components';

const CQContext = React.createContext();

function getCookieValueByRegEx(name) {
  if (typeof document === 'undefined') {
    return undefined;
  }

  const matches = document.cookie.match(
    '(^|;)\\s*' + name + '\\s*=\\s*([^;]+)',
  );
  return matches ? matches.pop() : '';
}

export function CQContextProvider({ children }) {
  const isInEditor = React.useContext(EditorContext);

  const context = {
    isInEditor: isInEditor || getCookieValueByRegEx('wcmmode') === 'edit',
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
