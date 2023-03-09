import React, { useState, useEffect } from "react";
import Editor from "./components/Editor";

const App = () => {
  // Define state variables for the HTML, CSS, and JS code, and the final output
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [srcDoc, setSrcDoc] = useState("");

  // Use the useEffect hook to update the final output whenever the HTML, CSS, or JS code changes
  useEffect(() => {
    const timeout = setTimeout(() => {
      // Combine the HTML, CSS, and JS code to create the final output
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `);
    }, 250);

    // Clear the timeout if any of the code editors are changed again
    return () => clearTimeout(timeout);
  }, [html, css, js]);

  return (
    <>
      <div className="panel top-panel">
        {/* Create an Editor component for the HTML,CSS,JS code */}
        <Editor title="HTML" language="xml" value={html} onChange={setHtml} />
        <Editor title="CSS" language="css" value={css} onChange={setCss} />
        <Editor title="JS" language="javascript" value={js} onChange={setJs} />
      </div>

      {/* Create an iframe element to display the final output */}
      <div className="panel">
        <iframe
          srcDoc={srcDoc} // Set the srcDoc property to the final output string
          title="output"
          sandbox="allow-scripts"
          width="100%"
          height="100%"
        />
      </div>
    </>
  );
};

export default App;
