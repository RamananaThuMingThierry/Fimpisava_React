import React from "react";
import { Link } from "react-router-dom";


const Aside = () =>{

  const toggleBodyClass = (e) => {
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
      e.preventDefault();
       document.body.classList.toggle('sb-sidenav-toggled');
      localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
    }
  };

   return (
    <nav className="sb-sidenav accordion elevation-2 sb-sidenav-dark" id="sidenavAccordion">
      <div className="sb-sidenav-menu">
        <div className="nav">
            <div className="sb-sidenav-menu-heading">Accueil</div>
            <Link to="/admin/tableau_de_bord" className="nav-link roboto-font">
                <div className="sb-nav-link-icon"><i className="fas fa-table"></i></div>
                Tableau de bord
              </Link>
          </div>
          <div className="nav">
            <div className="sb-sidenav-menu-heading">Liste des Membres</div>
              <Link to="/admin/liste_des_membres_fimpisava" className="nav-link roboto-font">
                <div className="sb-nav-link-icon"><i className="fas fa-solid fa-users-line"></i></div>
                Membres
              </Link>
          </div>
          <div className="nav">
            <div className="roboto-font sb-sidenav-menu-heading">DISTRICTS</div>
            <Link className="nav-link collapsed roboto-font" to="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                <div className="sb-nav-link-icon roboto-font"><i className="fas fa-columns"></i></div>
                Districts
                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
            </Link>
            <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                <nav className="sb-sidenav-menu-nested nav">
                    <Link className="nav-link roboto-font" to="/admin/liste_membres_district_sambava">Sambava</Link>
                    <Link className="nav-link roboto-font" to="/admin/liste_membres_district_antalaha">Antalaha</Link>
                    <Link className="nav-link roboto-font" to="/admin/liste_membres_district_vohemar">Vohemar</Link>
                    <Link className="nav-link roboto-font" to="/admin/liste_membres_district_andapa">Andapa</Link>
                </nav>
            </div>
          </div>
          
          <div className="nav">
            <div className="sb-sidenav-menu-heading">Statistiques</div>
              <Link to="/admin/statistiques" className="nav-link roboto-font">
                <div className="sb-nav-link-icon"><i className="fas fa-chart-bar"></i></div>
                Statistiques
              </Link>
          </div>

          <div className="nav">
            <div className="sb-sidenav-menu-heading">Utilisateurs</div>
              <Link to="/admin/liste_des_utilisateurs" className="nav-link roboto-font">
                <div className="sb-nav-link-icon"><i className="fas fa-solid fa-users fa-solid"></i></div>
                Utilisateurs
              </Link>
          </div>
          
        </div>
    </nav>
   );
}

export default Aside;