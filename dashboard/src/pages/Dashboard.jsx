import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import StatusCard from '../components/status-card/StatusCard'
import { publicRequest } from '../requestMethods';



const Dashboard = () => {
    const [alerts, setAlerts] = useState([]);
    const [impactbaseds, setImpactBaseds] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const getAll = async () => {
          try {
          const resAlert = await publicRequest.get('/alert');
          setAlerts(resAlert.data)
          const resImpactBased = await publicRequest.get('/impactbased');
          setImpactBaseds(resImpactBased.data)
        }
         catch (err) {
          console.log(err);
        }
      };
      getAll();
      }, []);


    const themeReducer = useSelector(state => state.ThemeReducer.mode)

    return (
        <div>
            <h2 className="page-header">Dashboard</h2>
            <div className="row">
                <div className="col-12">
                    <div className="row">
                                <div className="col-6">
                                    <StatusCard
                                        icon={"bx bxs-bell-ring"}
                                        count={alerts?.length}
                                        title={"Alerts"}
                                    />
                                </div>
                                <div className="col-6">
                                    <StatusCard
                                        icon={"bx bxs-cloud-lightning"}
                                        count={impactbaseds?.length}
                                        title={"Impact Based Forecasts"}
                                    />
                                </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
