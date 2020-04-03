import React from 'react';
import Settings from './Settings';
import Game from './Game';
import { AppBar, Typography, makeStyles, Button, Toolbar } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import AboutApp from './AboutApp';
interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={0}>{children}</Box>}
    </Typography>
  );
}
function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100vw',
    overflow: "hidden"
    //backgroundColor: 'gray'
  },
  tabs: {
    display: "block",
    width: "100%",
  },
  right: {
    display: "block",
    float: "right",
  },
  newGameBtn: {
    marginLeft: theme.spacing(4),
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
  },
  logo: {
    height: theme.spacing(4),
    marginRight: theme.spacing(4),
  },
  toolbar: theme.mixins.toolbar
}));

const App: React.FC = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState<number>(0);
  const [curTime, setCurTime] = React.useState<string>("");


  React.useEffect(() => {
    function updateTime() {
      var d = new Date();
      var h = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
      var m = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
      var n = h + ":" + m;
      setCurTime(n);
    }

    const timer = setInterval(updateTime, 1000);
    return () => {
      clearInterval(timer);
    };
  });
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="absolute" variant="elevation">
        <Toolbar variant="dense">
          <img src="favicon.png" alt="logo" className={classes.logo} />
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example"
            className={classes.tabs}>
            <Tab label="Игра"  {...a11yProps(0)} />
            <Tab label="Настройки" {...a11yProps(1)} />
            <Tab label="О программе" {...a11yProps(2)} />
          </Tabs>

          <div className={classes.right}>
            <Typography variant="h4">{curTime}</Typography>
          </div>
          <div className={classes.right}>
            <Button
              className={classes.newGameBtn}
              variant="outlined"
              color="inherit"
              onClick={() => {
                window.location.reload();
              }}
            >Новая&nbsp;игра</Button>
          </div>

        </Toolbar>


      </AppBar>
      <div className={classes.toolbar} />

      <TabPanel value={value} index={0}>
        <Game />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Settings />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AboutApp />
      </TabPanel>
    </div>
  );
}

export default App;
