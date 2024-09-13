import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch} from 'react-redux';
import { showNotification } from '~/features/snackbar/actions';
import { MessageSemantics } from '~/features/snackbar/types';
import '~/../assets/css/camera-control.css';
import messageHub from '~/message-hub';



const ControlButton = ({DisplayName,NotifyMessage, onclick}) => {
  const dispatch = useDispatch();

  
  const handleClick =  async (event) => {
    onclick()
    
    
    
    

    

    // dispatch(
    //   showNotification({
    //   message:NotifyMessage,
    //   semantics:MessageSemantics.SUCCESS,
    //   timeout:2000,
    //   })
    // )
  }

  ControlButton.propTypes ={
    DisplayName: PropTypes.string,
    NotifyMessage: PropTypes.string,
    onlcick: PropTypes.func
 
  }

  return (
    <button className="button-t" onClick={handleClick}>{DisplayName}</button>
  );
};

export default ControlButton;