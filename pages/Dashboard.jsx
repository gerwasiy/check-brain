import PrivateRoute from "../components/PrivateRoute";
import Header from "../components/header";


export default function Dashboard(){
    
    
    return (
        <PrivateRoute>
             <Header></Header>   
        </PrivateRoute>
        
    );
}