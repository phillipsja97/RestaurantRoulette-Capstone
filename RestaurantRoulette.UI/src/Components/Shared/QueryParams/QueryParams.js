import React from 'react';
import { makeStyles } from '@bit/mui-org.material-ui.styles';
import GridList from '@bit/mui-org.material-ui.grid-list';
import GridListTile from '@bit/mui-org.material-ui.grid-list-tile';
import GridListTileBar from '@bit/mui-org.material-ui.grid-list-tile-bar';
import { Checkbox } from 'antd';
import './QueryParams.scss';

const tileData = [
  {
    img: 'https://images.pexels.com/photos/3641761/pexels-photo-3641761.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    title: 'BBQ',
    value: 'bbq',
  },
  {
    img: 'https://material-ui.com/static/images/grid-list/burgers.jpg',
    title: 'Breakfast & Brunch',
    value: 'breakfast_brunch',
  },
  {
    img: 'https://material-ui.com/static/images/grid-list/camera.jpg',
    title: 'Camera',
    author: 'Danson67',
  },
  {
    img: 'https://material-ui.com/static/images/grid-list/morning.jpg',
    title: 'Morning',
    author: 'fancycrave1',
    featured: true,
  },
  {
    img: 'https://material-ui.com/static/images/grid-list/hats.jpg',
    title: 'Hats',
    author: 'Hans',
  },
  {
    img: 'https://material-ui.com/static/images/grid-list/honey.jpg',
    title: 'Honey',
    author: 'fancycravel',
  },
  {
    img: 'https://material-ui.com/static/images/grid-list/vegetables.jpg',
    title: 'Vegetables',
    author: 'jill111',
    cols: 2,
  },
  {
    img: 'https://material-ui.com/static/images/grid-list/plant.jpg',
    title: 'Water plant',
    author: 'BkrmadtyaKarki',
  },
  {
    img: 'https://material-ui.com/static/images/grid-list/mushroom.jpg',
    title: 'Mushrooms',
    author: 'PublicDomainPictures',
  },
  {
    img: 'https://material-ui.com/static/images/grid-list/olive.jpg',
    title: 'Olive oil',
    author: 'congerdesign',
  },
  {
    img: 'https://material-ui.com/static/images/grid-list/star.jpg',
    title: 'Sea star',
    cols: 2,
    author: '821292',
  },
  {
    img: 'https://material-ui.com/static/images/grid-list/bike.jpg',
    title: 'Bike',
    author: 'danfador',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  gridList: {
    width: 700,
    height: 350,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

export default function QueryParams() {
  const classes = useStyles();

  function onChange(e) {
    console.log(`${e.target.value} = ${e.target.checked}`);
  }

  return (
    <div className="queryParams">
      <div className="queryParamsTitle">
        <h1>QueryParams</h1>
      </div>
      <div className={classes.root} style={{width: 'auto', height: 'auto'}}>
      <GridList cellHeight={180} className={classes.gridList}>
        {tileData.map((tile) => (
          <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              actionIcon={
                <Checkbox value={tile.value} onChange={onChange}>Add to List</Checkbox>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
    </div>
  );
}
