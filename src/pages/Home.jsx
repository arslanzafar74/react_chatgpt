
import React from 'react';
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col, FormGroup, Input, Label, Row, Form } from 'reactstrap';
const Home = (e) => {
    return (
        <>
            <div className='container'>
                <Card className="my-2">
                    <CardImg
                        alt="Card image cap"
                        src="https://picsum.photos/900/180"
                        style={{
                            height: 180
                        }}
                        top
                        width="100%"
                    />
                    <CardBody>
                        <CardTitle tag="h5">
                            Start Your Chat With OpenAi
                        </CardTitle>
                        <CardText>
                            Its is totally free.
                        </CardText>
                        <div>

                            <Form>
                                <Row className="row-cols-lg-auto g-3 align-items-center">
                                    <Col lg={12} >
                                    
                                    
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
                                            
                                        />
                                    </Col>
                                    <Col>
                                        <Button>
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