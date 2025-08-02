import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AriaAttributes } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps & AriaAttributes> = ({ value, onChange, 'aria-label': ariaLabel }) => {
  return (
    <div className="rich-text-editor">
      <ReactQuill theme="snow" value={value} onChange={onChange} aria-label={ariaLabel} />
    </div>
  );
};

export default RichTextEditor;
