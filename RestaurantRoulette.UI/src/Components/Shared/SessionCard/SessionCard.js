/* eslint-disable implicit-arrow-linebreak */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@bit/mui-org.material-ui.styles';
import Card from '@bit/mui-org.material-ui.card';
import CardActionArea from '@bit/mui-org.material-ui.card-action-area';
import CardActions from '@bit/mui-org.material-ui.card-actions';
import CardContent from '@bit/mui-org.material-ui.card-content';
import CardMedia from '@bit/mui-org.material-ui.card-media';
import Button from '@bit/mui-org.material-ui.button';
import Typography from '@bit/mui-org.material-ui.typography';
import EmphasisTag from '@bit/fho-wtag.tofa.emphasis-tag';
import sessionData from '../../../Helpers/Data/sessionData';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    margin: '2em',
  },
});

export default function SessionCard(props) {
  const [users, setUsers] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    sessionData.getAllUsersOnASession(props.session.sessionId)
      .then((result) => {
        setUsers(result);
      });
  });

  return (
    <Card className={classes.card} raised={true}>
      <Link to={`session/${props.session.sessionId}`}>
      <CardActionArea>
          <CardMedia
            component="img"
            alt={props.session.sessionId}
            height="140"
            image="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&w=1000&q=80"
            title={props.session.sessionId}
          />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            <EmphasisTag text="Waiting on others" type='highlight' size='small'/>
          </Typography>
          <Typography variant="h5" component="h2">
            Users Involved:
          </Typography>
          {users.map((user) =>
          <Typography gutterBottom variant="body1" component="body1">
            {user.fullName},
          </Typography>)
          }
        </CardContent>
      </CardActionArea>
      </Link>
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
