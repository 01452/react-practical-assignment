import React, {useCallback, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {filter} from "../utils/postSlice";
import {Delete, Search} from "../utils/icons";
import "../css/Filter.css";

const Filter = () => {
    const dispatch = useDispatch();
    const filterValue = useRef(null);
    const {toFilter} = useSelector((store) => store.post);

    const debounce = useCallback((fn, delay) => {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => fn.apply(this, args), delay);
        };
    }, []);

    const handleFilter = debounce(
        useCallback(() => {
            if (filterValue.current.value.trim().length !== 0) {
                dispatch(filter(filterValue.current.value));
            }
        }, [dispatch]),
        500
    );

    const clearFilter = useCallback(() => {
        dispatch(filter(""));
    }, [dispatch]);

    return (
        <div className="filter">
            <input
                type="text"
                name="filter"
                ref={filterValue}
                placeholder="Post search"
                onInput={handleFilter}
            />
            {toFilter && (
                <div className="filter_clear">
                    {toFilter}
                    <Delete clear={clearFilter}/>
                </div>
            )}
            <Search filter={handleFilter}/>
        </div>
    );
};

export default Filter;
