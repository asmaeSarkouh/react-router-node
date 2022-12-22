import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import logo from "../../img/logo.png";
import TextAreaInput from "../../inputs/TextAreaInput";
import TextInput from "../../inputs/TextInput";
import SelectInput from "../../inputs/SelectInput";
import axios from "axios";
function ProduitCreate() {
  const navigate = useNavigate();
  const initialForm = {
    title: "",
    categoryId: "",
    discountPercentage: "",
    rating: "",
    stock: "",
    brand: "",
    price: "",
  };
  const [users, setUsers] = useState([]);
  const { list, remove, post } = useFetch();
  const [listProduits, setListProduits] = useState(initialForm);
  const {
    title,
    stock,
    price,
    description,
    discountPercentage,
    rating,
    brand,
  } = listProduits;
  console.log(listProduits);
  const onChangeForm = (e) => {
    const { name, value } = e.target;
    setListProduits({ ...listProduits, [name]: value });
    console.log(listProduits);
  };
  useEffect(() => {
    list("categories").then((data) => setUsers(data));
  }, []);
  const [categoryId, setCategoryId] = useState();
  const [thumbnail, setThumbnail] = useState(null);
  const [file, setFile] = useState(null);
  useEffect(() => {
    const formData=new FormData()
    formData.append('file',file)
    fetch("http://localhost:5000/files/upload",{
      method:"POST",
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
  const onFormSubmit = (e) => {
    e.preventDefault();
    post("products", {
      title,
      description,
      price:Number(price),
      discountPercentage,
      rating:Number(rating),
      stock:Number(stock),
      brand,
      categoryId:Number(categoryId),
      thumbnail:`/files/download/${file.name}`,
    }).then((data) => {
      console.log(data);
      navigate("/produits");
    });
   
  };
 
  return (
    <>
      <div className="container">
        <h1>
          <i class="fa fa-pencil" aria-hidden="true"></i>
          Nouveau Produit
        </h1>
        <div className="d-flex  justify-content-between m-2">
          <div className="p-2">
            
              <img
                src={!thumbnail ? require("../../img/logo.png") : thumbnail}
                height={200}
                width={170}
              />
            
            <label htmlFor="imgs" className="btn">
              <i class="fa fa-pencil" aria-hidden="true"></i>Selectioner Image
            </label>
            <input
              type="file"
              id="imgs"
              style={{ display: "none" }}
              onChange={handlChange}
              name="thumbnail"
            />
            {/* <img src={!thumbnail?require("../../img/logo.png"):thumbnail}
            width={300} height={200}/><br/>
            <input type="file"
            onChange={onImg}/> */}
          </div>
          <form className="column col-10 p-2 m-2">
            <div className="form-group">
              {/*<label htmlFor="exampleInputEmail1">Titre(*)</label>
              <input
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Saisir la Titre du produit"
              />*/}
              <TextInput
                label="Titre(*)"
                placeholder="Saisir le Titre"
                name="title"
                onChange={onChangeForm}
                value={listProduits.title}
              />
            </div>
            <div className="form-group row">
              <div className="col">
                {/*<label htmlFor="exampleInputPassword1">Prix(*)</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Saisir le prix"
                />*/}
                <TextInput
                  label="Prix(*)"
                  placeholder="Saisir le Prix"
                  name="price"
                  onChange={onChangeForm}
                  value={listProduits.price}
                />
              </div>
              <div className="col">
                {/*<label htmlFor="exampleInputPassword1">Stock(*)</label>
                <input
                  type="text"
                  className="form-control"
                />*/}
                <TextInput
                  label="Stock(*)"
                  placeholder="Saisir le stock"
                  name="stock"
                  onChange={onChangeForm}
                  value={listProduits.stock}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Catégorie(*)</label>
              <select
                className="form-select"
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option>Selectiones Catégorie</option>
                {users.map((l) => {
                  return <option value={l.id}>{l.title}</option>;
                })}
              </select>
            </div>
          </form>
        </div>
        {/*
        <h4>Description(*)</h4>
        <textarea
          class="form-control m-2"
          placeholder="Saisier la description"
          cols="150"
          rows="5"
        >
        </textarea>*/}
        <TextAreaInput
          placeholder="Saisier la description"
          name="description"
          label="Description(*)"
          onChange={onChangeForm}
          value={listProduits.description}
        />
        <button
          type="submit"
          className="btn btn-primary"
          onClick={onFormSubmit}
        >
          Créer
        </button>
      </div>
    </>
  );
}

export default ProduitCreate;
