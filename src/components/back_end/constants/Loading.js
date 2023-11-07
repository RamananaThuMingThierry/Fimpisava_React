import React from "react";

const Loading = () =>{
  return  (
        <div className="bg-white mt-2 d-flex justify-content-center align-items-center" style={{height: '87vh'}}>
            <div className="text-center">
                <h2 className="text-muted roboto-font">Veuillez patienter s'il vous plaît...!</h2>        
            </div>    
        </div>
    );
};

export default Loading;