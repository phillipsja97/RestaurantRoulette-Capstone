import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@bit/mui-org.material-ui.styles';
import Card from '@bit/mui-org.material-ui.card';
import CardActionArea from '@bit/mui-org.material-ui.card-action-area';
import CardActions from '@bit/mui-org.material-ui.card-actions';
import CardContent from '@bit/mui-org.material-ui.card-content';
import CardMedia from '@bit/mui-org.material-ui.card-media';
import Button from '@bit/mui-org.material-ui.button';
import Typography from '@bit/mui-org.material-ui.typography';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    margin: '2em',
  },
});

export default function SessionCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.card} raised={true}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&w=1000&q=80"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.session.sessionId}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link to={`/session/${props.session.sessionId}`}>
          <Button size="small" color="primary">
            Session Details
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
