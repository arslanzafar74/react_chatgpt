
import React, { useState } from 'react';
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col, Input, Label, Row, Form } from 'reactstrap';
import { sendMessage } from '../lib/apis';

const Home = (e) => {

    const [message, getUserMessage] = useState('');
    const [conversation, setConversation] = useState('');
    const [messages, setMessages] = useState([]);
    const [key, setKey] = useState();

    const onSendButtonClick = async (e) => {

        if(message != '')
        {
            await sendMessage(message).then((res) => {
                console.log("res");
                console.log(res);
                if (res.success == false) {
                    setKey(Number(key) + 1);
                    setMessages(messages => [...messages, <Col key={key} lg={12} className='mt-2'>
                        <span className='bg-success px-3 py-2 rounded-pill text-white' style={{ float: "right" }}>{message}</span>
                    </Col>]);
                    setKey(Number(key) + 1);
                    setMessages(messages => [...messages,  <Col key={key} lg={12} >
                        <span className='bg-dark px-3 py-2 rounded-pill text-white mt-2'>{res.data.message}</span>
                        </Col>]);
                    getUserMessage(" ")
                }
                else {
                    alert(res.data.message);
                }
            });
        }
        
    }
    return (
        <>
            <div className='container'>
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
                                            className='border'

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

            </div>

        </>
    )

}

export default Home;