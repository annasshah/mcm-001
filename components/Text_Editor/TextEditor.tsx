// components/RichTextEditor.tsx
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

// Define a type for the RichTextEditor component with additional properties
interface RichTextEditorProps {
  modules?: any;
  formats?: any;
}

const RichTextEditor: any = () => {
  const [editorHtml, setEditorHtml] = useState<string>("");

  const handleChange = (html: string) => {
    setEditorHtml(html);
  };

  return (
    <div className=" w-[700px]">
      <ReactQuill
        value={editorHtml}
        onChange={handleChange}
        theme="snow"
        modules={RichTextEditor.modules}
        formats={RichTextEditor.formats}
        style={{ height: "300px" }} // Set minimum height
      />
    </div>
  );
};

// Define modules and formats for the editor
RichTextEditor.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    ["link", "image"],
    [{ align: [] }],
    ["clean"],
  ],
};

RichTextEditor.formats = [
  "header",
  "font",
  "list",
  "bullet",
  "bold",
  "italic",
  "underline",
  "link",
  "image",
  "align",
];

export default RichTextEditor;
