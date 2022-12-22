import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
function CommandesList() {
  const [listCommandes, setListCommandes] = useState([]);
  const [listProduit, setListProduit] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const { get, remove, list } = useFetch();
  useEffect(() => {
    list("orders").then((data) => setListCommandes(data));
  }, []);
  useEffect(() => {
    list("products").then((data) => setListProduit(data));
  }, []);
  const deleteCommande = (id) => {
    remove("orders", id).then((data) => {
      window.location.reload();
    });
  };
  
  let prix=[]
  return (
    <>
      <div className="container">
        <div className="d-flex  justify-content-between m-2">
          <h1>List de Commandes </h1>
          <Link class="btn btn-primary btn-lg" to="/commandes/create">
            Novelle Commande
          </Link>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Numéro</th>
              <th scope="col">Nombre Produits</th>
              <th scope="col">Prix Total</th>
              <th scope="col">Statut</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {listCommandes.map((l, id) => {
              return (
                <tr>
                  <th>
                    
                      {l.id}
                  </th>
                  <td>
                  <Link
                      className="list-group-item list-group-item-action active"
                      to={`/commandes/details/${l.id}`}
                    >
                      {l.products.length}
                    Produits
                    </Link>
                  </td>
                  
                  <td>
                    {l.products.map((d) => {
                      
                          {listProduit.map((c) =>
                           ( c.id == d.productId) ? 
                              prix.push(c.price*d.quantity) 
                              
                             : null
                            
                          )
                          if(prix.length==l.products.length){
                            let price=prix.reduce((a,b)=>a+b,0)
                            prix=[]
                            return price
                          }
                          } 
                        
                    })} MDA
                  </td>
                    {l.is_shipped == true ? (
                      <>
                        <td className="text-success">✅Traitee</td>
                        <td>
                        <button className="btn">
                           <i class="fa fa-pencil" aria-hidden="true"></i> Modifier
                        </button>
                        </td>
                      </>
                    ) : l.is_shipped == false ? (
                     <>
                       <td className="text-warning">🛒En Traitée</td>
                       <td>
                       <Link className="btn" to={`/commandes/edit/${l.id}`}>
                      <i class="fa fa-pencil" aria-hidden="true"></i> Modifier
                    </Link>
                       </td>
                     </>
                    ) : (
                      <>
                        <td className="text-danger">❌ Anullée</td>
                        <td>
                        <button className="btn">
                           <i class="fa fa-pencil" aria-hidden="true"></i> Modifier
                        </button>
                        </td>
                      </>
                    )}
                  <td>
                    <button
                      className="btn"
                      onClick={() => deleteCommande(l.id)}
                    >
                      <i class="fa fa-trash text-danger" aria-hidden="true"></i>
                      Supprimer
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default CommandesList;
