import React, {useEffect, useState} from 'react';
import API from '../../api';
import { useParams } from 'react-router-dom';
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";


const DarkerDisabledTextField = withStyles({
    root: {
      marginRight: 8,
      "& .MuiInputBase-root.Mui-disabled": {
        color: "rgba(0, 0, 0, 0.8)" // (default alpha is 0.38)
      }
    }
  })(TextField);
  

function BookDetail(props) {
    let { bookId } = useParams();
    const [edit, setEdit] = useState(false);
    const [book, setBook] = useState({});
    useEffect(() => {
        let isMounted = true;
        API.get(`/books/${bookId}`)
        .then(res => {
            // console.log(res.data)
            console.log("effect");
            if (isMounted) setBook(res.data)
        })
        .catch(error => console.log(error))
        return () => { isMounted = false};
    }, []);

    let handleChange = (object, setObject) => (event) => {
        const { name, value} = event.target;
        setObject({ ...object, [name]: value });
    };

    let toggleEdit = () => {setEdit(!edit)};

    let handleEdit = () => {
        console.log(book);
        API.put(`/books/${bookId}`, book)
        .then(res => {
            console.log(res.data)
            toggleEdit();
            return setBook(res.data);
        })
        .catch(error => console.log(error))
    }

    if (Object.keys(book).length == 0) {
        return (
            <div>Invalid book id. Book not found.</div>
        )
    }else {
        return (
            <div>
                <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
                className="book-detail"
                spacing={1}
                >
                    <Grid item md={4}>
                        
                        <img src={ process.env.PUBLIC_URL + "/" + (book.cover != ""? book.cover : 'images/book-placeholder.png') } className="book-cover" />
                        {/* <img src={ process.env.PUBLIC_URL + '/images/book-placeholder.png' } className="book-cover" /> */}

                        {/* <img src={book.cover || 'images/book-placeholder.png' } className="book-thumbnail" /> */}
                    </Grid>
                    
                    <Grid item md={8}
                        container
                        direction="column"
                        justify="center"
                        alignItems="flex-start">
                            <DarkerDisabledTextField name="name" label="Name" disabled={!edit} defaultValue={book.name} className="input-field" onChange={handleChange(book, setBook)}/>
                            <DarkerDisabledTextField name="author" label="Author" disabled={!edit} defaultValue={book.author} className="input-field" onChange={handleChange(book, setBook)}/>
                            <DarkerDisabledTextField name="category" label="Category" disabled={!edit} defaultValue={book.category} className="input-field" onChange={handleChange(book, setBook)}/>
                            <DarkerDisabledTextField name="description" label="Description" disabled={!edit} defaultValue={book.description} multiline rows={10} className="input-field" onChange={handleChange(book, setBook)}/>
                            <Grid>
                                {edit ? <DarkerDisabledTextField name="url" label="Url" disabled={!edit} defaultValue={book.url} className="input-field" onChange={handleChange(book, setBook)}/> : <a href={book.url}>Download</a> }
                            </Grid>

                            <Button variant={ edit ? "default" : "contained"} color="primary" onClick={toggleEdit}>
                                {edit ? "Cancel" : "Edit"}
                            </Button>
                            { edit && 
                                <Button variant="contained" color="primary" onClick={handleEdit} >Submit</Button>
                            }
                    </Grid>
                    
                </Grid>
            </div>
        );
    }
    
};

export default BookDetail;