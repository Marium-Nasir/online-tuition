import { useContext } from "react";
import { InfoContext } from "../../Context/InfoProvider";
import { useNavigate } from "react-router-dom";
const AccessByTutor = ({children}) => {
    const {user} = useContext(InfoContext);
    const Navigate = useNavigate()
    if(user.role === 'tutor'||user.role === 'Tutor')
  {return children}
  else{
    Navigate('/')
  }
}
export default AccessByTutor