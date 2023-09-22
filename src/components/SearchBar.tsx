function SearchBar() {
  return (
    <div>
      <label>
        <input
          type="radio"
          name="search-type"
          value="ingredient"
          data-testid="ingredient-search-radio"
        />
        Buscar por ingrediente
      </label>
      <label>
        <input
          type="radio"
          name="search-type"
          value="name"
          data-testid="name-search-radio"
        />
        Buscar por nome
      </label>
      <label>
        <input
          type="radio"
          name="search-type"
          value="first-letter"
          data-testid="first-letter-search-radio"
        />
        Buscar pela primeira letra
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
