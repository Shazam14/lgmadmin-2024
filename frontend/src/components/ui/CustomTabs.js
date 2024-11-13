import React, { useState } from "react";

const TabContext = React.createContext(null);

export const TabList = ({ children, defaultValue, onChange }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  const handleTabChange = (value) => {
    setActiveTab(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <TabContext.Provider value={{ activeTab, handleTabChange }}>
      <div className="flex flex-col w-full">{children}</div>
    </TabContext.Provider>
  );
};

export const TabTriggers = ({ children }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4 p-1 bg-gray-100 rounded-lg">
      {children}
    </div>
  );
};

export const TabTrigger = ({ value, children }) => {
  const { activeTab, handleTabChange } = React.useContext(TabContext);

  return (
    <button
      onClick={() => handleTabChange(value)}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-md transition-colors
        ${
          activeTab === value
            ? "bg-green-600 text-white"
            : "bg-white hover:bg-gray-50"
        }
      `}
    >
      {children}
    </button>
  );
};

export const TabContent = ({ value, children }) => {
  const { activeTab } = React.useContext(TabContext);

  if (value !== activeTab) {
    return null;
  }

  return <div className="mt-4">{children}</div>;
};

export const Tabs = ({ children, defaultValue, onChange }) => {
  return (
    <TabList defaultValue={defaultValue} onChange={onChange}>
      {children}
    </TabList>
  );
};
