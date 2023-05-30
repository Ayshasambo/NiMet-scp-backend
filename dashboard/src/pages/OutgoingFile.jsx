import React, { useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';
import moment from 'moment';
import { publicRequest } from '../requestMethods';

export default function OutgoingFile() {
    const { fileId } = useParams();
    
    const [file, setFile] = useState(null);
    
    useEffect(() => {
        const getFile = async () => {
          try {
          const res = await publicRequest.get(`/outgoingfile/${fileId}`);
          setFile(res.data)
        }
         catch (err) {
          console.log(err);
        }
      };
      getFile(); 
      }, []);
  
  return (
    <div>
        <div className="card">
            <h4>
                {file?.subject}
            </h4>
            <div>
            <ul>
                 <li>
                    <strong>File Name:</strong> {file?.filename} 
                </li>
                <li>
                    <strong>File Number:</strong> {file?.filenumber} 
                </li>
                <li>
                    <strong> Going To:</strong> {file?.goingto}
                </li>
                <li>
                    <strong>Received By:</strong> {file?.receivedby}
                </li>
                {file?.datereceived &&
               <li>
                    <strong>Date:</strong> {moment(file?.datereceived).format('MMMM Do YYYY, h:mm a')} 
                </li>
                }
                {!file?.datereceived &&
               <li>
                    <strong>Date:</strong> {moment(file?.createdAt).format('MMMM Do YYYY, h:mm a')} 
                </li>
                }
            </ul>
            </div>
        </div>
    </div>
  )
}
