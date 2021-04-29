import React, {useEffect, useState} from 'react';
import AppBar from './AppBar';
import { Grid } from '@material-ui/core';
import BookList from '../books/BooksGrid';
import BookDetail from '../books/BookDetail';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import SignIn from '../users/SignIn';

export default function MainApp(props) {
    const [isLoggedIn, setLogin] = useState(false);

    return (
        <div>
            <Router>
                <AppBar isLoggedIn={isLoggedIn} logOut={() => setLogin(false)}/>
                <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                className="outer-container"
                >
                    <Grid item md={8}>
                        <Switch>
                            <Route path="/" exact component={BookList} />
                            <Route path="/books/:bookId" exact render={() => <BookDetail isLoggedIn={isLoggedIn}/>} />
                            <Route path="/books" exact component={BookList} />
                            <Route path="/login" exact render={() => <SignIn signUp={false} isloggedIn={isLoggedIn} setLogin={(val) => setLogin(val)}/>} />
                        </Switch>
                    </Grid>
                </Grid>
            </Router>
        </div>
    )
};