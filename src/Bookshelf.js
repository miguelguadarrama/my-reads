import React from 'react';
import Book from './Book';

function Bookshelf(props) {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {props.books.filter(book => book.shelf === props.shelf)
                        .map((book, index) => (
                            <li key={index}>
                                <Book onSetCategory={props.onSetCategory} details={book} />
                            </li>
                        ))}
                </ol>
            </div>
        </div>
    )
}

export default Bookshelf