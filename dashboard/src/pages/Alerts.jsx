import { DataGrid } from '@material-ui/data-grid';
import React, {useState, useEffect, useContext} from 'react'
import {Alert, Button, Form, Col, Row, Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext/AuthContext'
import jwtDecode from 'jwt-decode';
import { publicRequest } from '../requestMethods';


const Alerts = () => {
    // const { user } = useContext(AuthContext);
    // const decodedUser = jwtDecode(user);

    const [alert, setAlert] = useState(null);    
    const [alertRows, setAlertRows] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [successAlert, setSuccessAlert] = useState("");
    const [errorAlert, setErrorAlert] = useState("");
    

    useEffect(() => {
      const getAlerts = async () => {
        try {
        const res = await publicRequest.get('/alert');
        setAlertRows(res.data)
      }
       catch (err) {
        console.log(err);
      }
    };
    getAlerts();
    }, []);

    const handleChange = (e) => {
        const value = e.target.value;
        setAlert({ ...alert, [e.target.name]: value });
      };

      const handleAdd = async (e) => {
        //e.preventDefault()
        try {
        const req = await publicRequest.post(`/alert`, {
          'title': alert?.title,
          'body': alert?.body,
        });
        setSuccessAlert(true)
      } 
      catch (err) {
        setErrorAlert(true)
      }
    }

    const deleteAlert = async (id) => {
      try {
      const req = await publicRequest.delete(`/alert/${id}`);
    } catch (err) {
      return(err)
      
    }
  }

    const handleDelete = (id) => {   
      deleteAlert()
    }


    const columns = [
             
      {
        field: "createdAt",
        headerName: "Date",
        width: 200,
      },
      { field: "title", headerName: "Title", width: 200 },
      { field: "body", headerName: "Body", width: 600 },
    ];


    return (
    <div>
      <div>
      {successAlert &&
      <Alert variant="success" onClose={() => setSuccessAlert(false)} dismissible>
          Alert added successfully
      </Alert>
      }
      </div>
      <div>
      {errorAlert &&
      <Alert variant="danger" onClose={() => setErrorAlert(false)} dismissible>
          Alert not added! Try again
      </Alert>
      }
      </div>
    <div className="addFile">
    <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="1">
          <Accordion.Header><h4>Add Alert</h4></Accordion.Header>
          <Accordion.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Title</Form.Label>
                <input className="form-control" type="text" name="title" onChange={handleChange}/>
              </Form.Group>
            </Row>
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Body</Form.Label>
                <textarea className="form-control" type="text" onChange={handleChange} name="body" rows="8" />
              </Form.Group>
            <Button variant="primary" type="submit" onClick={handleAdd}>
              Add
            </Button>
          </Form>
          </Accordion.Body>
        </Accordion.Item>
        </Accordion>
        </div>

            <h3 className="page-header">
               Alerts
            </h3>
        
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                        <div className="custom_table">
                            <DataGrid
                                  
                                  disableCheckboxSelection
                                  stickyHeader
                                  rows={alertRows}
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
        </div>
    )
}

export default Alerts
