import Book from "./Book";
import { Button, Grid, Typography, InputBase, TextField, Tooltip } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import React, {useEffect, useState} from 'react';
import API from '../../api';

import BookDetail from './BookDetail';
import { Link } from "react-router-dom";



function BooksGrid(props) {
    const links = {"": "/books", };
    const [query, setQuery] = useState("");
    const [books, setBooks] = useState([]);

    const getBooks = (url_stub) => (query) => {
        let link = "/books";

        if (query !== "") {
            link = `books/search/${url_stub}?name=${query}`;
        }
        let isMounted = true;
        API.get(link)
        .then(res => {
            if (isMounted) setBooks(res.data._embedded.books)
        })
        .catch(error => console.log(error))
        return () => { isMounted = false};
    }

    const detailSearch = (query) => {
        let stubs = [
            "findByNameContainingIgnoreCaseOrderByName",
            "findByDescriptionContainingIgnoreCase",
            "findByAuthorContainingIgnoreCase"
        ]
        let promises = stubs.map((stub) => API.get(`books/search/${stub}?name=${query}`)
            .then((res) => res.data._embedded.books));
        Promise.all(promises).then((values) => {
            let m = new Map();
            values.map((books) => {
                books.map((book) => { m.set(book['id'], book); })
            })
            return m.values();
        })
        .then((books) => setBooks([...books]))
    };
    
    
    useEffect(() => {getBooks("findByNameContainingIgnoreCaseOrderByName")(query)}, [query]);

    const handleQueryChange = (query) => {
        setQuery(query);
        getBooks("findByNameContainingIgnoreCaseOrderByName");
    };

    return (
        <div>
            <Typography variant="h3" color="textSecondary" component="p">
                Books
            </Typography>
            <div className="search">
                <div className="search-icon" >
                    <SearchIcon />
                </div>
                <TextField
                placeholder="Search…"
                onChange={e => setQuery(e.target.value)}
                />
                <Tooltip title="Search using title, author, and description">
                <Button variant="contained" color="primary" onClick={() => detailSearch(query)} >Advanced Search</Button>
                </Tooltip>
            </div>
            <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            className="outer-container"
            spacing={3}
            >
                {books.map((value, index) => {
                    let val_id = value._links
                    return (
                        <Grid item xl={2} lg={3} md={4} sm={6} key={index}>
                            <Link to={{ pathname: `/books/${value.id}`, state: value}} >
                                <Book {...value} key={index} />
                            </Link>
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    )
};

export default BooksGrid;