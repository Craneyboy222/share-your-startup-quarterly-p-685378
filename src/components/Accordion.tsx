import React, { useState } from 'react';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="accordion">
      <button onClick={toggleOpen} aria-expanded={isOpen} className="p-2 bg-gray-200 w-full text-left">
        {title}
      </button>
      {isOpen && <div className="p-2">{children}</div>}
    </div>
  );
};

export default Accordion;
