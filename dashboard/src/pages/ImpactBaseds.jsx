import { DataGrid } from '@material-ui/data-grid';
import React, {useState, useEffect} from 'react'
import {Alert, Button, Form, Col, Row, Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { publicRequest } from '../requestMethods';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import firebase from '../firebase';
import moment from 'moment/moment';

const ImpactBaseds = () => {
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [successAlert, setSuccessAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [fileRows, setFileRows] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [impactbased, setImpactBased] = useState("")
    
  var today = new Date();
  var mindate = today.setDate(today.getDate()-10);
  var maxdate = today.setDate(today.getDate()+13);
    
  const alertStartDate = moment(startDate).format("Do MMM")
  const alertEndDate = moment(endDate).format("Do MMM YYYY")

  
  const handleAdd = async (e) => {
    //e.preventDefault()
    try {
    const addFile = await publicRequest.post(`/impactbased`, {
      'startdate': startDate,
      'enddate': endDate,
    });
        
    const addAlert = await publicRequest.post(`/alert`, {
      'title': 'Impact Based',
      'body': `Impact Based Forecast valid from ${alertStartDate} to ${alertEndDate} is now available`,
    });

    addFile();
    addAlert();
    setSuccessAlert(true)
    } 
    catch (err) {
    setErrorAlert(true)
  }
}
  
    useEffect(() => {
      const getFiles = async () => {
        try {
        const res = await publicRequest.get('/impactbased');
        setFileRows(res.data)
        console.log(res.data)
      }
       catch (err) {
        console.log(err);
      }
    };
    getFiles();
    }, []); 

  
    const deleteFile = async (id) => {
      try {
      const req = await publicRequest.delete(`/incomingfile/${id}`);
    } catch (err) {
      return(err)
      
    }
  }
   
  
    const columns = [
      {
        field: "advisory",
        headerName: "Advisory",
        width: 400,
      },       
      {
        field: "startdate",
        headerName: "Start Date",
        width: 400,
      },
      { field: "enddate", headerName: "End Date", width: 400 },

      { 
        field: "action",
        headerName: "Action",
        width: 140,
        renderCell: (params) => {
          return (
            <>
              {/* <Link to={{pathname: "/outgoingfile/" + params.row._id, file: params.row, fileId: params.row._id}}>
                <button className="button_edit">View</button>
              </Link> */}
              {/* <DeleteOutline
                className="button_delete"
                onClick={() => handleDelete(params.row._id)}
              /> */}
            </>
          );
        },
      },
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
          <Accordion.Header><h4>Add Impact Based Alert</h4></Accordion.Header>
          <Accordion.Body>
          <Form>
            <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridDescription">
                <Form.Label>Advisory</Form.Label>
                <select class="form-select" label="Advisory">
                   <option selected>SELECT</option>
                    <option value="watch">WATCH</option>
                    <option value="caution">CAUTION</option>
                    <option value="danger">DANGER</option>
                  </select>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridDescription">
                <Form.Label>Start Date</Form.Label>
                <DatePicker
                      className="form-control"
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      minDate={mindate}
                      maxDate={maxdate}
                      placeholderText="Select a date"
                    />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridDescription">
                <Form.Label>End Date</Form.Label>
                <DatePicker
                      className="form-control"
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      minDate={mindate}
                      maxDate={maxdate}
                      placeholderText="Select a date"
                    />
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
               Impact Based Alerts
            </h3>
        
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                        <div className="custom_table">
                            <DataGrid
                                  sortingOrder={['desc']}
                                  disableCheckboxSelection
                                  stickyHeader
                                  rows={fileRows}
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

export default ImpactBaseds
