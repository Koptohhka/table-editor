import React, { useRef, useState, useEffect } from 'react';
import Editor from './components/Editor';
import Quill from "quill";
import Table from 'quill-better-table';
import TableDimensionModal from "./components/TableDimensionModal";
import "./App.css";

const Delta = Quill.import('delta');
Quill.register({
  'modules/better-table': Table
}, true)

const App = () => {
  const [range, setRange] = useState();
  const [lastChange, setLastChange] = useState();
  const [readOnly, setReadOnly] = useState(false);
  const [modalOn, setModalState] = useState(false);

  // Use a ref to access the quill instance directly
  const quillRef = useRef();
  const toolbarRef = useRef(null);

  const onCloseModalhandler = () => {
    setModalState(false)
  }

  const onSubmithandler = (rows, columns) => {
    const tableModule = quillRef.current.getModule('better-table');
    tableModule.insertTable(rows, columns)
  }

  return (
    <div className='Main-container'>
      <TableDimensionModal onSubmit={onSubmithandler} onClose={onCloseModalhandler} visible={modalOn} />
      <Editor
        setModalState={setModalState}
        toolbarRef={toolbarRef}
        ref={quillRef}
        readOnly={readOnly}
        defaultValue={new Delta()
          .insert('Hello')
          .insert('\n', { header: 1 })
          .insert('Some ')
          .insert('initial', { bold: true })
          .insert(' ')
          .insert('content', { underline: true })
          .insert('\n')}
        onSelectionChange={setRange}
        onTextChange={setLastChange}
      />
      {/* <div class="controls">
        <label>
          Read Only:{' '}
          <input
            type="checkbox"
            value={readOnly}
            onChange={(e) => setReadOnly(e.target.checked)}
          />
        </label>
        <button
          className="controls-right"
          type="button"
          onClick={() => {
            alert(quillRef.current?.getLength());
          }}
        >
          Get Content Length
        </button>
        <button
          className="controls-right"
          type="button"
          onClick={handleInsertTable}
        >
          Insert Tables
        </button>
      </div>
      <div className="state">
        <div className="state-title">Current Range:</div>
        {range ? JSON.stringify(range) : 'Empty'}
      </div>
      <div className="state">
        <div className="state-title">Last Change:</div>
        {lastChange ? JSON.stringify(lastChange.ops) : 'Empty'}
      </div> */}
    </div>
  );
};

export default App;