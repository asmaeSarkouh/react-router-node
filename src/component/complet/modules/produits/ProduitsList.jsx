import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
function ProduitsList() {
  const [listProduit, setListProduit] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const { get, remove, list } = useFetch();
  const [listCategories, setListCategories] = useState([]);
  useEffect(() => {
    list("categories").then((data) => setListCategories(data));
  }, []);
  useEffect(() => {
    loadProduct();
  }, []);
  const loadProduct = async () => {
    const result = await axios.get("http://localhost:5000/products");
    setListProduit(result.data);
  };
  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:5000/products/${id}`);
    loadProduct();
  };
  return (
    <>
      <div className="container ">
        <div className="d-flex  justify-content-between m-2">
          <h1>Liste des Produits</h1>
          <Link class="btn btn-primary btn-lg" to="/produits/create">
            Novelle Produits
          </Link>
        </div>
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
            {listProduit.map((l, id) => {
              return (
                <tr>
                  <td>
                    {l.id}
                    <img src={`http://localhost:5000${l.thumbnail}`} id="imgs" width={100}height={50}/>
                    {/* 124   <img src={l.thumbnail} width={100} height={50}/> */}
                  </td>
                  <td>
                    <Link
                      className="list-group-item list-group-item-action active"
                      to={`/produits/details/${l.id}`}
                    >
                      {l.title}
                    </Link>
                  </td>
                  <td>
                    {listCategories.map((c) =>
                      c.id == l.categoryId ? (
                        <input type="color" className="p-0" value={c.color} />
                      ) : null
                    )}
                  </td>
                  <td>{l.price} dh</td>
                  <td>{l.stock}</td>
                  <td>
                    <Link className="btn" to={`/produits/edit/${l.id}`}>
                      <i class="fa fa-pencil" aria-hidden="true"></i> Modifier
                    </Link>
                  </td>
                  <td>
                    <button className="btn" onClick={() => deleteProduct(l.id)}>
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

export default ProduitsList;
