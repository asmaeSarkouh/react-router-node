import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import accounting from "../../img/accounting.png";
function CommandeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { get, remove, list } = useFetch();
  const [datailcommande, setDatailcommande] = useState([]);
  const [listProduit, setListProduit] = useState([]);
  const [listCategories, setListCategories] = useState([]);
  const [listOrders, setListOrders] = useState([]);
  useEffect(() => {
    get("orders", id).then((data) => setDatailcommande(data));
  }, []);
  useEffect(() => {
    list("products").then((data) => setListProduit(data));
  }, []);
  useEffect(() => {
    list("categories").then((data) => setListCategories(data));
  }, []);
  useEffect(() => {
    list("orders").then((data) => setListOrders(data));
  }, []);
  const Anullee = (e) => {
    e.preventDefault();
    setListOrders(
      listOrders.map((p) => {
        if (p.id === id) {
          const newProduct = { ...p };
          newProduct.is_shipped = null;
          console.log(newProduct.is_shipped);
          return newProduct;
        }
        return p;
      })
    )
    
    navigate('/commandes')
  };
  const Traite = (e) => {
    e.preventDefault();
    // listOrders.map((p) => {
    //   if (p.id === id) {
    //     const newProduct = { ...p };
    //     newProduct.is_shipped = true;
    //     return newProduct;
    //   }
    //   return p;
    // });
  };
  let prix = [];
  
  return (
    <>
      <div className="container">
        <h1>Commande : #{datailcommande && <>{datailcommande.id}</>} </h1>
        <div className="d-flex  justify-content-between m-2">
          <div
            class="border border-secondary p-3"
            style={{ width: "250px", height: "400px" }}
          >
            <h4>Statut</h4>
            {datailcommande && (
              <>
                {datailcommande.is_shipped == true ? (
                  <div className="text-success">✅Traitee</div>
                ) : datailcommande.is_shipped == false ? (
                  <div className="text-warning">🛒En Traitée</div>
                ) : (
                  <div className="text-danger">❌ Anullée</div>
                )}
              </>
            )}
            <h4>Prix Total</h4>
            {datailcommande && (
              <>
                {listOrders.map((l) =>
                  l.id == id ? (
                    <>
                      {l.products.map((d) => {
                        {
                          listProduit.map((c) =>
                            c.id == d.productId
                              ? prix.push(c.price * d.quantity)
                              : null
                          );
                          if (prix.length == l.products.length) {
                            let price = prix.reduce((a, b) => a + b, 0);
                            prix = [];
                            return price;
                          }
                        }
                      })}
                      MDA
                    </>
                  ) : null
                )}
              </>
            )}
            <h4>Nombre de produits</h4>
            {datailcommande && (
              <>
                {listOrders.map((p) =>
                  p.id == id ? <div>{p.products.length}</div> : null
                )}
              </>
            )}
            Produits
            <h4>Client</h4>
            {datailcommande && datailcommande.client_name}
            {datailcommande && datailcommande.client_phone}
            <h4>Adresse Livraison</h4>
            {datailcommande && datailcommande.client_address}
          </div>
          <div>
            {datailcommande && (
              <>
                {listOrders.map((o) =>
                  o.id == id ? (
                    <div>
                      {o.products.map((p) => {
                        return (
                          <>
                            {listProduit.map((l) =>
                              l.id == p.productId && l.stock == 0 ? (
                                <div className="row border h-25 p-2 m-2 w-100 bg-secondary">
                                  <div className="col">
                                    <div
                                      type="submit"
                                      class="btn btn-primary w-25 h-25"
                                    >
                                      {p.quantity}
                                    </div>
                                  </div>
                                  <div className="col">
                                    <img
                                      src={`http://localhost:5000${l.thumbnail}`}
                                      id="img"
                                      width={150}
                                      height={80}
                                    />
                                  </div>
                                  <div className="col-5">
                                    <h4>{l.title}</h4>
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
                                          <td>{l.price} MAD</td>

                                          <td className="text-danger">
                                            {l.stock} unités
                                          </td>
                                          <td>
                                            <Link
                                              className="list-group-item list-group-item-action active"
                                              to={`/details/${id}`}
                                            >
                                              {listCategories.map((c) =>
                                                c.id == l.categoryId
                                                  ? `${c.title}`
                                                  : null
                                              )}
                                            </Link>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              ) : l.id == p.productId ? (
                                <div className="row border h-25 p-2 m-2 w-100">
                                  <div className="col">
                                    <div
                                      type="submit"
                                      class="btn btn-primary w-25 h-25"
                                    >
                                      {p.quantity}
                                    </div>
                                  </div>
                                  <div className="col">
                                    <img
                                      src={`http://localhost:5000${l.thumbnail}`}
                                      id="img"
                                      width={150}
                                      height={80}
                                    />
                                  </div>
                                  <div className="col-5">
                                    <h4>{l.title}</h4>
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
                                          <td>{l.price} MAD</td>

                                          <td>{l.stock} unités</td>
                                          <td>
                                            <Link
                                              className="list-group-item list-group-item-action active"
                                              to={`/details/${id}`}
                                            >
                                              {listCategories.map((c) =>
                                                c.id == l.categoryId
                                                  ? `${c.title}`
                                                  : null
                                              )}
                                            </Link>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              ) : null
                            )}
                          </>
                        );
                      })}
                    </div>
                  ) : null
                )}
              </>
            )}
          </div>
        </div>
        <div className="d-flex  justify-content-between m-2">
          <div></div>
          <div>
            {datailcommande && (
              <>
                {listOrders.map((m) =>
                  m.id == id
                    ? m.products.map((t) =>
                        listProduit.map((r) =>
                          r.id == t.productId ? (
                            r.stock == 0 && m.is_shipped == false ? (
                              <button
                                type="submit"
                                class="btn btn-secondary"
                                onClick={Anullee}
                              >
                                Annulée
                              </button>
                            ):
                            m.is_shipped == true ? (
                              <></>
                            ) : m.is_shipped == null ? (
                              <></>
                            ) : m.is_shipped == false ? (
                              <div>
                                <button
                                  type="submit"
                                  class="btn btn-success m-2"
                                  onClick={Traite}
                                >
                                  Traite
                                </button>
                                <button
                                  type="submit"
                                  class="btn btn-secondary"
                                  onClick={Anullee}
                                >
                                  Annulée
                                </button>
                              </div>
                            )  :null
                          ) : null
                        )
                      )
                    : null
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CommandeDetails;
