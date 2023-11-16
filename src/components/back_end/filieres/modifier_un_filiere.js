import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Loading from "../constants/Loading";
import swal from "sweetalert";
import {Link, useHistory} from "react-router-dom";

const ModifierUnFiliere = (props) => {

    const history = useHistory();
    const [loading, setLoading]= useState([]);
    const [filiere, setfiliere] = useState([]);

    useEffect(() =>{
      const id_filiere = props.match.params.id;
      // setLoading(false);
      axios.get(`api/obtenir_un_filiere/${id_filiere}`).then(res =>{
          if(res.data.status === 200){
              setfiliere(res.data.filiere);
          }else if(res.data.status === 404){
              swal("Error", res.data.message, "error");
              history.push('/admin/liste_des_filieres');
          }
          setLoading(false);
      });

  }, [props.match.params.id, history]);

  const handleInput = (e) =>{
      e.persist();

      setfiliere({...filiere, [e.target.name]: e.target.value});
  }

  const ModifierUnFiliereSubmit = e =>{
    e.preventDefault();

    const id_filiere = props.match.params.id;

    const formData = new FormData();

    filiere.nom_filieres = filiere.nom_filieres ?? '';

    if(filiere.nom_filieres == ''){
        swal("Avertissement", "Veuillez saisir nom du filière !", "warning");
    }else{

        formData.append('nom_filieres', filiere.nom_filieres);
        console.log(formData);

            axios.post(`api/modifier_un_filiere/${id_filiere}`, formData).then(res =>{
                if(res.data.status === 200){
                    swal("Réussi", res.data.message, "success");
                    history.push('/admin/liste_des_filieres');
                }else if(res.data.status === 404){
                    swal("Avertissement", res.data.message, "warning");
                }else if(res.data.status === 422){
                    swal("Avertissement", res.data.message, "warning");
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
            <div className="col-md-6 offset-md-3">
                <div className="card elevation-1 border-0 rounded-0 mt-2">
                    <h3 className="text-center text-muted roboto-font my-3">Modifier un filière</h3>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <div className="card elevation-1 border-0 rounded-0 mt-1">
                    <div className="card-body">
                        <form onSubmit={ModifierUnFiliereSubmit}>
                            <div className="row">
                              <div className="col-md-12">
                                <label style={{fontWeight: 'bold', fontSize: '17px'}} for="nom_filieres" className="roboto-font">Nom</label>
                                <input className="form-control p-3 rounded-0 roboto-font" type="text" autoComplete="false" id="nom_filieres" name="nom_filieres" value={filiere.nom_filieres ?? ''} placeholder="Veuillez saisir le nom du filière" onChange={handleInput}/>
                                <hr className="mt-4"/>
                                <div className="row">
                                    <div className="col-md-4 mt-2 offset-md-4">
                                    <Link to="/admin/liste_des_filieres" className="btn btn-danger p-3 rounded-0 w-100 roboto-font">Annuler</Link>
                                    </div>
                                    <div className="col-md-4 mt-2">
                                        <button type="submit" className="btn btn-info p-3 rounded-0 text-white w-100 roboto-font">Enregistre</button>
                                    </div>
                                </div> 
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

export default ModifierUnFiliere;