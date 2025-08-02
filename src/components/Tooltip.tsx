import React from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

interface TooltipProps {
  content: string;
  children: React.ReactElement;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  return (
    <Tippy content={content} placement="top" arrow={true}>
      {children}
    </Tippy>
  );
};

export default Tooltip;
