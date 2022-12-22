import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";
import accounting from "../complet/img/accounting.png";
import '../../App.css'
function Navbar() {
  const getActive=({isactive})=>{
    return isactive?"active":null
  }
  return (
    <>
      <div className="container">
        <nav className="column navbar navbar-expand-lg navbar-light bg-light">
         
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0" >
              <li className="nav-item m-2"> <img src={accounting} height={30} /></li>
              <li className="nav-item">
                <NavLink end className="nav-link" to="/" class={getActive}>
                  Categories
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/produits" class={getActive}>
                  Prodduits
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/commandes" class={getActive}>
                  Commandes
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/utilisateur">
                  Utilisateurs
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
        
      </div>
    </>
  );
}

export default Navbar;
