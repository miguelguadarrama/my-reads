import React from 'react';

function Book(props) {
    return (
        props.details && (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${props.details.imageLinks ? props.details.imageLinks.smallThumbnail : ''})` }}></div>
                    <div className="book-shelf-changer">
                        <select onChange={(val) => props.onSetCategory(val, props.details)} value={props.details.shelf || ''}>
                            <option value="" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title"><a href={props.details.previewLink} target="_blank">{props.details.title}</a></div>
                <div className="book-authors">
                    {props.details.authors && props.details.authors.length > 0 && props.details.authors.join(', ')}
                </div>
            </div>
        )
    )
}

export default Book