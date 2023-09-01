import React from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { useState } from "react";

const Search = ({onSearchChange}) => {

    const [search, setSearch] = useState("")

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
        />
    )

}

export default Search;