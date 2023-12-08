import React,{useState} from 'react'
import SpeedDial from '@mui/material/SpeedDial';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { SpeedDialAction } from '@mui/material';
import {useNavigate} from 'react-router-dom'
import { LogOutUser } from '../../../ReduxToolkitStore/Slices/UserSlice';
import {useDispatch} from 'react-redux'
// import Input from '@mui/material/Input';

const UserOptions = ({user}) => {

    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    const orders = () =>{
        navigate('/orders')
    }

    const Account = () =>{
        navigate('/Account')
    }
   
    const dispatch = useDispatch()
   
    const Logout = () =>{
        LogOutUser(dispatch,navigate)
        
        console.log('logged out successfully');
    }
 
    const DashBoard = () =>{
        navigate('/DashBoard')
    }

    const options = [
        {icon:<ListAltIcon/>,name:'Orders',func: orders},
        {icon:<PersonIcon/>,name:'Account',func: Account},
        {icon:<ExitToAppIcon/>,name:'LogOut',func: Logout},
        
    ]

    if(user.roll === 'admin'){

        options.unshift({icon:<DashboardIcon/>,name:'Dash-Board',func: DashBoard},)
    }

  return (
    
    
    <>
    <SpeedDial
    ariaLabel='SpeedDial tooltip example'
    onClose={()=> setOpen(false)}
    onOpen={()=>setOpen(true )}
    open={open}
    direction='down'
    className='speedDial'
    icon={
         <img
    src={user.avatar.url ? user.avatar.url : '/Profile.png'}
    className='speedDialImg'
    alt='profile img'
    />
 }
    >
        {options && options.map((item,index)=>(
            <SpeedDialAction
            icon={item.icon}
            tooltipTitle={item.name}
            key={index}
            onClick={item.func}
            />
        ))}
    </SpeedDial>
        
    </>
  )
}

export default UserOptions