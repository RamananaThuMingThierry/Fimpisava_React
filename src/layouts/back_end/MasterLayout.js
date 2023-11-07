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

                                    {/* --------------------------------- Membres FI.MPI.SAVA --------------------------------- */}
                                    {/* <Route exact path="/admin/ajouter_un_membre_fimpisava" component={AjouterUnMembreFimpisava} /> */}
                                    <Route exact path="/admin/liste_des_membres_fimpisava" component={ListeDesMembresFimpisava} />
                                    {/* <Route exact path="/admin/modifier_un_membre_fimpisava/:id" component={ModifierUnMembreFimpisava} />
                                    <Route exact path="/admin/afficher_un_membre_fimpisava/:id" component={AfficherUnMembreFimpisava} />
                                    <Route exact path="/admin/approuve_un_membre_fimpisava/:id" component={ApprouveUnMembreFimpisava} /> */}


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