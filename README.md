# Obsidian Dataview Paginate

A Dataview view script to render a paginated collection

[Screencast from 2023-10-30 01-10-01.webm](https://github.com/madx/obsidian-dv-paginate/assets/5723/06dc54fc-8938-4d3a-8fb9-67e7bfd967ec)

## Install

Copy the `view.js` to a `Paginate` folder in your Vault (I recommend creating a dedicated folder for all Dataview views and creating the `Paginate` folder there).

You can also name the file `Paginate.js` and skip the folder creation step, but in the future I might add some CSS code which will require it 😃.

## Usage

The view has 3 arguments:

- `data` **(required)**: a [Data Array](https://blacksmithgu.github.io/obsidian-dataview/api/data-array/) containing the data you want to paginate.
- `perPage` **(optional, default 10)**: the number of items you want to show per page.
- `render` **(optional, default `(page) => dv.list(page.file.link)`)**: the dataviewjs code used to render a given page of items.

## Example

````md
```dataviewjs
const data = dv.pages("...")

await dv.view("Views/Paginate", {
  data,
  render: (page) => dv.list(page)
})
```
````
