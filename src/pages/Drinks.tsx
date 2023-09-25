import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import SearchBar from '../components/SearchBar';

function Drinks() {
  return (
    <div>
      <Header pageTitle="Drinks" />
      <SearchBar page="drinks" />
      <Recipes />
      <Footer />
    </div>
  );
}

export default Drinks;
