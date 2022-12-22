import { Routes , Route, BrowserRouter}from 'react-router-dom'
import Navbar from './component/layout/Navbar'
import Nav from './component/layout/Nav';
import CategoriesList from './component/complet/modules/categorie/CategoriesList';
import CategorieCreate from './component/complet/modules/categorie/CategorieCreate';
import CategorieEdit from './component/complet/modules/categorie/CategorieEdit';
import CategorieDetails from './component/complet/modules/categorie/CategorieDetails';
import ProduitsList from './component/complet/modules/produits/ProduitsList';
import ProduitDetails from './component/complet/modules/produits/ProduitsDetails';
import ProduitEdit from './component/complet/modules/produits/ProduitEdit';
import ProduitCreate from './component/complet/modules/produits/ProduitCreate';
import CommandeDetails from './component/complet/modules/commandes/CommandeDetails';
import CommandesList from './component/complet/modules/commandes/CommandesList';
import CommandeCreate from './component/complet/modules/commandes/CommandeCreate';
import CommandeEdit from './component/complet/modules/commandes/CommandeEdit';
function App() {
  return (
    <BrowserRouter>
     <div className=''>
      <div>
        <Navbar/>
      </div>
      <div>
        <Nav/>
      <Routes>
      <Route path="/" element={<CategoriesList/>}/>
      <Route path="/add" element={<CategorieCreate/>}/>
      <Route path="/edit/:id" element={<CategorieEdit/>}/>
      <Route path="/details/:id" element={<CategorieDetails/>}/>
      <Route path="/produits" element={<ProduitsList/>}/>
      <Route path="/produits/details/:id" element={<ProduitDetails/>}/>
      <Route path="/produits/edit/:id" element={<ProduitEdit/>}/>
      <Route path="/produits/create" element={<ProduitCreate/>}/>
      <Route path="/commandes" element={<CommandesList/>}/>
      <Route path="/commandes/details/:id" element={<CommandeDetails/>}/>
      <Route path="/commandes/edit/:id" element={<CommandeEdit/>}/>
      <Route path="/commandes/create" element={<CommandeCreate/>}/>
      </Routes>
      </div>
     </div>
      
    </BrowserRouter>
  );
}

export default App;
