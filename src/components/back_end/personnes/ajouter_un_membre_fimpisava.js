import React, { Fragment, useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import Loading from "../constants/Loading";
import { useHistory } from "react-router-dom";

const AjouterUnMembreFimpisava = () =>{

    const history = useHistory();

    const [loading, setLoading] = useState(true);

    const [liste_des_filieres, setliste_des_filieres] = useState([]);    
    
    const [picture, setPicture] = useState({
        photo:''
    });
    
    const [image, setImages] = useState(null);

    const [membreInput, setMembres] = useState({
        numero_carte:'',
        nom:'',
        prenom:'',
        date_de_naissance:'',
        lieu_de_naissance:'',
        filieres:'',
        niveau:'',
        district:'',
        adresse:'',
        profession:'',
        fonction:'',
        contact:'',
        facebook:'',
        telephone:'',
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

    const AjouterUnMembreFIMPISAVASubmit = (e) =>{
        e.preventDefault();

        const formData = new FormData();

        if(membreInput.numero_carte == ''){
            swal("Avertissement", "Veuillez saisir votre numéro carte A.E.U.T.N.A !", "warning");
        }else if(membreInput.district == ''){
            swal("Avertissement", "Veuillez saisir votre district", "warning");
        }else if(membreInput.nom == ''){
            swal("Avertissement", "Veuillez saisir votre nom !", "warning");
        }else if(membreInput.date_de_naissance == ''){
            swal("Avertissement", "Veuillez saisir votre date de naissance !", "warning");
        }else if(membreInput.lieu_de_naissance == ''){
            swal("Avertissement", "Veuillez saisir votre lieu de naissance", "warning");
        }else if(membreInput.filieres == ''){
            swal("Avertissement", "Veuillez saisir votre filieres", "warning");
        }else if(membreInput.filieres != '' && membreInput.niveau == ''){
            swal("Avertissement", "Veuillez saisir votre niveau", "warning");
        }else if(membreInput.profession == ''){
            swal("Avertissement", "Veuillez saisir votre profession", "warning");
        }else if(membreInput.contact != '' && membreInput.contact.length != 10){
            swal("Avertissement", "Votre conctat n'est pas valide!", "warning");
        }else if(membreInput.telephone != '' && membreInput.telephone.length != 10){
            swal("Avertissement", "contact parent n'est pas valide!", "warning");
        }else if(membreInput.adresse == ''){
            swal("Avertissement", "Veuillez saisir votre adresse", "warning");
        }else if(membreInput.date_inscription == ''){
            swal("Avertissement", "Veuillez saisir votre date d'inscription !", "warning");
        }else{

            formData.append('photo', image);
            formData.append('numero_carte', membreInput.numero_carte);
            formData.append('nom', membreInput.nom);
            formData.append('prenom', membreInput.prenom);
            formData.append('date_de_naissance', membreInput.date_de_naissance);
            formData.append('lieu_de_naissance', membreInput.lieu_de_naissance);
            formData.append('filieres', membreInput.filieres);
            formData.append('niveau', membreInput.niveau);
            formData.append('district', membreInput.district);
            formData.append('adresse', membreInput.adresse);
            formData.append('profession', membreInput.profession);
            formData.append('fonction', membreInput.fonction);
            formData.append('contact', membreInput.contact);
            formData.append('facebook', membreInput.facebook);
            formData.append('telephone', membreInput.telephone);
            formData.append('date_inscription', membreInput.date_inscription);
    
            axios.post(`api/ajouter_un_membre_fimpisava`, formData).then(res =>{
                axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';   
                console.log(res.data);
                if(res.data.status === 200){
                    swal("Réussi", res.data.message, "success");
                    history.push('/admin/liste_des_membres_fimpisava');
                }else if(res.data.status === 404){
                    swal("Avertissement", res.data.message, "warning");
                }else if(res.data.status === 422){
                    swal("Avertissement", res.data.message, "warning");
                }
            });
        }
    }

    useEffect(() =>{
        axios.get(`api/liste_des_filieres`).then(res =>{
            if(res.status === 200){
                setliste_des_filieres(res.data.liste_des_filieres);   
            }
         });
        
        setLoading(false);
     },[]);

    if(loading){
       return <Loading/>
    }


    return (
        <Fragment>
            <div className="row">
                <div className="col-md-12">
                    <div className="card elevation-1 border-0 rounded-0 mt-2">
                        <h3 className="text-center text-muted my-3 roboto-font">Ajouter un membre FI.MPI.SAVA</h3>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="card elevation-1 border-0 rounded-0 mt-1">
                        <div className="card-body">
                            <form  onSubmit={AjouterUnMembreFIMPISAVASubmit} id="ELECTEURS_FORM" encType="multipart/form-data">
                                <div className="row">

                                    <div className="col-md-4 mt-2">
                                        <div className="d-flex flex-column justify-content-center align-items-center">
                                            <img className="mb-1 rounded-1" name="photo" src={picture.photo != '' ? picture :  `${process.env.PUBLIC_URL}/assets/photo.jpg`} height="189px" width="189px" alt="Image"/>                                          
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
                                                <label style={{fontWeight: 'bold', fontSize: '17px'}} for="district" className="roboto-font">District</label>
                                                <select className="form-select rounded-0 p-3 roboto-font" name="district" id="district" value={membreInput.district} onChange={handleInput}>
                                                    <option value="" selected>Ouvre ce menu de séléction</option>
                                                    <option value="Sambava">Sambava</option>
                                                    <option value="Andapa">Andapa</option>
                                                    <option value="Vohemar">Vohémar</option>
                                                    <option value="Antalaha">Antalaha</option>
                                                </select>
                                            </div>
                                        </div>
                                        {/* Nom et Prénom */}
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
                                        {/* Date de naissance et Lieu de naissance */}
                                        <div className="row">    
                                            <div className="col-md-6 mt-2">
                                                <label style={{fontWeight: 'bold', fontSize: '17px'}} for="date_de_naissance" className="roboto-font">Date de naissance</label>
                                                <input className="form-control p-3 rounded-0 roboto-font" type="date" autoComplete="false" id="date_de_naissance" name="date_de_naissance" value={membreInput.date_de_naissance ?? ''} placeholder="Saisir votre date de naissance" onChange={handleInput}/>
                                            </div>
                                            <div className="col-md-6 mt-2">
                                                <label style={{fontWeight: 'bold', fontSize: '17px'}} for="lieu_de_naissance" className="roboto-font">Lieu de naissance</label>
                                                <input className="form-control p-3 rounded-0 roboto-font" type="text" value={membreInput.lieu_de_naissance ?? ''} id="lieu_de_naissance" name="lieu_de_naissance" autoComplete="false" placeholder="Saisir votre lieu de naissance" onChange={handleInput}/>
                                            </div>
                                       </div>
                                    </div>
                                </div>
                                {/* Filières , niveau , profession */}
                                <div className="row">
                                    <div className="col-md-4 mt-2">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} for="filieres" className="roboto-font">Filière</label>
                                        <select className="form-select rounded-0 p-3 roboto-font" name="filieres" id="filieres" value={membreInput.filieres} onChange={handleInput}>
                                            <option value="" selected>Ouvre ce menu de séléction</option>
                                            {
                                                liste_des_filieres.map(item => {
                                                    return <option value={item.id}>{item.nom_filieres}</option>
                                                })
                                            }
                                        </select>    
                                    </div>
                                    <div className="col-md-4 mt-2">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} for="niveau" className="roboto-font">Niveau</label>
                                        <select className="form-select rounded-0 p-3 roboto-font" name="niveau" id="niveau" value={membreInput.niveau} onChange={handleInput}>
                                            <option value="" selected>Ouvre ce menu de séléction</option>
                                            <option value="Licence 1">Licence 1</option>
                                            <option value="Licence 2">Licence 2</option>
                                            <option value="Licence 3">Licence 3</option>
                                            <option value="Master 1">Master 1</option>
                                            <option value="Master 2">Master 2</option>
                                        </select>
                                    </div>
                                    <div className="col-md-4 mt-2">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} for="profession" className="roboto-font">Profession</label>
                                        <input className="form-control p-3 rounded-0 roboto-font" type="text" value={membreInput.profession ?? ''} id="profession" name="profession" autoComplete="false" placeholder="Saisir votre profession" onChange={handleInput}/>
                                    </div>
                                </div>
                                {/* Filières , niveau , profession */}
                                <div className="row">
                                    <div className="col-md-4 mt-2">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} for="contact" className="roboto-font">Contact</label>
                                        <input className="form-control p-3 rounded-0 roboto-font" type="number" value={membreInput.contact ?? ''} id="contact" name="contact" autoComplete="false" placeholder="Saisir votre contact" onChange={handleInput}/>
                                    </div>
                                    <div className="col-md-4 mt-2">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} for="telephone" className="roboto-font">Contact parent ou tuteur</label>
                                        <input className="form-control p-3 rounded-0 roboto-font" type="number" value={membreInput.telephone ?? ''} id="telephone" name="telephone" autoComplete="false" placeholder="Saisir votre contact parent ou tuteur" onChange={handleInput}/>
                                    </div>
                                    <div className="col-md-4 mt-2">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} for="fonction" className="roboto-font">Fonction</label>
                                        <select className="form-select rounded-0 p-3 roboto-font" name="fonction" id="fonction" value={membreInput.fonction} onChange={handleInput}>
                                            <option value="" selected>Ouvre ce menu de séléction</option>
                                            <option value="0">Présient</option>
                                            <option value="1">Commisaire au compte</option>
                                            <option value="2">Trésorie</option>
                                            <option value="3">Membre</option>
                                        </select>
                                    </div>
                                </div>
                                {/* Facebook , adresse , date d'inscription */}
                                <div className="row">
                                    <div className="col-md-4 mt-2">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} for="adresse" className="roboto-font">Adresse</label>
                                        <input className="form-control p-3 rounded-0 roboto-font" type="text" value={membreInput.adresse ?? ''} id="adresse" name="adresse" autoComplete="false" placeholder="Saisir votre adresse" onChange={handleInput}/>
                                    </div>
                                    <div className="col-md-4 mt-2">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} for="facebook" className="roboto-font">Facebook</label>
                                        <input className="form-control p-3 rounded-0 roboto-font" type="text" value={membreInput.facebook ?? ''} id="facebook" name="facebook" autoComplete="false" placeholder="Saisir votre contact" onChange={handleInput}/>
                                    </div>
                                    <div className="col-md-4 mt-2">
                                        <label style={{fontWeight: 'bold', fontSize: '17px'}} for="date_inscription" className="roboto-font">Date d'inscription</label>
                                        <input className="form-control p-3 rounded-0 roboto-font" type="date" value={membreInput.date_inscription ?? ''} id="date_inscription" name="date_inscription" autoComplete="false" placeholder="Saisir votre date d'inscription" onChange={handleInput}/>
                                    </div>  
                                </div>
                                <hr className="mt-4"/>
                                <div className="row">
                                    <div className="col-md-4 mt-2 offset-md-4">
                                    <Link to="/admin/liste_des_membres_fimpisava" className="btn btn-danger p-3 rounded-0 w-100 roboto-font">Annuler</Link>
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

export default AjouterUnMembreFimpisava;