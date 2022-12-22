import { useEffect, useState } from "react";
import { useParams } from "react-router";
import logo from "../complet/img/logo.png";
import useFetch from "../hooks/useFetch";
function Nav() {
  const { get } = useFetch();
  const {id}=useParams()
  const [datailcommande, setDatailcommande] = useState(null);
  useEffect(() => {
    get("orders", id).then((data) => setDatailcommande(data));
  }, []);
  return (
    <>
      <div className="container">
        <div className="d-flex  justify-content-between m-2 bg-secondary">
          <div></div>
          <div>
            <>
              {
                datailcommande && <span className="text-dark p-2">{datailcommande.client_name}</span>
              }

              
              <img src={logo} height={40} class="rounded-circle" />
            </>
          </div>
        </div>
      </div>
    </>
  );
}

export default Nav;
