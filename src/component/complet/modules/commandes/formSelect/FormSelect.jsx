import { useState } from "react";

function FormSelect(
 {formSelect,addSelect,selectProducts,removeSlect}
) {
   const [select, setSelect] = useState();
   const [quantity, setQuantity] = useState();
  const [productId, setProductId] = useState();
  const [inputSelect, setInputSelect] = useState([]);
  const onCategorie = (e) => {
    setProductId(e.target.value);
  };
    return ( 
        <>
        {inputSelect.map((l, index) => {
              return (
                <div className="form-group row">
                  <div className="col">
                    <label htmlFor="exampleInputPassword1">Catégorie(*)</label>
                    <select class="form-select" onChange={onCategorie}
                    value={productId}>
                      <option>Selectiones Catégorie</option>
                      {formSelect.map((l) => {
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
                      onRemove={removeSlect}
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
                  value={productId}
                >
                  <option>Selectiones Catégorie</option>

                  {formSelect.map((l) => {
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
          
        </>
     );
}

export default FormSelect;