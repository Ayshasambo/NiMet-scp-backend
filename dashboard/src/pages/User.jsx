import React, { useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';
import {Button, Form, Col, Row, Accordion } from 'react-bootstrap';
import { publicRequest } from '../requestMethods';

export default function User() {
    const { userId } = useParams();
    
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        const getUser = async () => {
          try {
          const res = await publicRequest.get(`/user/find/${userId}`);
          setUser(res.data)
        }
         catch (err) {
          console.log(err);
        }
      };
      getUser();
      }, []);
  
      const handleChange = (e) => {
        const value = e.target.value;
        setUser({ ...user, [e.target.name]: value });
      };
  
      const updateUser = async () => {
        const newuser = user;
          try {
          const req = await publicRequest.put(`/user/${userId}`, newuser);
        } catch (err) {
          return(err)
        }
      }
  
      const handleUpdate = (e) =>{
        updateUser();
      }


  return (
    <div>
        <div className="card">
            <h4>
                {user?.staffid}
            </h4>
            <div>
            <ul>
                 <li>
                    <strong>Full Name:</strong> {user?.fullname} 
                </li>
                <li>
                    <strong>Username:</strong> {user?.username} 
                </li>
                <li>
                    <strong> Designation:</strong> {user?.designation}
                </li>
            </ul>
            </div>
        </div>

        <div className="addUser">
    <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="1">
          <Accordion.Header><h4>Edit User</h4></Accordion.Header>
          <Accordion.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Staff ID</Form.Label>
                <input className="form-control" type="text" name="staffid" placeholder={user?.staffid} onChange={handleChange}/>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Username</Form.Label>
                <input className="form-control" type="text" name="username" placeholder={user?.username} onChange={handleChange}/>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <input className="form-control" type="text" name="password" onChange={handleChange}/>
              </Form.Group>
            </Row>
            <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Full Name</Form.Label>
                <input className="form-control" type="text" onChange={handleChange} placeholder={user?.fullname} name="fullname" />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Designation</Form.Label>
                <input className="form-control" type="text" name="designation" placeholder={user?.designation} onChange={handleChange}/>
              </Form.Group>
            </Row>
            <Button variant="primary" type="submit" onClick={handleUpdate}>
              Update
            </Button>
          </Form>
          </Accordion.Body>
        </Accordion.Item>
        </Accordion>
        </div>

    </div>
  )
}
