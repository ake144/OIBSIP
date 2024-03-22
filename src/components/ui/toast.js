import React from 'react';
import { toast } from 'react-toastify';
import GreenIcon from './green';
import RedAlertIcon from './red';

const CustomToast = ({ message, type }) => {
  const icon = type === 'success' ? <GreenIcon /> : <RedAlertIcon />;

  return toast[type](<div>{message}</div>, {
    position: 'top-right',
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
  });
};

export default CustomToast;
