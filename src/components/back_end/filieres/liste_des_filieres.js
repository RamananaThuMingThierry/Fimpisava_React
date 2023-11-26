import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, ModalHeader } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import {Link, useHistory} from "react-router-dom";
import swal from "sweetalert";
import Loading from "../constants/Loading";

const ListeDesFilieres = () =>{

    const history = useHistory();

    /*---------------------------------------- Ajouter Filières -----------------------------------------*/
  const [showModal, setShowModal] = useState(false);
  const [nouveau_filiere, setNouveauFilieres] = useState({
    nom: '',
  });

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNouveauFilieres((prevFiliere) => ({
      ...prevFiliere,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
        setLoading(true);
        await axios.post(`/api/ajouter_un_filiere`, nouveau_filiere).then(res =>{
            axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';   
            if(res.data.status === 200){
                searchInput.search = '';
                axios.get(`api/liste_des_filieres`).then(res =>{
                    if(res.data.status === 200){
                        setliste_des_filieres(res.data.liste_des_filieres);   
                    }
                });
                swal("Réussi", res.data.message, "success");
                history.push('/admin/liste_des_filieres');
            }else if(res.data.status === 404){
                swal("Avertissement", res.data.message, "warning");
            }
            setLoading(false);
        });
      handleCloseModal();
    } catch (error) {
      console.error('Erreur d\'ajouter de filière', error);
    }
  };
    /*---------------------------------------- Fin Ajoudter Filières -----------------------------------------*/

    const [loading, setLoading] = useState(true);
    
    const [searchInput, setSearch] = useState({
        search:''
    });

    const handleInput = (e) =>{
        e.persist();
        setSearch({...searchInput, [e.target.name]: e.target.value});
    }

    const [liste_des_filieres, setliste_des_filieres] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = liste_des_filieres.slice(firstIndex, lastIndex);
    const npage = Math.ceil(liste_des_filieres.length / recordsPerPage);
    const numbers = [...Array(npage +1).keys()].slice(1);
    
    const [user, setUser] = useState([]);

    const  handlePageClick = (data) => {
        setCurrentPage(data.selected + 1);
    }

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
            console.error('Erreur lors de la récupération de l\'id utilisateur:', error);
        }
      };

    useEffect(() =>{
        axios.get(`api/liste_des_filieres`).then(res =>{
            if(res.status === 200){
                setliste_des_filieres(res.data.liste_des_filieres);   
            }
         });
        fetchUserId();
     },[]);

    if(loading){
       return <Loading/>
    }


    const Acutaliser = (e) =>{
        e.preventDefault();
        
        searchInput.search = '';

        axios.get(`api/liste_des_filieres`).then(res =>{
            if(res.status === 200){
                setliste_des_filieres(res.data.liste_des_filieres);   
            }
         });
    }
    
    const RechercheFiliereSubmit = (e) =>{
        e.preventDefault();

        const data = {
            search: searchInput.search,
            select: searchInput.select
        }

        if(data.search == ''){
            swal("Warning", "Veuillez entrer la valuer à recherche !", "warning");
        }else{
            axios.get(`api/recherche_un_filiere/${data.search}`).then(res =>{
                console.log(res.data);
                if(res.data.status  === 200){
                    console.log(res.data.recherche_un_filiere);
                    setliste_des_filieres(res.data.recherche_un_filiere);
                }else if(res.data.status === 400){
                    swal("Info", res.data.message,"info");
                }else if(res.data.status === 404){
                    swal("Avertissement", res.data.message,"warning");
                }
            });
        }
    }

    const SupprimerUnFiliere = (e, id) =>{
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Suppression";

        swal({
            title: "Vous êtes sûr?",
            text: "Voulez-vous vraiment supprimer ce filière ?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                axios.post(`api/supprimer_un_filiere/${id}`).then(res =>{
                    if(res.data.status === 200){
                        swal("Réuissi", res.data.message, "success");
                        Acutaliser(e); 
                    }else if(res.data.status === 404){
                        swal("Erreur", res.data.message, "error");
                        thisClicked.innerHTML = "<i class=\"fas fa-trash\"></i>";
                    }
                });
            } else {
              swal("La suppression a été annulé!");
              thisClicked.innerHTML = "<i class=\"fas fa-trash\"></i>";
            }
          });      
    }

    return (
        <Fragment>
                <div>
                {/* Bootstrap Modal */}
                <Modal show={showModal} className="rounded-0" style={{borderRadius:'0px'}} onHide={handleCloseModal}>
                    {/* Modal content */}
                    {/* ... (previous modal code) */}
                    <Modal.Header className="d-flex justify-content-center">
                        <h2 className="roboto-font text-muted">AJOUTER FILIERE</h2>
                    </Modal.Header>
                    <Modal.Body className="rounded-0">
                    {/* Form to add a new product */}
                    <form>
                        <div className="form-group">
                        <label className="roboto-font label-control" for="nom">Nom</label>
                        <input
                            type="text"
                            className="form-control rounded-0 roboto-font"
                            name="nom"
                            id="nom"
                            autoComplete="false"
                            autoFocus="true"
                            value={nouveau_filiere.name}
                            onChange={handleInputChange}
                        />
                        </div>
                        {/* Add other form fields as needed */}
                    </form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="danger" onClick={handleCloseModal} className="rounded-0">
                        Annuler
                    </Button>
                    <Button variant="primary" onClick={handleSaveChanges} className="rounded-0">
                        Enregistre
                    </Button>
                    </Modal.Footer>
                </Modal>
                </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="card mt-2 p-2 rounded-0">
                        <div className="d-flex justify-content-between align-items-center">
                            <h3 className="roboto-font text-muted text-center mt-2">
                                LISTE DES FILIERES
                            </h3>
                            <div className="d-flex justify-content-between align-items-center">
                                <button onClick={Acutaliser} className="btn rounded-0 btn-primary btn-md mt-1"><i className="fas fa-refresh"></i></button>
                                <span>&nbsp;</span>
                                <Button variant="success" type="button" className="btn rounded-0 mt-1" onClick={handleShowModal}>
                                    <i className="fas fa-user-plus"></i>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="card mt-1 p-2 rounded-0">
                       <form onSubmit={RechercheFiliereSubmit}>
                            <div className="input-group">
                                <input type="search" name="search" className="roboto-font form-control rounded-0" placeholder="Recherche" value={searchInput.search} onChange={handleInput} aria-label="Search" aria-describedby="search-addon" />
                                <button type="submit" className="btn btn-outline-primary rounded-0 roboto-font">Recherche</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="card mt-1 rounded-0">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th className="roboto-font">Noms</th>
                                    <th className="roboto-font text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    records.map(item => {
                                        return (
                                            <tr key={item.id}>
                                                <td className="roboto-font">{item.nom_filieres ?? '-'}</td>
                                                <td className="text-center">
                                                    <div className="btn-group btn-group-md">
                                                    <Link to={`modifier_un_filiere/${item.id}`} className="btn btn-primary rounded-0 btn-md ml-2"><i className="fa fa-edit"></i></Link>
                                                    <button className="rounded-0 btn btn-danger btn-md d-inline" onClick={(e) => SupprimerUnFiliere(e, item.id)}><i className="fas fa-trash"></i></button>
                                                    </div>
                                                </td>

                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <ReactPaginate 
                            previousLabel={'<<'}
                            nextLabel={'>>'}
                            breakLabel={'...'}
                            pageCount={numbers.length}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={1}
                            onPageChange={handlePageClick}
                            containerClassName={'pagination mt-4 justify-content-center'}
                            pageClassName={'page-item roboto-font'}
                            pageLinkClassName={'page-link rounded-0'}
                            previousClassName={'page-item roboto-font'}
                            previousLinkClassName={'page-link rounded-0'}
                            nextClassName={'page-item roboto-font'}
                            nextLinkClassName={'page-link rounded-0'}
                            breakClassName={'page-item roboto-font'}
                            breakLinkClassName={'page-link rounded-0'}
                            activeClassName={'active'}
                        />
                </div>
            </div>
        </Fragment>
    );
}

export default ListeDesFilieres;