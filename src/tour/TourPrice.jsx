import React, { Component } from 'react';

// Style
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

// Component

class TourPrice extends Component {

  render() {
    const { classes, price } = this.props
    return (
      <div className={classes.root}>
        <div className={classes.marketing}></div>
        <div className={classes.price}>
          <Typography type='display2'>${price.amount}</Typography>
          <Typography type='headline' color='primary'>${price.discountAmount}</Typography>
        </div>
      </div>
    )
  }
}

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'stretch'
  },
  marketing: {
    flexGrow: 1
  },
  price: {
    display: 'flex',
    marginLeft: '16px',
    '& h1 + h1':{
      marginLeft: theme.spacing.unit
    },
    alignItems: 'baseline'
  },
});

export default withStyles(styles)(TourPrice);