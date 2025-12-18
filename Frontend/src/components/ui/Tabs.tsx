import { Tab } from '@headlessui/react';
import { Fragment } from 'react';

interface TabItem {
  name: string;
  content: React.ReactNode;
}

interface TabsProps {
  items: TabItem[];
}

const Tabs = ({ items }: TabsProps) => {
  return (
    <Tab.Group>
      <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
        {items.map((item) => (
          <Tab key={item.name} as={Fragment}>
            {({ selected }) => <button className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 ${selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`}>{item.name}</button>}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="mt-2">
        {items.map((item) => <Tab.Panel key={item.name} className="rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2">{item.content}</Tab.Panel>)}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default Tabs;