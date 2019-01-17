图书跟踪，单页web应用
=======
# React 开发 图书跟踪应用项目 - Books Tracking

## <i class="icon-list"></i> 索引

* [快速运行](#快速运行)
* [项目文件](#项目文件)
* [BooksAPI英文文档](#BooksAPI英文文档)
* [注意事项](#注意事项)

## 快速运行

> https://github.com/vernonn/books-tracking

立即查看运行:

* 在github上下载并解压此项目 或 将此项目clone你选择的路径下。
* 在项目的根目录下，执行 `npm install` 下载项目依赖（可打开package.JSON文件查看所需模块）。
* 同样，在项目的根目录下，执行 `npm start`，如果没有自动打开，请在网址栏输入`http://localhost:3000/`。
* 注意：此页面需要VPN代理后查看。

## 项目文件
```bash
├──CONTRIBUTING.md
├──README.md  
├──SEARCH_TERMS.md
├──package.json
├──public
│  ├──favicon.ico
│  └──index.html
└──src
    ├──App.css
    ├──App.js
    ├──App.test.js
    ├──BooksAPI.js
    ├──Book.js
    ├──BookShelf.js
    ├──HeaderPart.js
    ├──SearchPage.js
    ├──icons
    │  ├──add.svg
    │  ├──arrow-back.svg
    │  └──arrow-drop-down.svg
    ├──index.css
    └──index.js
```

## BooksAPI英文文档

[`BooksAPI.js`](src/BooksAPI.js)

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## 注意事项
BooksAPI使用一组固定的缓存搜索结果，并限于一组特定的搜索项，可在 [SEARCH_TERMS.md](SEARCH_TERMS.md) 中找到。该列表中的选项是唯一适用于后端的选项，因此，如果搜索Basket Weaving或Bubble Wrap之类的选项，并不会返回任何结果。
