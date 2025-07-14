import React from 'react'


const Search = ({searchTerm,setSearchTerm}) => {
    return (
        <div className="search">
            <div>
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-sousuo"></use>
                </svg>

                <input
                 type="text"
                 placeholder="搜索数千部电影....."
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}/>
            </div>
        </div>
    )
}
export default Search
