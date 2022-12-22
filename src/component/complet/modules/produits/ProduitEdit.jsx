import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
function ProduitEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { get, update, list } = useFetch();
  const [image, setImage] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [discountPercentage, setDiscountPercentage] = useState();
  const [rating, setRating] = useState();
  const [stock, setStock] = useState();
  const [brand, setBrand] = useState();
  const [categoryId, setCategoryId] = useState();
  const [detailProducts, setDetailProducts] = useState();
  useEffect(() => {
    get("products", id).then((data) => {
      setTitle(data.title);
      setPrice(data.price);
      setStock(data.stock);
      setDescription(data.description);
      setThumbnail(data.thumbnail);
      setCategoryId(data.categoryId)
    });
  }, []);
  const [thumbnail, setThumbnail] = useState(null);
  const [file, setFile] = useState(null);
  useEffect(() => {
    const formData=new FormData()
    formData.append('file',file)
    fetch(`http://localhost:5000/files/upload/${id}`,{
      method:"PUT",
      body:formData
    }).then(res=>res.json())
    .then(data=>setFile(data.file))
  }, []);
  const handlChange = (e) => {
    const selectefile = e.target.files[0];
    setFile(selectefile);
    const filePreview = URL.createObjectURL(selectefile);
    setThumbnail(filePreview);
  };
  const onFormSubmit =  (e) => {
    e.preventDefault();
    update("products", id, {
      title,
      description,
      price:Number(price),
      discountPercentage,
      rating:Number(0),
      stock:Number(stock),
      brand,
      categoryId:Number(categoryId),
      thumbnail:`/files/download/${file.name}`,
    }).then((data) => navigate("/produits"));
  };
  const [users, setUsers] = useState([]);
  useEffect(() => {
    list("categories").then((data) => setUsers(data));
  }, []);
  return (
    <>
      <div className="container">
        <h1 className="p-2">
          <i class="fa fa-pencil" aria-hidden="true"></i>
          Modifier Produit
        </h1>
        <div className="d-flex  justify-content-between m-2">
          <div className="p-2">
              <img
                src={thumbnail}
                height={200}
                width={170}
              />
            <label htmlFor="imgs" className="btn">
              <i class="fa fa-pencil" aria-hidden="true"></i>Modifier
            </label>
            <input
              type="file"
              id="imgs"
              style={{ display: "none" }}
              onChange={handlChange}
              name="thumbnail"
            />
          </div>
          <form className="column col-10 p-2 m-2">
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Titre</label>
              <input
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Saisir la Titre du produit"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                name="title"
              />
            </div>
            <div className="form-group row">
              <div className="col">
                <label htmlFor="exampleInputPassword1">Prix</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Saisir le prix"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  name="price"
                />
              </div>
              <div className="col">
                <label htmlFor="exampleInputPassword1">Stock</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Saisir la Qantiter du stock"
                  onChange={(e) => setStock(e.target.value)}
                  value={stock}
                  name="stock"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Catégorie</label>
              <select
                className="form-select"
                onChange={(e) => setCategoryId(e.target.value)}
                value={categoryId}
              >
                <option>Selectiones Catégorie</option>
                {users.map((l, id) => {
                  return <option value={l.id}>{l.title}</option>
                })}
              </select>
            </div>
          </form>
        </div>
        <h4>Titre</h4>
        <textarea
          class="form-control m-2"
          placeholder="Saisier la description"
          cols="150"
          rows="5"
          onChange={(e) => setDescription(e.target.value)}
          name="description"
          value={description}
        ></textarea>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => onFormSubmit(e)}
        >
          Sauvegarder
        </button>
      </div>
    </>
  );
}

export default ProduitEdit;
