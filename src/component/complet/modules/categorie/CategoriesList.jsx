import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
function CategoriesList() {
  const [listCategories, setListCategories] = useState([]);
  useEffect(() => {
    loadCategory();
  }, []);
  const loadCategory = async () => {
    const result = await axios.get("http://localhost:5000/categories");
    setListCategories(result.data);
  };
  const deleteCategory= async id =>{
    await axios.delete(`http://localhost:5000/categories/${id}`)
    loadCategory()
  }
  {/**npx json-server --watch db.json --port 5000 */}
  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-between m-2">
          <h1>Catégories des produits</h1>
          <Link class="btn btn-primary btn-lg" to="/add">
            Novelle Catégorie
          </Link>
        </div>
        <div>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Nom</th>
                <th scope="col">Coleur</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {listCategories.map((l,index) => {
                return (
                  <tr>
                    <td>
                    <Link
                    className="list-group-item list-group-item-action active"
                    to={`/details/${l.id}`}
                  >
                    {l.title}
                  </Link>
                    </td>
                    <td>
                      <input type="color" className="p-0" value={l.color} />
                    </td>
                    <td>
                      <Link className="btn" to={`/edit/${l.id}`}>
                        <i class="fa fa-pencil" aria-hidden="true"></i>
                        Modifier
                      </Link>
                    </td>
                    <td>
                      <button className="btn " onClick={()=>deleteCategory(l.id)}>
                        <i
                          class="fa fa-trash text-danger"
                          aria-hidden="true"
                        ></i>
                        Supprimer
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default CategoriesList;
