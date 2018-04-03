import React from 'react'
import {Route, Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import HeaderPart from './HeaderPart'
// import Book from './Book'
import BookShelf from './BookShelf'
import SearchPage from './SearchPage'

class BooksApp extends React.Component {
  state = {
    // 书堆数组
    books_array: []
  }

  moveBook = (book, shelf) => {
    // 若书堆中有书，即书堆不为空时
    // 由BookAPI的update()中的fetch方式来异步获取更新数据
    if (this.state.books_array) {
      BooksAPI.update(book,shelf).then(() => {
        book.shelf = shelf;
        this.setState(state => ({
          books_array: state.books_array.filter(oneBook => oneBook.id !== book.id).concat([ book ])
        }))
      })
    }
  }

  // 执行componentDidMount()钩子时异步获取数据
  componentDidMount() {
    BooksAPI.getAll().then((books_array) => {
      this.setState({ books_array })
    })
  }

  render() {
    return (
      <div className="app">
        {/* 搜索页Route */}
        <Route path="/searchpage" render={() => (
          // 仅显示搜索组件
          <SearchPage onMoveBook={this.moveBook} booksOnShelf={this.state.books_array}/>
        )} />
        {/* 应用首页Route */}
        <Route exact path="/" render={() => (
          <div className="list-books">
            {/* 顶部栏组件 */}
            <HeaderPart/>
            <div className="list-books-content">
              {/* 图书架分类（三类），其中含单个图书的组件 */}
              <BookShelf onMoveBook={this.moveBook} booksOnShelf={this.state.books_array}/>
            </div>
            {/* 搜索按钮 */}
            <div className="open-search">
              <Link to="/searchpage">Add a book</Link>
            </div>
          </div>
        )} />
    </div>)
  }
}

export default BooksApp
