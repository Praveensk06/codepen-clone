import React, { useState } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/css/css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/html-hint";
import "codemirror/addon/hint/css-hint";

import { Controlled as ControlledEditor } from "react-codemirror2";
import { Launch, TransitEnterexit } from "@material-ui/icons";
import codemirror from "codemirror";

// functional component
const Editor = ({ language, title, value, onChange }) => {
  // define state variable 'open' with an initial value of true
  const [open, setOpen] = useState(true);

  function handleChange(editor, data, value) {
    onChange(value);
  }
  // jsx element
  return (
    //additional class of "collapsed" if "open" is false
    <div className={`editor-container ${open ? "" : "collapsed"}`}>
      <div className="editor-title">
        {/* display the value of the "title" prop */}
        {title}
        {/* "button" element that toggles the "open" state */}
        <button
          onClick={() => setOpen((open) => !open)}
          className="expand-collapse-btn"
        >
          {/* display an icon based on the current value of "open" */}
          {open ? <TransitEnterexit /> : <Launch />}
        </button>
      </div>
      {/* CodeMirror editor component with the following props */}
      <ControlledEditor
        onBeforeChange={handleChange} //before changes are applied to the editors value
        value={value}
        className="code-mirror-wrapper"
        options={{
          //various options fro the editor
          lineWrapping: true, //whether long lines should be wrapped
          lint: true,
          mode: language,
          theme: "material",
          lineNumbers: true,
          autoCloseTags: true,
          autoCloseBrackets: true,
          extraKeys: { "ctrl-space": "autocomplete" },
          hintOptions: {
            hint: codemirror.hint.css,
            hint: codemirror.hint.html,
          },
        }}
      />
    </div>
  );
};

export default Editor;
