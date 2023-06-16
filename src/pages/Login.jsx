
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardImg, CardTitle, Col, Input, Label, Row, Form, FormGroup } from 'reactstrap';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
const Login = (e) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [profiles, setProfile] = useState(null);
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });
    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        localStorage.setItem('authenticated', true)
                        setProfile(res.data);
                        navigate('/home');
                    })
                    .catch((err) => console.log(err));
            }
        },
        [user]
    );
    const logOut = () => {
        localStorage.setItem('authenticated', false)
        console.log(localStorage.getItem('authenticated'))
        googleLogout();
        setProfile(null);
    };

    return (
        <>
            <div className='container'>
                <Col lg={5} className='mx-auto mt-5' >
                    <Card className='mt-5' >
                        <CardTitle tag="h3" className='text-center mt-4'>
                            Login
                        </CardTitle>
                        <CardBody>
                            <CardImg
                                alt="Card image cap"
                                src={require('./../assets/images/man.png')}
                                style={{ width: "200px", height: "200px" }}
                                className=' mx-auto d-flex mb-5'
                            />
                            <Form >
                                <FormGroup>
                                    <Label
                                        for="exampleEmail"
                                        hidden
                                    >
                                        Email
                                    </Label>
                                    <Input
                                        id="exampleEmail"
                                        name="email"
                                        placeholder="Email"
                                        type="email"
                                        bsSize="lg"
                                        className="mb-3"
                                    />
                                </FormGroup>
                                {' '}
                                <FormGroup>
                                    <Label
                                        for="examplePassword"
                                        hidden
                                    >
                                        Password
                                    </Label>
                                    <Input
                                        id="examplePassword"
                                        name="password"
                                        placeholder="Password"
                                        type="password"
                                        bsSize="lg"
                                        className="mb-3"
                                    />
                                </FormGroup>
                                {' '}
                                <Row className='mt-4'>
                                    {/* <Col lg={6}> */}
                                        {/* {profiles ? (
                <div>
                    <img src={profiles.picture} alt="user image" />
                    <h3>User Logged in</h3>
                    <p>Name: {profiles.name}</p> 
                    <p>Email Address: {profiles.email}</p>
                </div>
            ) : (
                <Button outline block color="primary" size="lg" onClick={() => login()}>Login With G+</Button>
            )} */}

                                    {/* </Col> */}
                                    <Col lg={12}>
                                        {/* <Button onClick={logOut} outline block color="warning" size="lg" >
                                            Logout
                                        </Button> */}
                                        <Button outline block color="primary" size="lg" onClick={() => login()}>Login With G+</Button>
                                    </Col>
                                </Row>

                            </Form>
                        </CardBody>
                    </Card>
                </Col>


            </div>

        </>
    )

}

export default Login;