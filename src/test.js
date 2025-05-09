import React, { useState, useEffect } from 'react';
import Badge from 'react-bootstrap/Badge';
import './PumpCard.css'
import { NozzleArrayModal } from '../../ArrayCreators/NozzleArrayCreator';
import { TotalizerModal } from './PumpModals.js';
import Swal from 'sweetalert2/dist/sweetalert2.js';

//PumpCard Component
export const PumpCard = (props) => {

  const [NozzleArrayModalShow, setNozzleArrayModalShow] = useState(false);
  const [TotalizerModalShow, setTotalizerModalShow] = useState(false);
  const [pumpStatus, setPumpStatus] = useState(props.connectionStatus);
  const [amountResponse, setAmountResponse] = useState(0);
  const [volumeResponse, setVolumeResponse] = useState(0);
  const [priceResponse, setPriceResponse] = useState(0);
  const [productResponse, setProductResponse] = useState("");
  const [statusResponse, setStatusResponse] = useState(1);
  const [alarmResponse, setAlarmResponse] = useState("");
  const [isFillingInfoReceived, setIsFillingInfoReceived] = useState(false);
  const code = props.code;

  useEffect(() => {
    const socket = new WebSocket(`ws://${window.location.hostname}:8080`);

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (code === data.code) {
        if (data.event === 'filling_info') {
          setAmountResponse(data.amount);
          setVolumeResponse(data.volume);
          setPriceResponse(data.price);
          setProductResponse(data.product);
          console.log(data.price)
          setIsFillingInfoReceived(true);
        } else if (data.event === 'nozzle_status') {
          setStatusResponse(data.nozzle_status);
        } else if (data.event === 'pump_status') {
          setPumpStatus(data.is_connected);
        } else if (data.event === 'alarm_status') {
          setAlarmResponse(data.alarm_message);
        }
        
      }
    };

    return () => {
      socket.close();
    };
  }, [code]);

  useEffect(() => {

    if(statusResponse === 1)
    {
      setIsFillingInfoReceived(false); 
    }
    return () => {
    };
  }, [statusResponse]);
  

  function submitPumpsStatus(status) {
  
      //e.preventDefault()
      fetch(`http://${window.location.hostname}:6900/pumps/update`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({id: props.id, is_disconnected: status})
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Response not OK.', response);
        }
        return response.json();
      })
      .then(data => {
        if(data.status_code === 401)
        {
          alert("Session Timed Out");
          window.location.reload(false);
          sessionStorage.clear();
        }
        else if(data.status_code === 200)
        {
          return true;
        }
        })
        .catch((e) => {
          Swal.fire({
            title: 'Error!',
            text: 'Connection problem.',
            icon: 'error',
            confirmButtonText: 'Close',
          });
          return false;
      });
    }

  function statusSubmit() {

    if (props.token.user_record.role !== "Operator")
    {
      pumpStatus ?
    Swal.fire({
      title: 'Are you sure?',
        text: "This will disconnect the pump!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Disconnect'
    }).then((result) => {
      if (result.isConfirmed) {
        if (submitPumpsStatus(true))
        {
          Swal.fire(
            'Disconnected!',
            'Pump is now disconnected.',
            'success')
        }
        }
  })
    : submitPumpsStatus(false);
    }
  }

  function deleteError() {

    if (props.token.user_record.role !== "Operator")
    {
    Swal.fire({
      title: 'Are you sure?',
        text: "This will delete the last pump error.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://${window.location.hostname}:6900/parameters/deleteerror`, {
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify({pump_code: props.code})
        })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Response not OK.', response);
          }
          return response.json();
        })
        .then(data => {
          if(data.status_code === 401)
          {
            alert("Session Timed Out");
            window.location.reload(false);
            sessionStorage.clear();
          }
          else if(data.status_code === 200)
          {
            Swal.fire(
              'Deleted!',
              'Error deleted.',
              'success')
          }
          })
          .catch((error) => {
            console.error('Error:', error);
            Swal.fire({
              title: 'Error!',
              text: 'Connection problem.',
              icon: 'error',
              confirmButtonText: 'Close',
            });
          });
          
        }
  })
    }
  }

  return (
    <>
      <NozzleArrayModal LogoutTimeout={props.LogoutTimeout} token = {props.token} show={NozzleArrayModalShow} onHide={() => setNozzleArrayModalShow(false)} NozzlePumpID={props.id} pumpName={props.name} connectionStatus = {pumpStatus}/>
      <TotalizerModal virtual_totalizer={props.virtual_totalizer} mechanical_totalizer={props.mechanical_totalizer} LogoutTimeout={props.LogoutTimeout} token = {props.token} show={TotalizerModalShow} onHide={() => setTotalizerModalShow(false)} id={props.id} />
      <div className={`PuC ${statusResponse === 0 && !isFillingInfoReceived ? "flashing" : ""}`} style={isFillingInfoReceived && statusResponse === 0 ? {background: "#90EE90"} : (statusResponse === 0 && !isFillingInfoReceived ? {background: "orange"} : {background: "#FFFFFF00"})}>

          <div className='pumpCardSection'>

          <div className='PuCInfo' id="NozzleButton" onClick={() => setNozzleArrayModalShow(true)}>
            <Badge id="NozzleBadge" pill>{props.name} ({props.code})</Badge>
            <Badge id="NozzleBadge" pill><span>Nozzles</span></Badge>
            </div>

            <div style={pumpStatus ? {background: "#7EC8ECAA"} : {background: "#E14B4B"}} id="StatusButton" className='PuCInfo' onClick={() => statusSubmit()}>
            <p className='PumpStatusButton'>Status: </p>
            <Badge id="StatusBadge">{(pumpStatus) ? "Connected" : "Disconnected"}</Badge>
            </div>

            <div id="TotalizerButton" className='PuCInfo' onClick={() => setTotalizerModalShow(true)}>
            <p className='PumpTotalizerButton'><b>Pump Totalizer Data</b></p>
            </div>

            <div style={{ backgroundColor: alarmResponse !== "" ? '#E14B4B' : '#364954' }} id="StatusButton" className='PuCInfo' onClick={() => deleteError()}>
              <p className='pumpButton'>Alarm: </p>
              <Badge className="PumpBadges">
                {alarmResponse}
              </Badge>
            </div>

            <div className='PuCInfo'>
            <p className='pumpButton'>Total: </p>
            <Badge className="PumpBadges">{amountResponse}</Badge>
            </div>

            <div className='PuCInfo'>
            <p className='pumpButton'>Volume: </p>
            <Badge className="PumpBadges">{volumeResponse}L</Badge>
            </div>

            <div className='PuCInfo'>
            <p className='pumpButton'>Unit Price: </p>
            <Badge className="PumpBadges">{`${priceResponse}/L (${productResponse})`}</Badge>
            </div>

            <div className='PuCInfo'>
            <p className='pumpButton'>Approval: </p>
            <Badge className="PumpBadges">{props.approval === 1 ? "Conditional Approval" : "Auto Authorize"}</Badge>
            </div>
          </div>
        </div>
    </>
  );
// if (props.approvalType==="Pre Paid" || props.approvalType === "Post Paid"){
//     return (
//       <>
//       <NozzleArrayModal LogoutTimeout={props.LogoutTimeout} token = {props.token} show={NozzleArrayModalShow} onHide={() => setNozzleArrayModalShow(false)} NozzlePumpID={props.id} idCode={props.idCode} label = {props.label}  connectionStatus = {pumpStatus}/>
//       <TotalizerModal LogoutTimeout={props.LogoutTimeout} token = {props.token} show={TotalizerModalShow} onHide={() => setTotalizerModalShow(false)} NozzlePumpID={props.id} />
//       <div className="PuC" style={statusResponse ? {background: "#FFFFFF00"} : {background: "orange"}}>

//           <div className='pumpCardSection'>

//           <div className='PuCInfo'id="NozzleButton" onClick={() => setNozzleArrayModalShow(true)}>
//             <Badge id="NozzleBadge" pill>{props.label} ({props.pump_identification_code})</Badge>
//           {/*<Badge className= 'tl' pill >{(props.is_disconnected === 0) ? "Connected" : "Disconnected"}</Badge>*/}
//             <Badge id="NozzleBadge" pill>Nozzles: {props.numberOfNozzles}</Badge>
//             </div>

//             <div style={pumpStatus ? {background: "#7EC8ECAA"} : {background: "#E14B4B"}} id="StatusButton" className='PuCInfo' onClick={() => statusSubmit()}>
//             <p className='PumpStatusButton'>Status: </p>
//             <Badge id="StatusBadge">{(pumpStatus) ? "Connected" : "Disconnected"}</Badge>
//             </div>

//             <div id="TotalizerButton" className='PuCInfo' onClick={() => setTotalizerModalShow(true)}>
//             <p className='PumpTotalizerButton'><b>Pump Totalizer Data</b></p>
//             {/*<TotalizerContext.Consumer>
//             {(totalizerData) => <Badge>{totalizerData.totalizer}</Badge>}
//             </TotalizerContext.Consumer>*/}
//             </div>

//             <div className='PuCInfo'>
//             <p className='pumpButton'>Total: </p>
//             <Badge>{amountResponse}</Badge>
//             </div>

//             <div className='PuCInfo'>
//             <p className='pumpButton'>Volume: </p>
//             <Badge>{volumeResponse}L</Badge>
//             </div>

//             <div className='PuCInfo'>
//             <p className='pumpButton'>Unit Price: </p>
//             <Badge>{priceResponse}/L</Badge>
//             </div>

//             <div className='PuCInfo'>
//             <Form.Control size="sm" type="number" placeholder="Preset Amount" name="presetAmount" value={presetAmount.presetAmount} onChange={handleChange} />
//             <Button id="StartButton" size="sm" variant="FFFFFF" title="Start" type="submit" >Start</Button>
//           </div>
//           <div id='PrePaidButtons'>
//             <Button size="sm" variant="danger" title="Suspend" >Suspend</Button>
//             <Button size="sm" variant="secondary" title="Resume" >Resume</Button>
//             </div>
//           </div>
//         </div>
//     </>
//     );
//   }
}
