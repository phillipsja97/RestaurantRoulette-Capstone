/* eslint-disable implicit-arrow-linebreak */
import EmphasisTag from '@bit/fho-wtag.tofa.emphasis-tag';
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
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import sessionData from '../../../Helpers/Data/sessionData';
import './SessionCard.scss';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    margin: '2em',
    backgroundColor: '#F4EBD0',
    borderColor: '#E27D60',
    borderWidth: '2px',
    color: '#41B3A3',
  },
  userTitleCard: {
    marginBottom: '10px',
  },
  button: {
    color: '#E27D60',
  },
  chipText: {
    color: '#41B3A3',
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
  }, [props.session.sessionId]);

  return (
    (props.session.isSwiped)
      ? <Card className={classes.card} raised={true}>
          <Link to={{
            pathname: `session/${props.session.sessionId}`,
            state: { status: props.session.isSwiped },
          }}>
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
              <Typography variant="h5" component="h2" className={classes.userTitleCard}>
                Users Involved:
              </Typography>
              {users.map((user) =>
              <Chip icon={<FaceIcon />} key={user.id} label={user.fullName} variant="outlined" className={classes.chipText} />)
              }
            </CardContent>
          </CardActionArea>
          </Link>
          <CardActions>
            <Link to={{
              pathname: `session/${props.session.sessionId}`,
              state: { status: props.session.isSwiped },
            }}>
              <Button size="small" className={classes.button}>
                Session Details
              </Button>
            </Link>
          </CardActions>
        </Card>
      : <Card className={classes.card} raised={true}>
          <Link to={`/newSession/${props.session.userId}/${props.session.sessionId}/swipe`}>
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
                <EmphasisTag text="You need to swipe!" type='urgent' size='small'/>
              </Typography>
              <Typography variant="h5" component="h2" className={classes.userTitleCard}>
                Users Involved:
              </Typography>
              {users.map((user) =>
              <Chip icon={<FaceIcon />} key={user.id} label={user.fullName} variant="outlined" className={classes.chipText}/>)
              }
            </CardContent>
          </CardActionArea>
          </Link>
          <CardActions>
            <Link to={`/session/${props.session.sessionId}`}>
              <Button size="small" className={classes.button}>
                Session Details
              </Button>
            </Link>
          </CardActions>
        </Card>
  );
}
