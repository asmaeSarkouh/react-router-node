import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import TextInput from "../../inputs/TextInput";
function CategorieCreate() {
  let navigate = useNavigate();
  const initialForm = { title: "", color: "", slug: "" };
  const [listCategorie, setListCategorie] = useState(initialForm);
  const { title, color, slug } = listCategorie;
  console.log(listCategorie);
  const onChangeForm = (e) => {
    const { name, value } = e.target;
    setListCategorie({ ...listCategorie, [name]: value });
    console.log(listCategorie);
  };
  const { post } = useFetch();
  {
    /*let exp1 = new RegExp('^[A-Z]')
  let m1 = exp1.exec(title)
  console.log(m1);*/
  }
  const onFormSubmit = (e) => {
    e.preventDefault();
    post("categories", {  title, color,slug }).then((data) => {
      console.log(data);
      navigate("/");
    });
  };

  return (
    <>
      <div className="container">
        <h1>Nouvelle Catégorie</h1>
        <form onSubmit={onFormSubmit}>
          <TextInput
            label="Nom"
            placeholder="Saisir le nom de la categorie"
            name="title"
            onChange={onChangeForm}
            value={listCategorie.title}
            className="form-control"
          />
          <TextInput
            label="Coleur"
            name="color"
            onChange={onChangeForm}
            value={listCategorie.color}
            type="color"
            className="p-0"
          />
          <div className="d-flex  justify-content-between m-2">
            <dir></dir>
            <div>
              <button type="submit" class="btn btn-primary">
                Créer
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default CategorieCreate;
