
import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardImg, CardTitle, Col, Input, Label, Row, Form, Alert, CardText, CardFooter } from 'reactstrap';
import { sendMessage } from '../lib/apis';
import { useLocation, useNavigate} from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';

const Home = (e) => {
    const { state } = useLocation();
    const [profile, setProfile] = useState('');
    console.log(state);
    const navigate = useNavigate();
    const [message, getUserMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [key, setKey] = useState();
    const [alertMessage, setAlertMessage] = useState('');
    const [visible, setVisible] = useState(false);
    const onDismiss = () => setVisible(false);
    const [authenticated, setAuthenticated] = useState(null);
    useEffect(() => {
        setProfile(state.profile);
        const loggedInUser = localStorage.getItem("authenticated");
        if (loggedInUser) {
            setAuthenticated(loggedInUser);
        }
      }, []);
    const logOut = () => {
        localStorage.setItem('authenticated',false)
        console.log(localStorage.getItem('authenticated'))
        googleLogout();
        navigate('/')

    };
    const onSendButtonClick = async (e) => {
        if (message != '') {
            await sendMessage(message).then((res) => {
                console.log("res");
                console.log(res);
                if (res.success == true) {
                    setKey(Number(key) + 1);
                    setMessages(messages => [...messages, <Col key={key} lg={12} className='mt-2'>
                        <span className='bg-success px-3 py-2 rounded-pill text-white' style={{ float: "right" }}>{message}</span>
                    </Col>]);
                    setKey(Number(key) + 1);
                    setMessages(messages => [...messages, <Col key={key} lg={12} >
                        <span className='bg-dark px-3 py-2 rounded-pill text-white mt-2'>{res.data.message}</span>
                    </Col>]);
                    getUserMessage(" ");
                }
                else {
                    setAlertMessage(res.data.message);
                    setVisible(true);
                }
            });
        }

    }
    return (
        <>
            <div className='container'>
            <Row>
            
                                            
            <Col lg={8}>
                    <Card className="my-2 " outline color='primary'>
                        <CardImg
                            alt="Card image cap"
                            src={require('./../assets/images/openai-blue.png')}
                            style={{
                                height: 380
                            }}
                            top
                            width="100%"
                        />
                        <CardBody>
                            <Alert color="danger" isOpen={visible} toggle={onDismiss}>
                                {alertMessage}
                            </Alert>
                            <div className='border p-4'>
                                <CardTitle tag="h5">
                                    Start Your Chat With OpenAi
                                </CardTitle>
                                <Form>
                                    <Row className="row-cols-lg-auto g-3 align-items-center">
                                        <Col lg={11} >
                                            <Row>
                                                {messages}

                                            </Row>
                                        </Col>
                                        <Col lg={11} className='mt-5' >
                                            <Label
                                                className="visually-hidden"
                                                for="exampleEmail"
                                            >
                                                Email
                                            </Label>
                                            <Input
                                                id="exampleEmail"
                                                name="email"
                                                placeholder="Type Here"
                                                type="textarea"
                                                style={{ "height": "10px" }}
                                                onChange={(e) => getUserMessage(e.target.value)}
                                                value={message}
                                                className='border border-primary'

                                            />
                                        </Col>
                                        <Col className='mt-5' >
                                            <Button type='button' onClick={onSendButtonClick}>
                                                Submit
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col lg={4}>
                    <Card className='my-2 '>
                        <img
                            alt="Card image cap"
                            src={profile.picture}
                            style={{ width: "200px", height: "200px" }}
                            className=' mx-auto d-flex mb-3 rounded-circle mt-2'
                        />
                        <CardBody className='text-center'>
                           <CardText>Name:{profile.name} </CardText>
                           <CardText>Email:{profile.email}  </CardText>
                        </CardBody>
                        <CardFooter className='border-0 bg-white'>
                        <Button onClick={logOut} outline block color="info" size="lg" >Logout</Button>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
            </div>

        </>
    )

}

export default Home;