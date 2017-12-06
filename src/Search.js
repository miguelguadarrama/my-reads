import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import { Link } from 'react-router-dom';
import Book from './Book';

class Search extends Component {
    state = {
        books: []
    }

    setQuery = (e) => {
        const query = e.target.value;
        if (query.length > 0)
            BooksAPI.search(query).then((data) => this.setState({ books: data }));
    }
    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input onChange={this.setQuery} type="text" placeholder="Search by title or author" />
                    </div>
                </div>
                <div className="search-books-results">
                    {this.state.books && this.state.books.length > 0 &&
                        <ol className="books-grid">
                            {this.state.books.map((book, index) => (
                                <li key={index}>
                                    <Book details={book} onSetCategory={this.props.onSetCategory} />
                                </li>
                            ))}
                        </ol>
                    }
                </div>
            </div>
        )
    }
}

export default Search