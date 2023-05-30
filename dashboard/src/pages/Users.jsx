import React, {useState, useEffect} from 'react'
import {Button, Form, Col, Row, Accordion } from 'react-bootstrap';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';        
import { publicRequest } from '../requestMethods';

const Users = () => {
    const [user, setUser] = useState(null);    
    const [userRows, setUserRows] = useState([]);

    useEffect(() => {
      const getUsers = async () => {
        try {
        const res = await publicRequest.get('/user');
        setUserRows(res.data)
        console.log(res.data)
      }
       catch (err) {
        console.log(err);
      }
    };
    getUsers();
    }, []);

    const handleChange = (e) => {
        const value = e.target.value;
        setUser({ ...user, [e.target.name]: value });
      };

      const createUser = async () => {
        try {
        const req = await publicRequest.post(`/user`, {
          'username': user?.username,
          'password': user?.password,
          'designation': user?.designation,
          'fullname': user?.fullname,
          'staffid': user?.staffid 
        });
      } catch (err) {
        return(err)
        
      }
    }
  
    const handleAdd = () => {
        createUser();
    }

    const deleteStaff = async (id) => {
      try {
      const req = await publicRequest.delete(`/user/${id}`);
    } 
    catch (err) {
      return(err)
    }
  }

    const handleDelete = (id) => {   
      deleteStaff(id)
    }
          const columns = [

            {
              field: "staffid",
              headerName: "Staff ID",
              width: 200,
            },
            { field: "fullname", headerName: "Full Name", width: 200 },
            { field: "username", headerName: "Username", width: 200 },
            {
              field: "designation",
              headerName: "Designation",
              width: 160,
            },
            { 
              field: "action",
              headerName: "Action",
              width: 150,
              renderCell: (params) => {
                return (
                  <>
                    <Link to={{pathname: "/user/" + params.row._id, campaign: params.row}}>
                      <button className="button_edit">View</button>
                    </Link>
                    <DeleteOutline
                      className="button_delete"
                      onClick={() => handleDelete(params.row._id)}
                    />
                  </>
                );
              },
            },
          ];


    return (
        <div>
    <div className="addUser">
    <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="1">
          <Accordion.Header><h4>Add User</h4></Accordion.Header>
          <Accordion.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Staff ID</Form.Label>
                <input className="form-control" type="text" name="staffid" onChange={handleChange}/>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Username</Form.Label>
                <input className="form-control" type="text" name="username" onChange={handleChange}/>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <input className="form-control" type="text" name="password" onChange={handleChange}/>
              </Form.Group>
            </Row>
            <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Full Name</Form.Label>
                <input className="form-control" type="text" onChange={handleChange} name="fullname" />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Designation</Form.Label>
                <input className="form-control" type="text" name="designation" onChange={handleChange}/>
              </Form.Group>
            </Row>
            <Button variant="primary" type="submit" onClick={handleAdd}>
              Add
            </Button>
          </Form>
          </Accordion.Body>
        </Accordion.Item>
        </Accordion>
        </div>

            <h3 className="page-header">
                Users
            </h3>
        
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="custom_table">
                            <DataGrid
                                  sortingOrder={['desc']}
                                  disableCheckboxSelection
                                  stickyHeader
                                  rows={userRows}
                                  disableSelectionOnClick
                                  columns={columns}
                                  pageSize={8}
                                  checkboxSelection
                                  getRowId={(r) => r._id}
                                />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Users
