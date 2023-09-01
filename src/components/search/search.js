import React from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { useState } from "react";
import { GEO_API_URL, geoApiOptions } from "../../api";

const Search = ({ onSearchChange }) => {

    const [search, setSearch] = useState(null)

    const loadOptions = (inputValue) => {
        return fetch(
            `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
            geoApiOptions // the options for the fetch method
        )
            .then(response => response.json())
            .then(response => {
                return {
                    options: response.data.map((city) => {
                        return {
                            value: `${city.latitude} ${city.longitude}`,
                            label: `${city.name}, ${city.countryCode}`,
                        }
                    })
                }
            })
            .catch(err => console.error(err))
    }

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }



    return (
        <AsyncPaginate
            placeholder='Search for City'
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    )

}

export default Search;

 //fetching with async. Same result as fetch + .then + .catch, but looks more synchronous
    // try {
    //      const response = await fetch(url, options);
    //      const result = await response.text();
    //      console.log(result);
    // } catch (error) {
    //      console.error(error);
    // }