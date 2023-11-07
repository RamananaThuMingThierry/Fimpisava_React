import React, { useState } from "react";
import axios from 'axios';
import swal from 'sweetalert';
import { Link, useHistory } from "react-router-dom";

const Login = () =>{  
    const history = useHistory();

    const inputStyle = {
        marginTop: '25px',
        borderRadius: '10px',
        padding: '10px'
    }

    const [LoginInput, setLogin] = useState({
        email: '',
        password:'',
        error_list: [],
    });

    const handleInput = (e) =>{
        e.persist();
        setLogin({...LoginInput, [e.target.name]: e.target.value});
    }

    const LoginSubmit = (e) =>{
        e.preventDefault();

        const data = {
            email: LoginInput.email,
            password: LoginInput.password
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`api/login`, data).then(res =>{
                if(res.data.status  === 200){
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.pseudo);
                    swal("Réussi", res.data.message,"success");
                    history.push("/admin/tableau_de_bord");
                }else if(res.data.status === 401){
                    swal("Avertissement", res.data.message,"warning");
                }
                else{
                    setLogin({...LoginInput, error_list: res.data.Validation_errors});
                }
            });
        });
    }

    return (
        <section className="vh-100" style={{backgroundColor: '#5D6D7E'}}>
            <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col col-xl-10">
                <div className="card rounded-0">
                    <div className="row g-0">
                    <div className="col-md-6 col-lg-5 d-none d-md-block">
                        <img src={`${process.env.PUBLIC_URL}/assets/logo.jpg`}
                        alt="login form" className="img-fluid" style={{borderRadius:'1rem 0 0 1rem', height:'65vh'}}/>
                    </div>
                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                        <div className="card-body p-4 p-lg-5 text-black">

                        <form onSubmit={LoginSubmit}>
                            <div className="d-flex justify-content-center align-items-center mb-3 pb-1">
                            <i className="fas fa-vote-yea fa-2x me-3" style={{color:'#029656'}}></i>
                            <span className="h1 fw-bold mb-0 roboto-font">FI<span style={{color:'#029656'}}>.</span>MPI<span style={{color:'#029656'}}>.</span>SAVA 2023&nbsp;</span>
                            <i className="fas fa-vote-yea fa-2x mr-3" style={{color:'#029656'}}></i>
                            </div>

                            <h5 className="fw-normal mb-3 pb-3 text-center text-muted roboto-font" style={{letterSpacing:'1px'}}>Connectez-vous à votre compte</h5>

                            <div className="form-outline mb-4">
                            <label className="form-label roboto-font" for="email">Adresse e-mail</label>
                            <input type="email" id="email" name="email" value={LoginInput.email} onChange={handleInput} className="form-control roboto-font rounded-0 form-control-lg" />
                            <span className="text-danger small roboto-font">{LoginInput.error_list.email}</span>
                            </div>

                            <div className="form-outline mb-4">
                            <label className="form-label roboto-font" for="password">Mot de passe</label>
                            <input type="password" id="password" name="password" onChange={handleInput} className="form-control rounded-0 roboto-font form-control-lg" />
                            <span className="text-danger small roboto-font">{LoginInput.error_list.password}</span>
                            </div>

                            <div className="pt-1 mb-4 d-flex justify-content-center">
                            <button className="btn btn-dark btn-lg btn-block w-50 rounded-0 roboto-font" style={{fontSize:'15px'}} type="submit">Se connecter</button>
                            </div>
                            <p className="mb-5 text-center roboto-font pb-lg-2" style={{color:'#444'}}>Vous n'avez pas de compte? <Link type="#" to="/register"
                                style={{color:'#029656'}}>S'inscrire</Link></p>
                        </form>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>
    );
}

export default Login;