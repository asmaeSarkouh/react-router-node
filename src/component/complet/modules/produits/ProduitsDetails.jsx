import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import accounting from "../../img/accounting.png";
function ProduitDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { get, list } = useFetch();
  const [detailProduit, setDetailProduit] = useState(null);
  const [listCategories, setListCategories] = useState([]);
  const [listProducts, setListProducts] = useState([]);
  useEffect(() => {
    get("products", id).then((data) => setDetailProduit(data));
  }, []);
  useEffect(() => {
    list("categories").then((data) => setListCategories(data));
  }, []);
  const [produits, setProduits] = useState([]);
  useEffect(() => {
    loadProduct();
  }, []);
  const loadProduct = async () => {
    const result = await axios.get("http://localhost:5000/products");
    setListProducts(result.data);
  };
  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:5000/products/${id}`);
    loadProduct();
    navigate("/produits");
  };
  const [thumbnail, setThumbnail] = useState("");
  const [priview, setPriview] = useState("");
  return (
    <>
      <div className="container ">
        <div className="d-flex  justify-content-between m-2">
          <span></span>
          <h1>
            <Link className="btn" to={`/produits/edit/${id}`}>
              <i class="fa fa-pencil" aria-hidden="true"></i> Modifier
            </Link>
            <button className="btn" onClick={() => deleteProduct(id)}>
              <i class="fa fa-trash text-danger" aria-hidden="true"></i>
              Supprimer
            </button>
          </h1>
        </div>
        <div className="d-flex  justify-content-between m-2">
          {detailProduit && (
            <img
              src={`http://localhost:5000${detailProduit.thumbnail}`}
              id="img"
              height={180}
              width={350}
              className="m-2"
            />
          )}
          <div>
            {detailProduit && <h1>{detailProduit.title}</h1>}
            {detailProduit && <p>{detailProduit.description}</p>}

            <table className="table table-borderless">
              <thead>
                <tr>
                  <th scope="col">Prix</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Catégorie</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {detailProduit && <td>{detailProduit.price} MAD</td>}
                  {detailProduit && <td>{detailProduit.stock} unités</td>}
                  {detailProduit && (
                    <td>
                      
                      <Link
                    className="list-group-item list-group-item-action active"
                    to={`/details/${id}`}
                  >
                    {listCategories.map((c) =>
                        c.id == detailProduit.categoryId ? `${c.title}` : null
                      )}
                  </Link>
                    </td>
                  )}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProduitDetails;
