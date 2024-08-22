import ControlButton from './ControlButton'
//import 'video.js/dist/video.css'

//import videojs from 'video.js';

//import axios from 'axios';

import messageHub from '../../message-hub';

import {useState,useEffect, useRef} from 'react'
import PropTypes from 'prop-types';
import '~/../assets/css/camera-control.css';
import Control from 'ol/control/Control';
import io from 'socket.io-client';


// export function handleCameraControl (message, dispatch){
//     console.log(message)

//     dispatch(
//         showNotification({
//         message:"Send Messgae to server",
//         semantics:MessageSemantics.SUCCESS,
//         timeout:2000,
//         })
//     )

// }


const VideoPlayer =({rtspUrl})=>{


    // const [socket,setSocket] = useState(null);
    // const [frame,setFrame] = useState('');
    // const [rtspLink, setRtspUrl] = useState('');

    // useEffect(()=>{
    //     const socketio = io('http://localhost:8001')
    //     setSocket(socketio);
    //     setRtspUrl(rtspUrl)

       

    //     socket.on('video_frame',(data)=>{
    //         setFrame('data:image/jpg;base64,'+data.frame);

    //     });

    //     if(socket && rtspLink){
    //         socket.emit('start_streaming',{rtsp_url:rtspLink})
    //     }
    //     return ()=>{
    //         socket.disconnect();
    //     };

    // },[rtspLink]);

    VideoPlayer.propTypes ={
        rtspUrl:PropTypes.string
    }

    return(   

        <>
          <img  src={frame} width="100%" height="100%" alt="RTSP Stream" style={{position:"relative", zIndex:"0"}}  />
        </>
    )

}

const CameraControlPanel = () =>{

    const handleMsg = async(msg) => {
        try{
            const response = messageHub.sendMessage({
                type:"X-CAMERA-CONTROL",
                msg
        })
        console.log(response)
        }catch(e){
            console.log(e)
        }
    }

    return(
        <>
        <div style={{width:"100%", height:"100%", backgroundColor:"Black", color:"white", position:'block'}}>
            <div style={{position:"absolute", height:"98%",width:"98%", zIndex:"1"}}>
                
                <div >
                    <div className='grid-container'>
                        <div></div>
                        <ControlButton DisplayName="Up" onclick={handleMsg.bind(this,"up")} NotifyMessage="Clicked Up" />
                        <div></div>
                        <ControlButton DisplayName="Left" onclick={handleMsg.bind(this,"left")} NotifyMessage="Clicked Left" />
                        <ControlButton DisplayName="Home" onclick={handleMsg.bind(this,"home")} NotifyMessage="Clicked Home" />
                        <ControlButton DisplayName="Right" onclick={handleMsg.bind(this,"right")} NotifyMessage="Clicked Right" />
                        <div></div>
                        <ControlButton DisplayName="Down" onclick={handleMsg.bind(this,"down")} NotifyMessage="Clicked Down" />
                        <div></div>
                    </div>
                    <div>
                        <ControlButton DisplayName="Zoom In" onclick={handleMsg.bind(this,"zoom-in")} NotifyMessage="Clicked Zoom In"/>
                        <ControlButton DisplayName="Zoom Out" onclick={handleMsg.bind(this,"zoom-out")} NotifyMessage="Clicked Zoom Out"/>
                    </div>
                    <div>

                    </div>
                   
                   
                </div>

                
            </div>


            
        </div>

           
        </>
    )
    
}


export default CameraControlPanel