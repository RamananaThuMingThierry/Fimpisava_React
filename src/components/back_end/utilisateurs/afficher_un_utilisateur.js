import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
import BASE_URL from "../../../BasesUrl";
import Loading from "../constants/Loading";
const AfficherUnUtilisateur = (props) =>{

    const history = useHistory();

    const [loading, setLoading]  = useState(true);
    const [showuser, setShowUser] = useState([]);

    useEffect(() =>{ 
        const id = props.match.params.id;
        axios.get(`${BASE_URL}/api/afficher_un_utilisateur/${id}`).then(res =>{
            if(res.data.status === 200){
                setShowUser(res.data.user);
                console.log(res.data.user);
            }else if(res.data.status === 400){
                swal("Error", res.data.message, "error");
                history.push("/admin/tableau_de_bord");
            }
            setLoading(false);
        }) .catch(error => {
            swal("Error", "Une erreur s'est produite lors de l'appel à l'API", "error");
        });
    },[props.match.params.id]);

    if(loading){
        return <Loading/>
    }

    return (
        <Fragment>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <div className="card elevation-1 border-0 rounded-0 mt-2">
                        <h2 className="text-center text-muted roboto-font my-3">Informations</h2>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <div className="card elevation-1 border-0 rounded-0 mt-1">
                        <div className="card-body">
                            <div className="row">
                                    <div className="col-md-4">
                                        <div className="d-flex justify-content-center">
                                            <img style={{borderRadius: '5px'}} src={showuser.image == null ? `${process.env.PUBLIC_URL}/assets/photo.jpg` : `${BASE_URL}/${showuser.image}`} height="250px" width="250px" alt="Image"/>                                          
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">Pseudo</label>
                                                <input className="form-control p-3 rounded-0 roboto-font" disabled value={showuser.pseudo ?? '-'} style={{backgroundColor:'white'}}/>
                                            </div>
                                            <div className="col-md-12">
                                                <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">Adrese e-mail</label>
                                                <input className="form-control p-3 rounded-0 roboto-font" value={showuser.email ?? '-'} disabled style={{backgroundColor:'white'}}/>
                                            </div>
                                            <div className="col-md-12">
                                                <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">Rôles</label>
                                                <input className="form-control p-3 rounded-0 roboto-font" value={showuser.roles == 0 ? 'Utilisateurs' : 'Administrateurs'} disabled style={{backgroundColor:'white'}}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr/>
                                <div className="row">
                                    <div className="col-md-4 offset-md-8">
                                      <Link to="/admin/liste_des_utilisateurs" className="btn btn-danger p-3 rounded-0 w-100 roboto-font">Retour</Link>
                                    </div>
                                </div> 
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default AfficherUnUtilisateur;