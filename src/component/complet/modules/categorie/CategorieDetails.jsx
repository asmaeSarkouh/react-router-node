import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
function CategorieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { get, remove, list } = useFetch();
  const [listProduit, setListProduit] = useState([]);
  const [detailCategory, setDetailCategory] = useState(null);
  const [listCategories, setListCategories] = useState([]);
  useEffect(() => {
    get("categories", id).then((data) => setDetailCategory(data));
  }, []);
  useEffect(() => {
    list("products").then((data) => setListProduit(data));
  }, []);
  useEffect(() => {
    list("categories")
    .then((data)=>setListCategories(data))
  }, []);
  const deleteCategory =  (id) => {
   remove("categories",id)
   .then(data=>{window.location.reload()})
    navigate("/")
  };
  const deleteProduct =  (id,) => {
    remove("products",id)
    .then(data=>{window.location.reload()})
     navigate("/produits")
   };
  return (
    <>
      <div className="container">
        <div className="d-flex  justify-content-between m-2">
          <h1>
            <input
              type="color"
              class="m-2"
              value={detailCategory && `${detailCategory.color}`}
              className="p-0"
            />
            Catégorie: {detailCategory && <span>{detailCategory.title}</span>}
          </h1>
          <h1>
            <Link className="btn" to={`/edit/${id}`}>
              <i class="fa fa-pencil" aria-hidden="true"></i> Modifier
            </Link>
            <button className="btn" onClick={() => deleteCategory(id)}>
              <i class="fa fa-trash text-danger" aria-hidden="true"></i>
              Supprimer
            </button>
          </h1>
        </div>
        <h4>Liste de Produits</h4>
        <table class="table">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Titre</th>
              <th scope="col"></th>
              <th scope="col">Prix</th>
              <th scope="col">Stock</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {listProduit.map((l,index) => (
              l.categoryId==id ?(
                <tr key={index}>
                  <td>
                  {l.id}
                    <img src={`http://localhost:5000${l.thumbnail}`} id="img" width={100}height={50}/>
                    </td>
                  <td>
                  <Link
                      className="list-group-item list-group-item-action active"
                      to={`/produits/details/${l.id}`}
                    >
                      {l.title}
                    </Link>
                  </td>
                  {listCategories.map((c) =>
                    c.id == l.categoryId ? (
                      <td>
                        <input type="color" className="p-0" value={c.color} />
                      </td>
                    ) : null
                  )}
                  <td>{l.price} dh</td>
                  <td>{l.stock}</td>
                  <td>
                    <Link className="btn" to={`/produits/edit/${l.id}`}>
                      <i class="fa fa-pencil" aria-hidden="true"></i> Modifier
                    </Link>
                  </td>
                  <td>
                    <button className="btn " onClick={()=>deleteProduct(l.id)}>
                      <i class="fa fa-trash text-danger" aria-hidden="true"></i>
                      Supprimer
                    </button>
                  </td>
                </tr>
              ) :null
            ))} 
          </tbody>
        </table>
      </div>
    </>
  );
}

export default CategorieDetails;
