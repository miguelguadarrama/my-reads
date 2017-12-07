import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import { Link } from 'react-router-dom';
import Book from './Book';

class Search extends Component {
    state = {
        books: []
    }
    
    componentDidMount(){
        document.getElementById("search").focus();
    }

    setQuery = (e) => {
        const [query, myBooks] = [e.target.value, this.props.myBooks];
        if (query.length > 0)
            BooksAPI.search(query).then((data) => {
                data = data.map(book => {
                    //while this works, I wonder if there's a better way of doing this?
                    myBooks.forEach((item) => {
                        if(item.id === book.id) book.shelf = item.shelf;
                    });
                    return book;
                })
                this.setState({books:data});
            });
    }
    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input id="search" onChange={this.setQuery} type="text" placeholder="Search by title or author" />
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