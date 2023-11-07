import React from "react";

function PageDErreur(){
    return (
        <div className="container-fluid bg-white mt-2 d-flex justify-content-center align-items-center" style={{height: '85vh'}}>
            <div className="text-center">
                <h1 className="roboto-font">Page 404 | Page non trouvée</h1>
                <h3 className="text-muted roboto-font">L'URL/la page que vous recherchez est introuvable.</h3>        
            </div>    
        </div>
    );
}

export default PageDErreur;