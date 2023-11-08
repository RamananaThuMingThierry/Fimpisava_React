import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
import Loading from "./constants/Loading";
import BASE_URL from "../../BasesUrl";
const Profile = (props) =>{

    const history = useHistory();

    const [picture, setPicture] = useState({
        photo:''
    });
    const [loading, setLoading]  = useState(true);
    const [userInput, setUser]= useState([]);
    const [image, setImages] = useState(null);

    const fetchUserId = async () => {
        try {
            const response = await axios.get('/api/getUser');
            if(response.data.status === 200){
                setUser(response.data.user);
                setLoading(false);
            }else{
                swal("Avertissement", response.data.message, "error");
            }
        } catch (error) {
            console.error('Error fetching user ID:', error);
        }
      };

    useEffect(() =>{ 
        fetchUserId(); 
    },[]);

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

    const Logout = (e) =>{
        const thisClicked = e.currentTarget;
        swal({
            title: "Vous êtes sûr?",
            text: "Voulez-vous vraiment se déconnecter ?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            })
            .then((willDelete) => {
            if (willDelete) {
                axios.post(`api/logout`).then(res =>{
                    if(res.data.status === 200){
                        localStorage.removeItem('auth_token');
                        localStorage.removeItem('auth_name');
                        history.push('/');
                        swal("Success", res.data.message, "success"); 
                    }else if(res.data.status === 404){
                        swal("Error", res.data.message, "error");
                        thisClicked.innerHTML = "<i class=\"fas fa-save\"></i>";
                    }
                });
            } else {
                swal("La suppression a été annulé!");
            }
            });

    }

    const ModifierProfileSubmit = (e) =>{
        e.preventDefault();

        const formData = new FormData();
        userInput.pseudo = userInput.pseudo ?? '';
        userInput.email = userInput.email ?? '';
        
        if(userInput.pseudo == ''){
            swal("Avertissement", "Veuillez saisir votre pseudo", "warning");
        }else if(userInput.email == ''){
            swal("Avertissement", "Veuillez saisir votre adresse e-mail", "warning");
        }else{
            formData.append('image', image ?? userInput.image);
            formData.append('pseudo',userInput.pseudo);
            formData.append('email', userInput.email);
            formData.append('roles', userInput.roles);
            console.log(userInput.id);

            axios.post(`api/modifier_profile/${userInput.id}`, formData).then(res =>{
                axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';   
                console.log(res.data);
                if(res.data.status === 200){
                    swal("Success", res.data.message, "success");
                    Logout(e);
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
                            <h2 className="text-center text-muted roboto-font my-3">Mon Profile</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <div className="card elevation-1 border-0 rounded-0 mt-1">
                            <div className="card-body">
                                <form onSubmit={ModifierProfileSubmit} encType="multipart/form-data">
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
                                                    <input type="text" className="form-control robotot-font p-3 rounded-0" value={userInput.roles ==  0 ? 'Utilisateurs' : 'Administrateurs'}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="mt-4"/>
                                    <div className="row">
                                        <div className="col-md-4 mt-2 offset-md-4">
                                            <Link to="/admin/liste_des_utilisateurs" className="btn btn-danger p-3 rounded-0 w-100 roboto-font">Retour</Link>
                                        </div>
                                        <div className="col-md-4 mt-2">
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

export default Profile;