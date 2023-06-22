import { Button, Card, CardBody, CardFooter, CardText } from "reactstrap"
import { PropsWithChildren } from 'react';

interface LogoutSectionProps {
    logOut: () => void;
    profile:{
        picture:string;
        name:string;
        email:string;
    }
  }
 const LogoutSection: React.FC<PropsWithChildren<LogoutSectionProps>> = ({
    logOut,
    profile
 }) => {


    return (
        <Card className='my-2 '>
            <img
                alt="Card  cap"
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
    )
}
export default LogoutSection;

