### Installation

#### Install Dependencies

Run the following command to install project dependencies:

```sh
yarn install
```

#### Start the Application

Run the app in development mode:

```sh
yarn start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Quill Tables Integration

### Installing `quill-better-table`

To install the `quill-better-table` package, run:

```sh
npm install quill-better-table
```

### Importing the Module and Styles

Import the required styles:

```javascript
import Table from 'quill-better-table';
import 'quill-better-table/dist/quill-better-table.css';
```

### Registering the Module

Register the `better-table` module after declaring Quill:

```javascript
Quill.register({
  'modules/better-table': Table
}, true);
```

### Configuring the Table Module

Pass options for the table module during Quill initialization:

```javascript
const quill = new Quill(editorContainer, {
    theme: 'snow',
    modules: {
        ...,
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
```

---

## Custom Toolbar Icon and Handlers

### Defining Custom Toolbar Options

```javascript
const toolbarOptions = [
    [{ 'size': ['small', false, 'large', 'huge'] }, 'italic', 'underline',
    { 'color': [] }, { 'background': [] }, { 'align': [] }, { 'list': 'ordered' }, { 'list': 'bullet' }, 'link',
    // Adding table insertion button
    { 'insertTable': 'table' }
    ]
];
```

### Adding a Custom Icon

```javascript
const icons = Quill.import('ui/icons');
icons['insertTable'] = `
  <svg viewBox="0 0 18 18">
    <rect class="ql-fill" x="3" y="3" width="4" height="4"></rect>
    <rect class="ql-fill" x="11" y="3" width="4" height="4"></rect>
    <rect class="ql-fill" x="3" y="11" width="4" height="4"></rect>
    <rect class="ql-fill" x="11" y="11" width="4" height="4"></rect>
  </svg>
`;
```

### Defining Toolbar Handlers

```javascript
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
    }
});
```

---

## Using `quill-better-table` API

### Inserting a Table

```javascript
const onSubmitHandler = (rows, columns) => {
  const tableModule = quillRef.current.getModule('better-table');
  tableModule.insertTable(rows, columns);
};
```
