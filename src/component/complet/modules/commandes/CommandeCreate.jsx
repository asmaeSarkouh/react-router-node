import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import TextInput from "../../inputs/TextInput";
function CommandeCreate() {
  const navigate = useNavigate();
  const initialForm = {
    client_name: "",
    client_phone: "",
    client_address: "",
    products: [{ productId: "", quantity: "" }],
    is_shipped: false,
  };
  const [listOrders, setListOrders] = useState([]);
  const [inputSelect, setInputSelect] = useState([]);
  const [listProduit, setListProduit] = useState([]);
  const [quantity, setQuantity] = useState();
  const [productId, setProductId] = useState();
  const { list, remove, post } = useFetch();
  const { id } = useParams();
  const [createOrder, setCreateOrder] = useState(initialForm);
  const { client_name, client_address, client_phone, is_shipped } = createOrder;
  console.log(createOrder);
  const onChangeForm = (e) => {
    const { name, value } = e.target;
    setCreateOrder({ ...createOrder, [name]: value });
    console.log(createOrder);
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    post("orders", {
      client_name,
      client_address,
      client_phone,
      products: [
        {
          productId: Number(productId),
          quantity: Number(quantity),
        },
      ],
      is_shipped,
    }).then((data) => {
      console.log(data);
      navigate("/commandes");
    });
  };
  const [listCategorie, setListCategorie] = useState([]);

  const [select, setSelect] = useState();
  const onCategorie = (e) => {
    setProductId(e.target.value);
  };
  const [selectProduct, setSelectProduct] = useState([]);

    const [formSelect, setFormSelect] = useState([]);
    useEffect(() => {
        setFormSelect(listProduit)
    }, [])
  const addSelect = (e) => {
    e.preventDefault();
    const newSelect = [...inputSelect, { productId, quantity }];
    setInputSelect(newSelect);
    let id = 1;
        if (selectProduct.length) {
            id = selectProduct[selectProduct.length - 1].id + 1;
        }
        if (!productId) {
            return null;
        } else {
            setSelectProduct([...selectProduct, {
                id,
                productId,
                quantity
            },]);
        }

        setFormSelect(formSelect.filter((fs) => fs.name !== productId))
        console.log(formSelect);
  };
  const deleteSelect = (item) => {
    const deleteSelect = inputSelect.filter((i) => i.item!== item);
    setInputSelect(deleteSelect);
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
        <form onSubmit={onFormSubmit}>
          <h1>Novelle Commande</h1>
          <div className="col-12">
            <div className="form-group row">
              <div className="col">
                <TextInput
                  label="Nom Client(*)"
                  placeholder="Saisir le Nom"
                  name="client_name"
                  onChange={onChangeForm}
                  value={createOrder.client_name}
                />
              </div>
              <div className="col">
                <TextInput
                  label="Téléphone(*)"
                  placeholder="Saisir le Telephone"
                  name="client_phone"
                  onChange={onChangeForm}
                  value={createOrder.client_phone}
                />
              </div>
            </div>
            <div className="form-group">
              <TextInput
                label="Adresse Lvraision(*)"
                placeholder="Saisir l'adresse"
                name="client_address"
                onChange={onChangeForm}
                value={createOrder.client_address}
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
            onClick={onFormSubmit}
          >
            Sauvgarder
          </button>
        </form>
      </div>
    </>
  );
}

export default CommandeCreate;
