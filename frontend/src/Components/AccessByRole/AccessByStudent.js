import { useContext } from "react";
import { InfoContext } from "../../Context/InfoProvider";
import { useNavigate } from "react-router-dom";
const AccessByStudent = ({children}) => {
    const {user} = useContext(InfoContext);
    console.log(user);
    const Navigate = useNavigate()
    if(user.role === 'student'||user.role === 'Student')
  {return children}
  else{
    Navigate('/')
  }
}
export default AccessByStudent