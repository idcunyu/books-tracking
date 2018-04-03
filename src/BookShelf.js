import React, {Component} from 'react'
import Book from './Book'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'

class BookShelf extends Component {
  // 类型检查
  static propTypes = {
    booksOnShelf: PropTypes.array.isRequired,
    onMoveBook: PropTypes.func.isRequired
  }

  render(){
    // 书架每栏的标题
    const bookshelf_title = ["currentlyReading", "wantToRead", "read"]
    // 书架每栏显示的标题文字
    const bookshelf_title_str=['正在阅读','想要阅读','已读'];
    return(
      <div>
        {bookshelf_title.map((bookshelf,index)=>(
          <div className="bookshelf" key={index}>
            <h2 className="bookshelf-title">{bookshelf_title_str[index]}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {/*
                  * 1、将对应书架上的书籍按标题顺序来排序
                  * 2、根据是否匹配书架名来进行筛选
                  * 3、遍历以插入每个key唯一的Book组件
                  */}
                {this.props.booksOnShelf.sort(sortBy('title'))
                  .filter(book => book.shelf === bookshelf)
                  .map(book => (
                    // BookShelf组件内插入Book组件
                    <Book
                      onMoveBook={this.props.onMoveBook}
                      key={book.id}
                      book={book}
                    />
                  ))
                }
              </ol>
            </div>
          </div>
        ))}
    </div>
    )
  }
}

export default BookShelf
