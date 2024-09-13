
import ControlButton from './ControlButton'
//import 'video.js/dist/video.css'

//import videojs from 'video.js';

//import axios from 'axios';

import messageHub from '~/message-hub';

import {useState,useEffect, useRef} from 'react'
import PropTypes from 'prop-types';
import '~/../assets/css/camera-control.css';



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


    VideoPlayer.propTypes ={
        rtspUrl:PropTypes.string
    }

    return(   

    
        <div style={{display:"flex",justifyContent:"center",alignItems:"center", width:"99%" , height:"99%", overflow:"hidden"}}>
            <img style={{ objectFit:"contain",textAlign:"center", maxWidth:"99%", maxHeight:"99%"}} src='http://localhost:8086/video_feed/192.168.6.212'/>
        </div>
    
    )

}

const CameraControlPanel = () =>{

    const handleMsg = async(msg) => {
        try{
                messageHub.sendMessage({
                type:'X-CAMERA-CONTROL',
                camera_ip:'192.168.6.212',
                msg:msg })
                
        }catch(e){
            console.log(e)
        }
    }

    return(
        
        <div className='mastercontainer' style={{width:"100%", height:"100%", backgroundColor:"Black", color:"white", position:'relative'}}>
            <div style={{position:"absolute", height:"100%",width:"100%", zIndex:"1"}}>
                
                <div  style={{position:'absolute', width:"100%", height:"30%", top:"60%"}}>

                    <div className='grid-container' style={{ width:"10%"}}>
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

                    <div style={{width:"10%"}}>
                        <ControlButton DisplayName="Zoom In" onclick={handleMsg.bind(this,"zoom-in")} NotifyMessage="Clicked Zoom In"/>
                        <ControlButton DisplayName="Zoom Out" onclick={handleMsg.bind(this,"zoom-out")} NotifyMessage="Clicked Zoom Out"/>
                    </div>
                   
                   
                </div>

                
            </div>
           

            <VideoPlayer rtspUrl={"localhost"}/>
            


            
        </div>

           
        
    )
    
}


export default CameraControlPanel