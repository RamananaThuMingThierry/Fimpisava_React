import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
/*------------------------ Layouts --------------------------*/
import Navbar from "./Navbar";
import Aside from "./Aside";
import Footer from "./Footer";

/*------------------------- Style ---------------------------*/
import '../../assets/back_end/css/styles.css';
import '../../assets/back_end/js/scripts';
import TableauDeBoard from "../../components/back_end/TableauDeBoard";
import PageDErreur from "../../components/PageDErreur";
import ListeDesMembresFimpisava from "../../components/back_end/personnes/liste_des_membres_fimpisava";
import AjouterUnMembreFimpisava from "../../components/back_end/personnes/ajouter_un_membre_fimpisava";
import AfficherUnMembreFimpisava from "../../components/back_end/personnes/afficher_un_membre_fimpisava";
import Liste_des_Utilisateurs from "../../components/back_end/utilisateurs/liste_des_Utilisateurs";
import ModifierUnUtilisateur from "../../components/back_end/utilisateurs/modifier_un_utilisateur";
import AfficherUnUtilisateur from "../../components/back_end/utilisateurs/afficher_un_utilisateur";
import Statistiques from "../../components/back_end/statistiques/statistiques";
import ListeMembresAntalaha from "../../components/back_end/district/antalaha/liste_membre_antalaha";
import ListeMembresSAMBAVA from "../../components/back_end/district/sambava/liste_membre_sambava";
import ListeMembresAndapa from "../../components/back_end/district/andapa/liste_membre_andapa";
import ListeMembresVohemar from "../../components/back_end/district/vohemar/liste_membre_vohemar";
import Recherche from "../../components/back_end/filtres/recherche";
import ListeDesFilieres from "../../components/back_end/filieres/liste_des_filieres";
import ModifierUnFiliere from "../../components/back_end/filieres/modifier_un_filiere";

class MasterLayout extends Component{
    render(){
        return (
            <>
                <Navbar/>
                <div id="layoutSidenav">
                    <div id="layoutSidenav_nav">
                        <Aside/>
                    </div>
                    <div id="layoutSidenav_content"  style={{backgroundColor:'#ccc'}}>
                        <main>
                            <div class="container-fluid">
                                <Switch>
                                    <Route exact path="/admin/tableau_de_bord" component={TableauDeBoard} />

                                    {/* --------------------------------- Filières --------------------------------- */}
                                    <Route exact path="/admin/liste_des_filieres" component={ListeDesFilieres} />
                                    <Route exact path="/admin/modifier_un_filiere/:id" component={ModifierUnFiliere} />

                                    {/* --------------------------------- Membres FI.MPI.SAVA --------------------------------- */}
                                    
                                    <Route exact path="/admin/ajouter_un_membre_fimpisava" component={AjouterUnMembreFimpisava} />
                                    <Route exact path="/admin/liste_des_membres_fimpisava" component={ListeDesMembresFimpisava} />
                                    {/* <Route exact path="/admin/modifier_un_membre_fimpisava/:id" component={ModifierUnMembreFimpisava} /> */}
                                    <Route exact path="/admin/afficher_un_membre_fimpisava/:id" component={AfficherUnMembreFimpisava} />
                                        
                                    {/* ---------------------- Liste des membres dans le district Sambava ------------------------*/}

                                    <Route exact path="/admin/liste_membres_district_sambava" component={ListeMembresSAMBAVA} />
                                    {/* <Route exact path="/admin/modifier_un_utilisateur/:id" component={ModifierUnUtilisateur} />
                                    <Route exact path="/admin/afficher_un_utilisateur/:id" component={AfficherUnUtilisateur} /> */}
                                    {/* <Route exact path="/admin/approuve_un_membre_fimpisava/:id" component={ApprouveUnMembreFimpisava} /> */}

                                    {/* --------------------- Liste des membres dans le district Antalaha ------------------------ */}
                                    
                                    <Route exact path="/admin/liste_membres_district_antalaha" component={ListeMembresAntalaha} />
                                    {/* <Route exact path="/admin/modifier_un_utilisateur/:id" component={ModifierUnUtilisateur} />
                                    <Route exact path="/admin/afficher_un_utilisateur/:id" component={AfficherUnUtilisateur} /> */}
                                    {/* <Route exact path="/admin/approuve_un_membre_fimpisava/:id" component={ApprouveUnMembreFimpisava} /> */}
                                    
                                    {/* --------------------- Liste des membres dans le district Vohemar ------------------------ */}
                                    
                                    <Route exact path="/admin/liste_membres_district_vohemar" component={ListeMembresVohemar} />
                                    {/* <Route exact path="/admin/modifier_un_utilisateur/:id" component={ModifierUnUtilisateur} />
                                    <Route exact path="/admin/afficher_un_utilisateur/:id" component={AfficherUnUtilisateur} /> */}
                                    {/* <Route exact path="/admin/approuve_un_membre_fimpisava/:id" component={ApprouveUnMembreFimpisava} /> */}
                                    
                                    {/* --------------------- Liste des membres dans le district Andapa ------------------------ */}
                                    
                                    <Route exact path="/admin/liste_membres_district_andapa" component={ListeMembresAndapa} />
                                    {/* <Route exact path="/admin/modifier_un_utilisateur/:id" component={ModifierUnUtilisateur} />
                                    <Route exact path="/admin/afficher_un_utilisateur/:id" component={AfficherUnUtilisateur} /> */}
                                    {/* <Route exact path="/admin/approuve_un_membre_fimpisava/:id" component={ApprouveUnMembreFimpisava} /> */}
                            
                                    {/* ----------------------- Liste des utilisateurs ----------------------------------------*/}
                                    
                                    <Route exact path="/admin/liste_des_utilisateurs" component={Liste_des_Utilisateurs} />
                                    <Route exact path="/admin/modifier_un_utilisateur/:id" component={ModifierUnUtilisateur} />
                                    <Route exact path="/admin/afficher_un_utilisateur/:id" component={AfficherUnUtilisateur} />
                                    {/* <Route exact path="/admin/approuve_un_membre_fimpisava/:id" component={ApprouveUnMembreFimpisava} /> */}
                                    
                                    {/* --------------------------------- Recherche ---------------------------------------- */}
                                    <Route exact path="/admin/recherche" component={Recherche} />
                                 
                                    {/* --------------------------------- Statistiques ---------------------------------------- */}
                                    <Route exact path="/admin/statistiques" component={Statistiques} />

                                    {/* --------------------------------- Page d'erreurs ----------------------------------------*/}
                                    <Route component={PageDErreur}/>
                                </Switch>
                            </div>
                        </main>
                    <Footer/>
                    </div>
                </div>
            </>
        );
    }
}

export default MasterLayout;