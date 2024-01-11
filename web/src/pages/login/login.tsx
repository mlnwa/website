import React, { useEffect } from 'react';
import style from './login.module.scss';
import { toLogin } from '../../store/features/authSlice';
import { useDispatch } from 'react-redux';
import store, { AppDispatch } from '../../store';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
const Login = function () {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  useEffect(() => {}, []);
  const onSubmit = async function (e: React.MouseEvent) {
    const res = await dispatch(
      toLogin({
        username,
        password,
      }),
    );
    const loginInfo = store.getState().auth;
    if (loginInfo.status === 'login') {
      navigate('/admin');
    }
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
