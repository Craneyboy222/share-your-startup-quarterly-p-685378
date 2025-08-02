import React from 'react';

interface SidebarProps {
  items: { label: string; href: string }[];
}

const Sidebar: React.FC<SidebarProps> = ({ items }) => {
  return (
    <aside className="w-64 bg-gray-100 p-4">
      <ul>
        {items.map((item, index) => (
          <li key={index} className="mb-2">
            <a href={item.href} className="text-blue-600 hover:underline">{item.label}</a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;