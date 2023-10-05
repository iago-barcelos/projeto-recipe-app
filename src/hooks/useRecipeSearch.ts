import { useState } from 'react';
import { SearchResultsType, FormDataType } from '../types';
import { getFetch } from '../utils/functions';

const useRecipeSearch = () => {
  const FORM_INITIAL_STATE = {
    searchValue: '',
    searchType: 'ingredient',
  };

  const [formData, setFormData] = useState<FormDataType>(FORM_INITIAL_STATE);
  const { searchValue, searchType } = formData;
  const [searchResults, setSearchResult] = useState<SearchResultsType>(
    { meals: [], drinks: [] },
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { name, value: targetValue } } = event;
    setFormData({ ...formData, [name]: targetValue });
  };

  const isSearchValueValid = (errorMessage: string) => {
    if (!searchValue) {
      window.alert(errorMessage);
      return false;
    }
    if (searchType === 'first-letter' && searchValue.length > 1) {
      window.alert(errorMessage);
      return false;
    }
    return true;
  };

  const handleSearchResults = async (
    endpoint: string,
    errorMessage: string,
    page: string,
  ) => {
    if (!isSearchValueValid(errorMessage)) {
      return;
    }
    const results = await getFetch(endpoint, searchValue);
    if (!results || results[page] === null) {
      window.alert("Sorry, we haven't found any recipes for these filters.");
      return;
    }
    setSearchResult({ ...searchResults, [page]: results[page] });
    setFormData(FORM_INITIAL_STATE);
  };

  const handleSearch = async (page: string) => {
    const domainURL = page === 'meals' ? 'themealdb' : 'thecocktaildb';
    if (searchType === 'ingredient') {
      await handleSearchResults(
        `https://www.${domainURL}.com/api/json/v1/1/filter.php?i=`,
        'Please, you must submit a valid ingredient.',
        page,
      );
    } else if (searchType === 'name') {
      await handleSearchResults(
        `https://www.${domainURL}.com/api/json/v1/1/search.php?s=`,
        'Please, you must submit a valid name.',
        page,
      );
    } else if (searchType === 'first-letter') {
      await handleSearchResults(
        `https://www.${domainURL}.com/api/json/v1/1/search.php?f=`,
        'Your search must have only 1 (one) character',
        page,
      );
    }
  };

  return {
    searchResults,
    formData,
    searchValue,
    searchType,
    handleChange,
    handleSearch,
    isSearchValueValid,
  };
};

export default useRecipeSearch;
