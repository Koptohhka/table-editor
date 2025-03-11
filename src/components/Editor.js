import React, { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import Quill from "quill";
import 'quill/dist/quill.snow.css';
import 'quill-better-table/dist/quill-better-table.css';

const icons = Quill.import('ui/icons');
icons['insertTable'] = `
  <svg viewBox="0 0 18 18">
    <rect class="ql-fill" x="3" y="3" width="4" height="4"></rect>
    <rect class="ql-fill" x="11" y="3" width="4" height="4"></rect>
    <rect class="ql-fill" x="3" y="11" width="4" height="4"></rect>
    <rect class="ql-fill" x="11" y="11" width="4" height="4"></rect>
  </svg>
`;

const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    ['link', 'image', 'video', 'formula'],

    [{ 'header': 1 }, { 'header': 2 }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    [{ 'direction': 'rtl' }],

    [{ 'size': ['small', false, 'large', 'huge'] }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean'],
    [{ 'insertTable': 'table' }]
];

const Editor = forwardRef(
    ({ readOnly, defaultValue, onTextChange, setModalState, onSelectionChange }, ref) => {
        const containerRef = useRef(null);
        const defaultValueRef = useRef(defaultValue);
        const onTextChangeRef = useRef(onTextChange);
        const onSelectionChangeRef = useRef(onSelectionChange);

        useLayoutEffect(() => {
            onTextChangeRef.current = onTextChange;
            onSelectionChangeRef.current = onSelectionChange;
        });

        useEffect(() => {
            ref.current?.enable(!readOnly);
        }, [ref, readOnly]);

        useEffect(() => {
            const container = containerRef.current;
            const editorContainer = container.appendChild(
                container.ownerDocument.createElement('div'),
            );
            const quill = new Quill(editorContainer, {
                theme: 'snow',
                modules: {
                    toolbar: {
                        container: toolbarOptions,
                        handlers: {
                            insertTable: () => {
                                setModalState(true);
                            }
                        }
                    },
                    table: false,
                    'better-table': {
                        operationMenu: {
                            items: {
                                unmergeCells: {
                                    text: 'Another unmerge cells name'
                                }
                            },
                            color: {
                                colors: ['green', 'red', 'yellow', 'blue', 'white'],
                                text: 'Background Colors:'
                            }
                        }
                    },
                }
            });

            ref.current = quill;

            if (defaultValueRef.current) {
                quill.setContents(defaultValueRef.current);
            }

            quill.on(Quill.events.TEXT_CHANGE, (...args) => {
                onTextChangeRef.current?.(...args);
            });

            quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
                onSelectionChangeRef.current?.(...args);
            });

            return () => {
                ref.current = null;
                container.innerHTML = '';
            };
        }, [ref]);

        return <div id="editor" ref={containerRef}></div>;
    },
);

Editor.displayName = 'Editor';

export default Editor;