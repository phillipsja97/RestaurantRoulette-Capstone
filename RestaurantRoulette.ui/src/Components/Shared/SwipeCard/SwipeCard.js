import React from 'react';
import { withStyles } from '@bit/mui-org.material-ui.styles';
import { List, Rate } from 'antd';
import { StarOutlined } from '@ant-design/icons';
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
    backgroundColor: '#CAEBF2',
    borderColor: '#E27D60',
    borderWidth: '2px',
    color: 'black',
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
            <div className="swipeCardListSection">
            <List
              itemLayout="horizontal"
              >
                <List.Item>
                  <List.Item.Meta
                    title="Rating"
                    description={<Rate
                                      allowHalf
                                      disabled
                                      defaultValue={restaurant.rating}
                                  />}
                  >
                  </List.Item.Meta>
                </List.Item>
                <List.Item>
                <List.Item.Meta
                    title="Location"
                    description={`${restaurant.location.address1} ${restaurant.location.city}, ${restaurant.location.zip_code} ${restaurant.location.state}` }
                />
                </List.Item>
                <List.Item>
                <List.Item.Meta
                    title="Categories"
                    description={title}
                />
                </List.Item>
              </List>,
              </div>
            </Card>
      </div>
    );
  }
}

export default withStyles(styles)(SwipeCard);
