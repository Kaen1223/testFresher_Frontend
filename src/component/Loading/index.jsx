import { HashLoader } from "react-spinners"

const Loading = () => {
    return (
        <div style={{position : 'fixed' , right : '50%' , top: '50%'}}>
             <HashLoader color="#36d7b7" />
        </div>
    )
}

export default Loading