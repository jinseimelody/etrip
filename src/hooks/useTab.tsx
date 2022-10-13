import {ReactElement, useState} from 'react';

type Tab = {
  name: string;
  element: ReactElement;
};

const useTab = (tabs: Tab[]) => {
  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);

  const goTo = (tabName: string) => {
    const index = tabs.findIndex(tab => tab.name === tabName);
    if (index === -1) return;

    setCurrentTabIndex(index);
  };

  return {tab: tabs[currentTabIndex], goTo};
};

export default useTab;
