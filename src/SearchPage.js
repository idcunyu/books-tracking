import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'

class SearchPage extends Component {
  // 类型检查
  static propTypes = {
    booksOnShelf: PropTypes.array,
    onMoveBook: PropTypes.func.isRequired
  }

  state = {
    searchStr: '',
    books_array: []
  }

  // 根据录入query查询来更新books的状态
  updateSearchStr = (searchStr) => {
    // 输入为空时，状态设置为初始状态；
    // 输入不为空时，使用BookAPI的search()异步更新状态数据
    if (!searchStr) {
      this.setState({searchStr: '', books_array: []})
    } else {
      // 去除searchStr前后的空格
      this.setState({ searchStr: searchStr.trim() })
      BooksAPI.search(searchStr).then((books_array) => {
        if (books_array.error) {
          books_array = [];
        }
        books_array.map(book => (this.props.booksOnShelf.filter((oneShelfBook) => oneShelfBook.id === book.id)
        .map(oneShelfBook => book.shelf = oneShelfBook.shelf)));
        this.setState({books_array})
      })
    }
  }

  render () {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          {/* 关闭搜索，返回主页面 */}
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="通过书籍名或作者名来查找..."
              onChange={(event) => this.updateSearchStr(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            <div className="bookshelf-books">
              <ol className="books-grid">
                {/*
                  * 1、将对应书架上的书籍按标题顺序来排序
                  * 2、根据是否匹配书架名来进行筛选
                  * 3、遍历以插入每个key唯一的Book组件
                  */}
                {this.state.books_array.sort(sortBy('title'))
                  .map(book => (
                    <Book
                      onMoveBook={this.props.onMoveBook}
                      key={book.id}
                      book={book}
                    />
                  ))
                }
              </ol>
            </div>
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchPage
