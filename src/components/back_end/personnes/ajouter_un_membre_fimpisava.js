import React, { Fragment, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";

const AjouterUnElecteurMembre = () =>{

    const history = useHistory();
    
    const [picture, setPicture] = useState({
        photo:''
    });
    
    const [image, setImages] = useState(null);

    const [membreInput, setMembres] = useState({
        numero_carte:'',
        nom:'',
        prenom:'',
        sexe:'',
        cin:'',
        axes:'',
        sympathisant:'',
        date_inscription:'',
    });

    const handleInput = (e) =>{
        e.persist();

        setMembres({...membreInput, [e.target.name]: e.target.value});
    }

    const handleImage = e =>{
        e.persist();
        const photo = e.target.files[0];
        setImages(e.target.files[0]);
        setPicture(URL.createObjectURL(photo));
    }

    const AjouterUnElecteurMembreSubmit = (e) =>{
        e.preventDefault();

        const formData = new FormData();

        if(membreInput.numero_carte == ''){
            swal("Warning", "Veuillez saisir votre numéro carte A.E.U.T.N.A !", "warning");
        }else if(membreInput.nom == ''){
            swal("Warning", "Veuillez saisir votre nom !", "warning");
        }else if(membreInput.sexe == ''){
            swal("Warning", "Veuillez séléctionner votre sexe !", "warning");
        }else if(membreInput.cin != '' && membreInput.cin.length != 12){
            swal("Warning", "Votre numéro de C.I.N invalide !", "warning");
        }else if(membreInput.axes == '' && (membreInput.sympathisant == 'Non' || membreInput.sympathisant == '')){
                swal("Warning", "Veuillez séléctionner votre axes !", "warning");
        }else if(membreInput.date_inscription == ''){
            swal("Warning", "Veuillez saisir votre date d'inscription !", "warning");
        }
        else if(membreInput.axes != '' && membreInput.sympathisant == 'Oui'){
                swal("Warning", "Vous n'êtes pas sympathisant !", "warning");
        }else{

            formData.append('photo', image);
            formData.append('numero_carte', membreInput.numero_carte);
            formData.append('nom', membreInput.nom);
            formData.append('prenom', membreInput.prenom);
            formData.append('sexe', membreInput.sexe);
            formData.append('cin', membreInput.cin);
            formData.append('axes', membreInput.axes);
            formData.append('sympathisant', membreInput.sympathisant ?? 'Non');
            formData.append('date_inscription', membreInput.date_inscription);
            
            console.log(formData);
    
            axios.post(`api/ajouter_un_electeur_membre`, formData).then(res =>{
                axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';   
                console.log(res.data);
                if(res.data.status === 200){
                    swal("Réussi", res.data.message, "success");
                    history.push('/admin/liste_des_electeurs_membres');
                }else if(res.data.status === 404){
                    swal("Avertissement", res.data.message, "warning");
                }else if(res.data.status === 422){
                    swal("Avertissement", res.data.message, "warning");
                }
            });
        }
    }

    return (
        <Fragment>
            <div className="row">
                <div className="col-md-10 offset-md-1">
                    <div className="card elevation-1 border-0 rounded-0 mt-2">
                        <h3 className="text-center text-muted my-3 roboto-font">Ajouter un électeur membres A.E.U.T.N.A</h3>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-10 offset-md-1">
                    <div className="card elevation-1 border-0 rounded-0 mt-1">
                        <div className="card-body">
                            <form  onSubmit={AjouterUnElecteurMembreSubmit} id="ELECTEURS_FORM" encType="multipart/form-data">
                                <div className="row">

                                    <div className="col-md-4 mt-2">
                                        <div className="d-flex flex-column justify-content-center align-items-center">
                                            <img className="mb-1 rounded-1" src={picture.photo != '' ? picture :  `${process.env.PUBLIC_URL}/images/photo.jpg`} height="189px" width="189px" alt="Image"/>                                          
                                            <input type="file" name="photo" onChange={handleImage} className="mt-3 form-control rounded-0 p-3"/>
                                        </div>
                                    </div>
                                    <div className="col-md-8">

                                        <div className="row">
                                            <div className="col-md-6 mt-2">
                                                <label for="numero_carte" style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font">Numéro Carte A.E.U.T.N.A</label>
                                                <input className="form-control p-3 rounded-0 roboto-font" type="number" min={1} max={1500} id="numero_carte" autoComplete="false" name="numero_carte" onChange={handleInput} value={membreInput.numero_carte ?? ''} placeholder="Saisir votre numéro de carte AEUTNA"/>
                                            </div>
                                            <div className="col-md-6 mt-2">
                                                <label style={{fontWeight: 'bold', fontSize: '17px'}} for="sexe" className="roboto-font">Sexe</label>
                                                <select className="form-select rounded-0 p-3 roboto-font" name="sexe" id="sexe" value={membreInput.sexe} onChange={handleInput}>
                                                    <option value="" selected>Ouvre ce menu de séléction</option>
                                                    <option value="masculin">Masculin</option>
                                                    <option value="feminin">Féminin</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 mt-2">
                                                <label style={{fontWeight: 'bold', fontSize: '17px'}} for="nom" className="roboto-font">Nom</label>
                                                <input className="form-control p-3 rounded-0 roboto-font" type="text" autoComplete="false" id="nom" name="nom" value={membreInput.nom ?? ''} placeholder="Saisir votre nom" onChange={handleInput}/>
                                            </div>
                                            <div className="col-md-6 mt-2">
                                                <label style={{fontWeight: 'bold', fontSize: '17px'}} for="prenom" className="roboto-font">Prénom</label>
                                                <input className="form-control p-3 rounded-0 roboto-font" type="text" value={membreInput.prenom ?? ''} id="prenom" name="prenom" autoComplete="false" placeholder="Saisir votre prénom" onChange={handleInput}/>
                                            </div>
                                        </div>
                                        <div className="row">    
                                            <div className="col-md-12 mt-2">
                                                    <label style={{fontWeight: 'bold', fontSize: '17px'}} for="cin" className="roboto-font">C.I.N</label>
                                                    <input maxLength={12} minLength={12} className="form-control p-3 rounded-0" id="cin" type="number" onChange={handleInput} value={membreInput.cin ?? ''} autoComplete="false" placeholder="Saisir votre Numéro de C.I.N" name="cin"/>
                                                </div>
                                       </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4 mt-2">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} for="axes" className="roboto-font">Axes</label>
                                        <select className="form-select rounded-0 p-3 roboto-font" name="axes" id="axes" value={membreInput.axes} onChange={handleInput}>
                                            <option value="" selected>Ouvre ce menu de séléction</option>
                                            <option value="Andempona">Andempona</option>
                                            <option value="Andrarony">Andrarony</option>
                                            <option value="Ankavanana">Ankavanana</option>
                                            <option value="Ankavia">Ankavia</option>
                                            <option value="Antalaha ville">Antalaha Ville</option>
                                            <option value="Cap-Est">Cap-Est</option>
                                        </select>
                                    </div>
                                    <div className="col-md-4 mt-2">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} for="sympathisant" className="roboto-font">sympathisant(e)</label>
                                        <select className="form-select rounded-0 p-3 roboto-font" name="sympathisant" id="sympathisant" value={membreInput.sympathisant} onChange={handleInput}>
                                            <option value="" selected>Ouvre ce menu de séléction</option>
                                            <option value="Non">Non</option>
                                            <option value="Oui">Oui</option>
                                        </select>
                                    </div>
                                    <div className="col-md-4 mt-2">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} for="date_inscription" className="roboto-font">Date d'inscription</label>
                                        <input className="form-control p-3 rounded-0 roboto-font" value={membreInput.date_inscription ?? ''} id="date_inscription" name="date_inscription" type="date" onChange={handleInput} autoComplete="false"/>
                                    </div>
                                </div>
                                <hr className="mt-4"/>
                                <div className="row">
                                    <div className="col-md-4 mt-2 offset-md-4">
                                    <Link to="/admin/liste_des_electeurs_membres" className="btn btn-danger p-3 rounded-0 w-100 roboto-font">Annuler</Link>
                                    </div>
                                    <div className="col-md-4 mt-2">
                                        <button type="submit" className="btn btn-info p-3 rounded-0 text-white w-100 roboto-font">Enregistre</button>
                                    </div>
                                </div> 
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default AjouterUnElecteurMembre;