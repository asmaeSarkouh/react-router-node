import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import axios from "axios";
function CategorieEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { get, update, loading } = useFetch();
  const [user, setUser] = useState({
    slug: "",
    title: "",
    color: "",
  });
  const { title, color, slug } = user;
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    loadUser();
  }, []);
  const onFormSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/categories/${id}`, user);
    navigate("/");
  };
  const loadUser = async () => {
    const result = await axios.get(`http://localhost:5000/categories/${id}`);
    setUser(result.data);
  };
  return (
    <>
      <div className="container">
        <h1>
          <i class="fa fa-pencil" aria-hidden="true"></i> Modifier Catégorie
        </h1>
        <form onSubmit={(e) => onFormSubmit(e)}>
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            name="title"
            placeholder="Saisir le nom de la categorie"
            onChange={(e) => onInputChange(e)}
            value={title}
          />
          <h4 className="m-2">Coleur</h4>
          <input
            type="color"
            name="color"
            onChange={(e) => onInputChange(e)}
            value={color}
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

export default CategorieEdit;
