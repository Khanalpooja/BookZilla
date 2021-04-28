import { Box, Card, CardActionArea, CardMedia, CardContent, Typography } from "@material-ui/core";


function Book(props) {
    return (
        <Card className="book">
            <CardActionArea>
                <div className="book-cover">
                    <img src={props.cover || 'images/book-placeholder.png' } className="book-thumbnail" />
                </div>
                <CardContent>
                    <Typography noWrap variant="body1" color="textSecondary" component="p">
                        { props.name || "Dummy Book" }
                    </Typography>
                    <Typography noWrap variant="body3" color="textSecondary" component="p">
                        { props.author || "John Doe" }
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default Book;