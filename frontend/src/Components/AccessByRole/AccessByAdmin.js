import { useContext } from "react";
import { InfoContext } from "../../Context/InfoProvider";
import { useNavigate } from "react-router-dom";
const AccessByAdmin = ({children}) => {
    const {user} = useContext(InfoContext);
    const Navigate = useNavigate()
    if(user.role === 'admin'||user.role === 'Admin')
  {return children}
  else{
    Navigate('/')
  }
}
export default AccessByAdmin
