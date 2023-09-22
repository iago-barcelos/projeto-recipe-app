import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

function Drinks() {
  return (
    <div>
      <Header pageTitle="Drinks" />
      <SearchBar page="Drinks" />
      <Footer />
    </div>
  );
}

export default Drinks;
