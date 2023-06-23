
import { useGoogleLogin } from '@react-oauth/google';
import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardImg, CardTitle, Col, Input, Label, Row, Form, FormGroup } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { getUserDataApi, postSignin } from '../lib/apis';
const Login: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState(null);
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });
    useEffect(
        () => {
            if (user) {
                getUserDataApi(user).then((res) => {
                    if (res.status === 200) {
                        let profile = res.data;
                        localStorage.setItem('authenticated', 'true')
                        setProfile(profile);
                        postSignin(profile).then((res) => {
                            if (res.data.success === true) {
                                console.log(res.data.token);
                                localStorage.setItem('token', res.data.token)

                                navigate('/home', { state: { profile: profile } });
                            }
                            else {
                                alert('Error');
                            }
                        }).catch((error) => {
                            console.log(error.message);
                        });;

                    } //res.success is true
                    else {
                        console.log(res)
                    }
                }).catch((error) => {
                    console.log(error.message);
                });
            }
        },
        [user]
    );

    return (
        <>
            <div className='container'>
                <Col lg={5} className='mx-auto mt-5' >
                    <Card className='mt-5 pb-5' >
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
                                <Row className='mt-4'>
                                    {/* </Col> */}
                                    <Col lg={12}>
                                        {/* <Button onClick={logOut} outline block color="warning" size="lg" >
                                            Logout
                                        </Button> */}
                                        <Button className='mt-5' outline block color="primary" size="lg" onClick={() => login()}>Login With Google</Button>
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