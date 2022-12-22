import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
function CommandeCreate() {
  const [client_name, setClient_name] = useState();
  const [client_phone, setClient_phone] = useState();
  const [client_address, setClient_address] = useState();
  const [editCommande, setEditCommande] = useState();
  const [is_shipped, setIs_shipped] = useState(false);
  const navigate = useNavigate();
  const { list, get, update } = useFetch();
  const { id } = useParams();
  useEffect(() => {
    get("orders", id).then((data) => {
      setClient_name(data.client_name);
      setClient_phone(data.client_phone);
      setClient_address(data.client_address);
      setQuantity(data.quantity);
      setProductId(data.productId);
    });
  }, []);
  const onEditSubmit = (e) => {
    e.preventDefault();
    update("orders", id, {
      client_name,
      client_phone,
      client_address,
      products: [{ productId: Number(productId), quantity: Number(quantity) }],
      is_shipped,
    }).then((data) => console.log(data));
    navigate("/commandes");
  };
  const [listCategorie, setListCategorie] = useState([]);
  const [listOrders, setListOrders] = useState([]);
  const [inputSelect, setInputSelect] = useState([]);
  const [listProduit, setListProduit] = useState([]);
  const [select, setSelect] = useState();
  const [quantity, setQuantity] = useState();
  const [productId, setProductId] = useState();
  const onCategorie = (e) => {
    setProductId(e.target.value);
  };
  const addSelect = (e) => {
    e.preventDefault();
    const newSelect = [...inputSelect, { productId, quantity }];
    setInputSelect(newSelect);
  };
  const deleteSelect = (id) => {
    const remove = inputSelect.filter((i) => i.id!== id);
    setInputSelect(remove);
  };
  useEffect(() => {
    list("categories").then((data) => setListCategorie(data));
  }, []);
  useEffect(() => {
    list("products").then((data) => setListProduit(data));
  }, []);
  useEffect(() => {
    list("orders").then((data) => setListOrders(data));
  }, []);
  return (
    <>
      <div className="container">
        <h1>Commande : #123</h1>
        <div className="col-12">
          <div className="form-group row">
            <div className="col">
              <label htmlFor="exampleInputEmail1">Nom Client(*)</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Saisir le Nom de client"
                value={client_name}
                onChange={(e) => setClient_name(e.target.value)}
              />
            </div>
            <div className="col">
              <label htmlFor="exampleInputEmail1 col">Téléphone(*)</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Saisir le numero de telephone de client"
                value={client_phone}
                onChange={(e) => setClient_phone(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Adresse Lvraision(*)</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Saisir la adresse de client"
              value={client_address}
              onChange={(e) => setClient_address(e.target.value)}
            />
          </div>
        </div>
        <div></div>
        <div className="col-12 m-2">
          <h3>Produits</h3>
          {inputSelect.map((l, index) => {
            return (
              <div className="form-group row">
                <div className="col">
                  <label htmlFor="exampleInputPassword1">Catégorie(*)</label>
                  <select class="form-select" onChange={onCategorie}>
                    <option>Selectiones Catégorie</option>
                    {listProduit.map((l) => {
                      return <option value={l.id}>{l.title}</option>;
                    })}
                  </select>
                </div>
                <div className="col">
                  <label htmlFor="exampleInputPassword1">Quantite(*)</label>
                  <input
                    type="number"
                    onChange={(e) => setQuantity(e.target.value)}
                    className="form-control"
                    value={quantity}
                  />
                </div>
                <div className="col">
                  <button
                    className="btn m-4"
                    type="submit"
                    onClick={() => deleteSelect()}
                  >
                    <i class="fa fa-times-circle" aria-hidden="true"></i>
                    Suppremer
                  </button>
                </div>
              </div>
            );
          })}
          <div className="row">
            <div className="col">
              <label htmlFor="exampleInputPassword1">Catégorie(*)</label>
              <select
                class="form-select"
                onChange={(e) => setProductId(e.target.value)}
              >
                <option>Selectiones Catégorie</option>
                {listProduit.map((l) => {
                  return <option value={l.id}>{l.title}</option>;
                })}
              </select>
            </div>
            <div className="col">
              <label htmlFor="exampleInputPassword1">Quantite(*)</label>

              <input
                type="number"
                onChange={(e) => setQuantity(e.target.value)}
                className="form-control"
                value={quantity}
              />
            </div>
            <div className="col">
              <button className="btn btn-primary m-4" onClick={addSelect}>
                Ajouter
              </button>
            </div>
          </div>
        </div>
        <button
          className="btn btn-primary"
          type="submit"
          onClick={(e) => onEditSubmit(e)}
        >
          Sauvgarder
        </button>
      </div>
    </>
  );
}

export default CommandeCreate;
