
import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardImg, CardTitle, Col, Input, Label, Row, Form, Alert, CardText, CardFooter } from 'reactstrap';
import { sendMessage } from '../../lib/apis';
import { useLocation, useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import LogoutSection from './LogoutSection'
interface ChildProps {
    text: string;
    type:number;
  }
const Home: React.FC = () => {
    const { state } = useLocation();
    const [profile, setProfile] = useState<any>('');
    const navigate = useNavigate();
    const [message, getUserMessage] = useState('');
    const [messages, setMessages] = useState<ChildProps[]>([]);
    const [alertMessage, setAlertMessage] = useState('');
    const [visible, setVisible] = useState(false);
    const onDismiss = () => setVisible(false);
    useEffect(() => {
        setProfile(state.profile);
    }, []);
    const logOut = () => {
        localStorage.setItem('authenticated', 'false')
        console.log(localStorage.getItem('authenticated'))
        googleLogout();
        navigate('/')

    };
    const onSendButtonClick = async () => {
        if (message !== '') {
            setMessages(messages=>[...messages,{text: message, type:1}]);
            await sendMessage(message).then((res) => {
                console.log(res);
                if(res.status === 200)
                {
                    if (res.data.success === true) {
                        setMessages(messages=>[...messages,{text: res.data.message, type:2}]);
                        getUserMessage(" ");
                    }
                    else {
                        setAlertMessage(res.data.message);
                        setVisible(true);
                    }
                }
            }).catch((error) => {
                return error.response;
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
                                src={require('./../../assets/images/openai-blue.png')}
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
                                                    {messages.map((msg, index) =>
                                                        <>
                                                            {msg.type == 1?(
                                                                <Col lg={12} className='mt-2'>
                                                                <span className='bg-success px-3 py-2 rounded-pill text-white' style={{ float: "right" }}>{msg.text}</span>
                                                                </Col>
                                                            ):
                                                            (
                                                                <Col lg={12} >
                                                                <span className='bg-dark px-3 py-2 rounded-pill text-white mt-2'>{msg.text}</span>
                                                            </Col>
                                                            )}
                                                           
                                                           
                                                        </>
                                                    )}


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
                       {/* Login Section */}
                       <LogoutSection profile={profile} logOut={() => logOut()}/>

                    </Col>
                </Row>
            </div>

        </>
    )

}

export default Home;