import React from "react";
import {Link} from 'react-router-dom';
const Page403 = () =>{
    return (
    <div className="bg-white mt-2 d-flex justify-content-center align-items-center" style={{height: '87vh'}}>
        <div className="text-center">
            <h1 className="roboto-font">Page 403 | Interdit</h1>
            <h3 className="text-muted roboto-font">Accès refusé. !Comme vous n'êtes pas un administrateur.</h3>   
            <Link to="/" className="rounded-0 btn btn-primary">Retour</Link>     
        </div>    
    </div>
    );
}

export default Page403;