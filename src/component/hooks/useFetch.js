import { useState } from "react";

function useFetch() {
  const base_url = "http://localhost:5000";
  const [loading, setLoading] = useState(false);

  /**
   * GET : une seule ressrouce
   * @param {String} resource la ressource "products, users ...."
   * @param {Number} id l'identifiant de la ressrouce
   * @returns Promise
   */
  const get = (resource, id) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      fetch(`${base_url}/${resource}/${id}`)
        .then((resp) => resp.json())
        .then((data) => {
          setLoading(false);
          resolve(data);
        })
        .catch((error) => {
          setLoading(false);
          reject(error);
        });
    });
  };

  /**
   * GET : liste des ressrouces
   * @param {String} resource la ressource "products, users ...."
   * @returns Promise
   */
  const list = (resource) => {
    return new Promise((resolve, reject) => {
      fetch(`${base_url}/${resource}`)
        .then((resp) => resp.json())
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  /**
   * POST : Créer une seule ressrouce
   * @param {String} resource la ressource "products, users ...."
   * @param {Object} body le body des données à envoyer
   * @returns Promise
   */
  const post = (resource, body) => {
    return new Promise((resolve, reject) => {
      fetch(`${base_url}/${resource}`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  /**
   * PUT : Modifier une seule ressrouce
   * @param {String} resource la ressource "products, users ...."
   * @param {Number} id identifiant de la ressource
   * @param {Object} body le body des données à envoyer
   * @returns Promise
   */
  const update = (resource, id, body) => {
    return new Promise((resolve, reject) => {
      fetch(`${base_url}/${resource}/${id}`, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  /**
   * DELETE : Suppirmer une seule ressrouce
   * @param {String} resource la ressource "products, users ...."
   * @param {Number} id identifiant de la ressource
   * @returns Promise
   */
  const remove = (resource, id) => {
    return new Promise((resolve, reject) => {
      fetch(`${base_url}/${resource}/${id}`, {
        method: "DELETE",
      })
        .then((resp) => resp.json())
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  return {
    get,
    list,
    post,
    update,
    remove,
    loading,
  };
}

export default useFetch;
