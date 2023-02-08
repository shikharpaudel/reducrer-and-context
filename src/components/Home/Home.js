import React,{useContext} from 'react';
import AuthProvider from '../store/auth-provider';
import Button from '../UI/Button/Button';

import Card from '../UI/Card/Card';
import classes from './Home.module.css';

const Home = (props) => {
  const ctx = useContext(AuthProvider);
  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <Button onClick = {ctx.onLogout}>LogOut</Button>
    </Card>
  );
};

export default Home;
