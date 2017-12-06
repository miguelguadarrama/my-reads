import React from 'react'
import { Link, Route } from 'react-router-dom';
import Search from './Search';
import Bookshelf from './Bookshelf';
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    loading: true
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({ books: books, loading: false }));
  }

  getHeight() {
    const [body, html] = [document.body, document.documentElement];
    const height = Math.max(body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight);
    return height;
  }

  setCategory = (e, book) => {
    book.shelf = e.target.value;
    this.setState(state => ({
      books: state.books.filter(swap => swap.id !== book.id).concat(book),
      loading: true
    }))
    BooksAPI.update(book, e.target.value).then(() => this.setState({ loading: false })).catch(() => this.setState({ loading: false }));
  }

  render() {
    return (
      <div className="app">
        {this.state.loading && (
          <div id="loading" style={{ height: this.getHeight() }}>
            <p>Loading...</p>
          </div>
        )}
        <Route path="/search" render={() => (
          <Search onSetCategory={this.setCategory} />
        )} />

        <Route path="/" exact render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf title="Currently Reading" onSetCategory={this.setCategory} books={this.state.books} shelf="currentlyReading" />
                <Bookshelf title="Want to Read" onSetCategory={this.setCategory} books={this.state.books} shelf="wantToRead" />
                <Bookshelf title="Read" onSetCategory={this.setCategory} books={this.state.books} shelf="read" />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />

      </div>
    )
  }
}

export default BooksApp