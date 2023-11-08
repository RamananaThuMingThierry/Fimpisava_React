import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
import BASE_URL from "../../../BasesUrl";
import Loading from "../constants/Loading";
const AfficherUnMembreFimpisava = (props) =>{

    const history = useHistory();

    const [loading, setLoading]  = useState(true);
    const [afficherUnMembreFimpisava, setMembresFimpisava] = useState([]);

    const fonction_membre = ($valeur) =>{
      if($valeur == "0"){
        return "Présient";
      }else if($valeur == "1"){
        return "Commisaire au compte";
      }else if($valeur == "2"){
        return "Trésorie";
      }else if($valeur == "3"){
        return "Olo tsotra";
      }
    }

    useEffect(() =>{ 
        const id_membre_fimpisava = props.match.params.id;
        axios.get(`api/afficher_un_membre/${id_membre_fimpisava}`).then(res =>{
            if(res.data.status === 200){
                setMembresFimpisava(res.data.membre_fimpisava);
                console.log(res.data.membre_fimpisava);
            }else if(res.data.status === 400){
                swal("Error", res.data.message, "error");
                history.push("/admin/liste_des_membres_fimpisava");
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
                <div className="col-md-10 offset-md-1">
                    <div className="card elevation-1 border-0 rounded-0 mt-2">
                        <h2 className="text-center text-muted roboto-font my-3">Apropos</h2>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-10 offset-md-1">
                    <div className="card elevation-1 border-0 rounded-0 mt-1">
                        <div className="card-body">
                            <div className="row">
                                    <div className="col-md-4">
                                        <div className="d-flex justify-content-center">
                                            <img className="rounded-1" src={afficherUnMembreFimpisava.photo == null ? `${process.env.PUBLIC_URL}/assets/photo.jpg` : `${BASE_URL}/${afficherUnMembreFimpisava.photo}`} height="250px" width="250px" alt="Image"/>                                          
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        {/* Numéro carte et District */}
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">Numéro Carte</label>
                                                <input className="form-control p-3 rounded-0 roboto-font" disabled value={afficherUnMembreFimpisava.numero_carte ?? '-'} style={{backgroundColor:'white'}}/>
                                            </div>
                                            <div className="col-md-6">
                                                <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">District</label>
                                                <input className="form-control p-3 rounded-0 roboto-font" disabled value={afficherUnMembreFimpisava.district} style={{backgroundColor:'white'}}/>
                                            </div>
                                        </div>
                                        {/* Nom et Prénom */}
                                        <div className="row">
                                            <div className="col-md-6 mt-2">
                                                <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">Nom</label>
                                                <input className="form-control p-3 rounded-0 roboto-font" value={afficherUnMembreFimpisava.nom ?? '-'} disabled style={{backgroundColor:'white'}}/>
                                            </div>
                                            <div className="col-md-6 mt-2">
                                                <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">Prénom</label>
                                                <input className="form-control p-3 rounded-0 roboto-font" value={afficherUnMembreFimpisava.prenom} disabled style={{backgroundColor:'white'}}/>
                                            </div>
                                        </div>
                                        {/* Date et lieu de naissance */}
                                        <div className="row">
                                          <div className="col-md-6 mt-2">
                                                <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">Date de naissance</label>
                                                <input className="form-control p-3 rounded-0 roboto-font" value={afficherUnMembreFimpisava.date_de_naissance ?? '-'} disabled style={{backgroundColor:'white'}}/>
                                            </div>
                                            <div className="col-md-6 mt-2">
                                                <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">Lieu de naissance</label>
                                                <input className="form-control p-3 rounded-0 roboto-font" value={afficherUnMembreFimpisava.lieu_de_naissance} disabled style={{backgroundColor:'white'}}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Filière , niveau et profession */}
                                <div className="row">
                                    <div className="col-md-4 mt-2">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">Filières</label>
                                        <input className="form-control p-3 rounded-0 roboto-font" value={afficherUnMembreFimpisava.filieres ?? '-'} disabled style={{backgroundColor:'white'}}/>
                                    </div>
                                    <div className="col-md-4 mt-2">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">Niveau</label>
                                        <input className="form-control p-3 rounded-0 roboto-font" value={afficherUnMembreFimpisava.niveau ?? 'Non'} disabled style={{backgroundColor:'white'}}/>
                                    </div>
                                    <div className="col-md-4 mt-2">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">Profession</label>
                                        <input className="form-control p-3 rounded-0 roboto-font" value={afficherUnMembreFimpisava.profession ?? '-'} disabled style={{backgroundColor:'white'}}/>
                                    </div>
                                </div> 
                                {/* Contact , contact parent ou tuteur et fonction */}
                                <div className="row">
                                    <div className="col-md-4 mt-2">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">Contact</label>
                                        <input className="form-control p-3 rounded-0 roboto-font" value={afficherUnMembreFimpisava.contact ?? '-'} disabled style={{backgroundColor:'white'}}/>
                                    </div>
                                    <div className="col-md-4 mt-2">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">Contact parent ou tuteur</label>
                                        <input className="form-control p-3 rounded-0 roboto-font" value={afficherUnMembreFimpisava.contact ?? '-'} disabled style={{backgroundColor:'white'}}/>
                                    </div>
                                    <div className="col-md-4 mt-2">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">Fonction</label>
                                        <input className="form-control p-3 rounded-0 roboto-font" value={afficherUnMembreFimpisava.fonction == null ? '-': fonction_membre(afficherUnMembreFimpisava.fonction)} disabled style={{backgroundColor:'white'}}/>
                                    </div>
                                </div> 
                                {/* Adresse , facebook et date d'inscription */}
                                <div className="row">
                                    <div className="col-md-4 mt-2">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">Adresse</label>
                                        <input className="form-control p-3 rounded-0 roboto-font" value={afficherUnMembreFimpisava.adresse ?? '-'} disabled style={{backgroundColor:'white'}}/>
                                    </div>
                                    <div className="col-md-4 mt-2">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">Facebook</label>
                                        <input className="form-control p-3 rounded-0 roboto-font" value={afficherUnMembreFimpisava.facebook ?? '-'} disabled style={{backgroundColor:'white'}}/>
                                    </div>
                                    <div className="col-md-4 mt-2">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">Date d'inscription</label>
                                        <input className="form-control p-3 rounded-0 roboto-font" value={afficherUnMembreFimpisava.date_inscription} disabled style={{backgroundColor:'white'}}/>
                                    </div>
                                </div> 
                                <hr className="mt-4"/>
                                <div className="row">
                                    <div className="col-md-4 offset-md-8 mt-2">
                                      <Link to="/admin/liste_des_membres_fimpisava" className="btn btn-primary p-3 rounded-0 w-100 roboto-font">Retour</Link>
                                    </div>
                                </div> 
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default AfficherUnMembreFimpisava;