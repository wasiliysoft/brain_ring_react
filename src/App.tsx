import React from 'react';
import Settings from './Settings';
import Game from './Game';
import { AppBar, Typography, makeStyles } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
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
    flexGrow: 1,
    //backgroundColor: 'gray'
  },
  toolbar: theme.mixins.toolbar
}));

const App: React.FC = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <AppBar position="absolute" variant="elevation">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Игра" {...a11yProps(0)} />
          <Tab label="Настройки" {...a11yProps(1)} />
          <Tab label="О программе" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <div className={classes.toolbar} />

      <TabPanel value={value} index={0}>
        <Game />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Settings />
      </TabPanel>
      <TabPanel value={value} index={2}>
        О приложении
      </TabPanel>
    </div>
  );
}

export default App;
