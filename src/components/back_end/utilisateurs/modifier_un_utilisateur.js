import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
import BASE_URL from "../../../BasesUrl";
import Loading from "../constants/Loading";
const ModifierUnUtilisateur = (props) =>{

    const history = useHistory();

    const [picture, setPicture] = useState({
        photo:''
    });
    const [loading, setLoading]  = useState(true);
    const [userInput, setUser]= useState([]);
    const [image, setImages] = useState(null);

    useEffect(() =>{ 
        const id = props.match.params.id;
        axios.get(`api/obtenir_un_utilisateur/${id}`).then(res =>{
            if(res.data.status === 200){
                setUser(res.data.user);
                console.log(res.data.user);
            }else if(res.data.status === 400){
                swal("Error", res.data.message, "error");
                history.push("/admin/dashboard");
            }else if(res.data.status === 404){
                swal("Avertissement", res.data.message, "warning");
                history.push("/admin/liste_utilisateurs");
            }else if(res.data.status === 500){
                swal("Error", res.data.message, "error");
                history.push("/admin/dashboard");
            }
            setLoading(false);
        }) .catch(error => {
            swal("Error", "Une erreur s'est produite lors de l'appel à l'API", "error");
        });
    },[props.match.params.id]);

    const handleInput = (e) =>{
        e.persist();

        setUser({...userInput, [e.target.name]: e.target.value});
    }

    const handleImage = e =>{
        e.persist();
        const photo = e.target.files[0];
        setImages(e.target.files[0]);
        setPicture(URL.createObjectURL(photo));
    }

    const ModifierUnUtilisateurSubmit = (e) =>{
        e.preventDefault();

        const id_user = props.match.params.id;

        const formData = new FormData();
        userInput.pseudo = userInput.pseudo ?? '';
        userInput.email = userInput.email ?? '';
        
        if(userInput.pseudo == ''){
            swal("Avertissement", "Veuillez saisir votre pseudo", "warning");
        }else if(userInput.email == ''){
            swal("Avertissement", "Veuillez saisir votre adresse e-mail", "warning");
        }else{
            formData.append('image', image);
            formData.append('pseudo',userInput.pseudo);
            formData.append('email', userInput.email);
            formData.append('roles', userInput.roles);

            console.log(formData);

            axios.post(`api/modifier_un_utilisateur/${id_user}`, formData).then(res =>{
                
                axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';   
                
                if(res.data.status === 200){
                    swal("Success", res.data.message, "success");
                    history.push('/admin/liste_des_utilisateurs');
                }else if(res.data.status === 404){
                    swal("Warning", res.data.message, "warning");
                }else if(res.data.status === 422){
                    swal("Warning", res.data.message, "warning");
                }

            });
        }
    }

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
                            <form onSubmit={ModifierUnUtilisateurSubmit} encType="multipart/form-data">
                                <div className="row">
                                <div className="col-md-4">
                                        <div className="d-flex flex-column justify-content-center align-items-center">
                                            {
                                                picture.photo == '' ?
                                                    <img className="mb-2 rounded-1" src={userInput.image != null ? `${BASE_URL}/${userInput.image}` :  `${process.env.PUBLIC_URL}/images/photo.jpg`} height="200px" width="189px" alt="Image"/>                                          
                                                :
                                            <img className="mb-2 rounded-1" src={picture.picture != picture ? picture :  `${process.env.PUBLIC_URL}/images/photo.jpg`} height="200px" width="189px" alt="Image"/>                                          
                                                }
                                            <input type="file" name="image" onChange={handleImage} className="form-control rounded-0 p-3"/>
                                        </div>
                                    </div>
                                        <div className="col-md-8">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font" for="pseudo">Pseudo</label>
                                                    <input type="text" className="form-control p-3 rounded-0 roboto-font" id="pseudo" placeholder="Veuillez saisir votre pseudo" name="pseudo" value={userInput.pseudo ?? '-'} onChange={handleInput} style={{backgroundColor:'white'}}/>
                                                </div>
                                                <div className="col-md-12">
                                                    <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font form-label" for="email">Adrese e-mail</label>
                                                    <input type="email" id="email" name="email" placeholder="Veuillez saisir votre adresse e-mail" autoComplete="false" className="form-control p-3 rounded-0 roboto-font" value={userInput.email ?? '-'} onChange={handleInput} style={{backgroundColor:'white'}}/>
                                                </div>
                                                <div className="col-md-12">
                                                    <label style={{fontWeight: 'bold', fontSize: '17px'}} className="roboto-font form-label" for="roles">Rôles</label>
                                                    <select className="form-select rounded-0 p-3" name="roles" id="roles" value={userInput.roles == 0 ? 0 : 1} onChange={handleInput}>
                                                    <option value="" selected>Ouvre ce menu de séléction</option>
                                                    <option value="0">Utilisateurs</option>
                                                    <option value="1">Administrateurs</option>
                                                </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="row">
                                        <div className="col-md-4 offset-md-4">
                                            <Link to="/admin/liste_des_utilisateurs" className="btn btn-danger p-3 rounded-0 w-100 roboto-font">Annuler</Link>
                                        </div>
                                        <div className="col-md-4">
                                            <button type="submit" className="btn btn-info p-3 text-white rounded-0 w-100 roboto-font">Valider</button>
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

export default ModifierUnUtilisateur;