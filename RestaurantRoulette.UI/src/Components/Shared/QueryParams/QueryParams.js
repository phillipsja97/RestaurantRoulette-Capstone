import GridList from '@bit/mui-org.material-ui.grid-list';
import GridListTile from '@bit/mui-org.material-ui.grid-list-tile';
import GridListTileBar from '@bit/mui-org.material-ui.grid-list-tile-bar';
import { makeStyles } from '@bit/mui-org.material-ui.styles';
import { Checkbox } from 'antd';
import React from 'react';
import './QueryParams.scss';

const tileData = [
  {
    img: 'https://images.pexels.com/photos/3641761/pexels-photo-3641761.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    title: 'BBQ',
    value: 'bbq',
  },
  {
    img: 'https://images.pexels.com/photos/511763/pexels-photo-511763.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    title: 'Breakfast & Brunch',
    value: 'breakfast_brunch',
  },
  {
    img: 'https://images.pexels.com/photos/2089717/pexels-photo-2089717.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    title: 'Burgers',
    value: 'burgers',
  },
  {
    img: 'https://images.pexels.com/photos/1907228/pexels-photo-1907228.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    title: 'Chinese',
    value: 'chinese',
  },
  {
    img: 'https://cdn.pixabay.com/photo/2019/10/12/15/12/gyros-4544061_1280.jpg',
    title: 'Greek',
    value: 'greek',
  },
  {
    img: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    title: 'Indian',
    value: 'indpak',
  },
  {
    img: 'https://images.pexels.com/photos/1438672/pexels-photo-1438672.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    title: 'Italian',
    value: 'italian',
  },
  {
    img: 'https://images.pexels.com/photos/2087748/pexels-photo-2087748.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    title: 'Mexican',
    value: 'mexican',
  },
  {
    img: 'https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    title: 'Pizza',
    value: 'pizza',
  },
  {
    img: 'https://cdn.pixabay.com/photo/2015/12/08/19/08/steak-1083567_1280.jpg',
    title: 'Steakhouse',
    value: 'steak',
  },
  {
    img: 'https://images.pexels.com/photos/681586/sushi-japan-soya-rice-681586.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    title: 'Sushi',
    value: 'sushi',
  },
  {
    img: 'https://images.pexels.com/photos/1143754/pexels-photo-1143754.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    title: 'Vegetarian',
    value: 'vegetarian',
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
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

export default function QueryParams(props) {
  const params = [];
  const classes = useStyles();

  function onChange(e) {
    if (e.target.checked) {
      params.push(e.target.value);
    } else {
      const index = params.indexOf(e.target.value);
      params.splice(index, 1);
    }
    const joined = params.join(',');
    props.onChange(joined);
    return joined;
  }

  return (
    <div className="queryParams">
      <div className="queryParamsTitle">
        <h1>What categories?</h1>
      </div>
      <div className={classes.root} style={{ width: 'auto', height: 'auto' }}>
      <GridList cellHeight={180} className={classes.gridList}>
        {tileData.map((tile) => (
          <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              actionIcon={
                <Checkbox value={tile.value} onChange={onChange}></Checkbox>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
    </div>
  );
}
