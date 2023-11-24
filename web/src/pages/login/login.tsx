import React, { useEffect } from 'react';
import style from './login.module.scss';
import { loginStore } from '../../store/features/loginSlice';
import { useDispatch } from 'react-redux';
import store, { AppDispatch } from '../../store';
import { LoginParam } from '../../api/module/user';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
const Login = function () {
  const dispatch = useDispatch<AppDispatch>();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  useEffect(() => {}, []);
  const onSubmit = async function (e: React.MouseEvent) {
    await dispatch(
      loginStore({
        username,
        password,
      }),
    );
    const loginInfo = store.getState().login;
    console.log(loginInfo);
  };
  return (
    <div className="main">
      <div className="body">
        <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              {/* <Image src="/logo.png" /> */}
              Log-in to your account
            </Header>
            <Form size="large">
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  iconPosition="left"
                  placeholder="Username"
                />
                <Form.Input
                  fluid
                  icon="lock"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                />
                <Button color="teal" fluid size="large" onClick={(e) => onSubmit(e)}>
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              New to us? <a href="#">Sign Up</a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    </div>
  );
};

export default Login;
