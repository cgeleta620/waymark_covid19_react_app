import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

// some styles using theme so now in css.
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2), 
      textAlign: 'center',
      borderRadius: theme.shape.borderRadius,
      boxShadow: theme.shadows[1],
      backgroundColor: '#f5f6f7',
    }
  })
);

/**
 * Props for NameComponent.
 */
interface NameComponentProps {
  stateName: string; // the state selected by user. Displayed in dashboard.
}

/**
 * Very simple component. Displays the state the user added to the dashboard.
 * @param NameComponentProps 
 */
const NameComponent: React.FC<NameComponentProps> = ({ stateName }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h4" >
        State: {stateName}
      </Typography>
    </div>
  );
};

export default NameComponent;
