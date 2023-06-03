import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import IsLogin from "./IsLogin"
import Page403 from "../403_Page/403_Page"

const ProtectedRoute = (props) => {
    const {dataUser} = props


    if( dataUser && dataUser.user.role == 'USER' ) {
        return (<>
                 <Page403/>
          </>)
    }else {
        return (
            <>
            {dataUser.isAuthenticated == true ? <>{props.children}</> :   <IsLogin/>}
            </>
        )
    }
  
}
//<Navigate to='/login' replace />} 
export default ProtectedRoute