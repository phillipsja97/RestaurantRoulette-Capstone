import React from 'react';
import { withStyles } from '@bit/mui-org.material-ui.styles';
import Card from '@bit/mui-org.material-ui.card';
import CardHeader from '@bit/mui-org.material-ui.card-header';
import CardMedia from '@bit/mui-org.material-ui.card-media';
import CardContent from '@bit/mui-org.material-ui.card-content';
import CardActions from '@bit/mui-org.material-ui.card-actions';
import Avatar from '@bit/mui-org.material-ui.avatar';
import IconButton from '@bit/mui-org.material-ui.icon-button';
import Typography from '@bit/mui-org.material-ui.typography';

const styles = (theme) => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  actions: {
    display: 'flex',
  },
  avatar: {
    backgroundColor: 'red',
  },
  body: {
    display: 'flex',
    justifyContent: 'center',
  },
});

class SwipeCard extends React.Component {
  render() {
    const { classes, restaurant } = this.props;
    const title = restaurant.categories.map((x) => `${x.title} `);
    return (
    <div className="swipeCard">
      <Card className={classes.card}>
            <CardHeader
                avatar={<Avatar aria-label="Recipe" className={classes.avatar}>
                  R
                </Avatar>}
                title={restaurant.name}
                subheader={restaurant.display_phone}
                />
            <CardMedia className={classes.media} image={restaurant.image_url} alt={restaurant.name} />
            <CardContent>
              <Typography variant="body1" className={classes.body}>
                Rating:
              </Typography>
                <Typography className={classes.body}>{restaurant.rating} Stars</Typography>
              <br/>
              <Typography variant="body1" className={classes.body}>
                Location:
              </Typography>
                <Typography className={classes.body}>{restaurant.location.display_address}</Typography>
              <br/>
              <Typography variant="body1" className={classes.body}>
                Categories:
              </Typography>
                <Typography className={classes.body}>{title}</Typography>
            </CardContent>
            </Card>
      </div>
    );
  }
}

export default withStyles(styles)(SwipeCard);
