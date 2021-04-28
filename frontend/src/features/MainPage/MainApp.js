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

export default function MainApp(props) {
    return (
        <div>
            <Router>
                <AppBar />
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
                            <Route path="/books/:bookId" exact component={BookDetail} />
                            <Route path="/books" exact component={BookList} />
                        </Switch>
                    </Grid>
                </Grid>
            </Router>
        </div>
    )
};