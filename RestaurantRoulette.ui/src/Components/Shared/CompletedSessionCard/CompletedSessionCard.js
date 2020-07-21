/* eslint-disable implicit-arrow-linebreak */
import React, { useEffect, useState } from 'react';
import FaceIcon from '@bit/mui-org.material-ui-icons.face';
import Button from '@bit/mui-org.material-ui.button';
import Card from '@bit/mui-org.material-ui.card';
import CardActionArea from '@bit/mui-org.material-ui.card-action-area';
import CardActions from '@bit/mui-org.material-ui.card-actions';
import CardContent from '@bit/mui-org.material-ui.card-content';
import CardMedia from '@bit/mui-org.material-ui.card-media';
import Chip from '@bit/mui-org.material-ui.chip';
import { makeStyles } from '@bit/mui-org.material-ui.styles';
import Typography from '@bit/mui-org.material-ui.typography';
import { Link } from 'react-router-dom';
import sessionData from '../../../Helpers/Data/sessionData';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    margin: '2em',
  },
  userTitleCard: {
    marginBottom: '10px',
  },
});

export default function CompletedSessionCard(props) {
  const [users, setUsers] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    sessionData.getAllUsersOnASession(props.completedSession.sessionId)
      .then((result) => {
        setUsers(result);
      });
  }, [props.completedSession.sessionId]);

  return (
      <Card className={classes.card} raised={true}>
          <Link to={`session/${props.completedSession.sessionId}`}>
          <CardActionArea>
              <CardMedia
                component="img"
                alt={props.completedSession.sessionId}
                height="140"
                image="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&w=1000&q=80"
                title={props.completedSession.sessionId}
              />
            <CardContent>
              <Typography variant="h5" component="h2" className={classes.userTitleCard}>
                Users Involved:
              </Typography>
              {users.map((user) =>
              <Chip icon={<FaceIcon />} key={user.id} label={user.fullName} variant="outlined"/>)
              }
            </CardContent>
          </CardActionArea>
          </Link>
          <CardActions>
            <Link to={`/session/${props.completedSession.sessionId}`}>
              <Button size="small" color="primary">
                Session Details
              </Button>
            </Link>
          </CardActions>
      </Card>
  );
}
