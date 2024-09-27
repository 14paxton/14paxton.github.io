---
title: Mat-Table
permalink: ReactNotes/Mat-Table
category: JavaScript/ReactNotes
parent: ReactNotes
grand_parent: JavaScript
layout: default
has_children: false
share: true
shortRepo:

- reactnotes
- default

---

<br/>

<details markdown="block">                      
<summary>                      
Table of contents                      
</summary>                      
{: .text-delta }                      
1. TOC                      
{:toc}                      
</details>

<br/>

---

<br/>

# [Table With Async Call](https://github.com/14paxton/TableWithAsyncCall/tree/main)

# Use ref to update table info in parent

```jsx
const updatePrivateGroupsTable = () => {
    if (privateGroupTableRef?.current) {
        privateGroupTableRef.current.onQueryChange();
    }
};
```

# table ref

## tableref-onrowselected-to-update-the-ui-via-the-onrowclick-property

> Add tableRef to state:

```jsx
state = {
    tableRef: React.createRef(),
};
```

> Then add the tableRef prop to your Material Table

```jsx
<MaterialTable tableRef={this.state.tableRef}/>
```

> Then on the onRowClick prop/function use tableRef to access dataManager and onSelectionChange

```jsx
<MaterialTable
    tableRef={this.state.tableRef}
    onRowClick={(event, rowData) => {
        // Update the clicked rows checked state
        rowData.tableData.checked = !rowData.tableData.checked;

        // pass dataManager the current rows checked state and path/ID, the path/ID needs to be an array, ex: [1]
        this.state.tableRef.current.dataManager.changeRowSelected(rowData.tableData.checked, [rowData.tableData.id],);

        // call the onSelectionChange and pass it the row selected to ensure it updates your selection properly for any custom onSelectionChange functions.
        this.state.tableRef.current.onSelectionChange(rowData);
    }}
/>
```

## prop options to header from a customize component

![image5](https://user-images.githubusercontent.com/26972590/188926053-d48bcf30-3a9a-4d64-8a73-24c569724eeb.png)

# Issues

## [Add API for selecting/deselecting rows programmatically](https://github.com/mbrn/material-table/issues/515)

## ["Select All" also selects disabled checkboxes](https://github.com/mbrn/material-table/issues/686)