import React from 'react'

const MovieCard = ({
                       movie:
                           {title,original_title, vote_average, poster_path, release_date, original_language}
                   }) => {
    // 使用中文标题，如果没有则使用原标题
    const displayTitle = title || original_title || "未知标题";
    return (
        <div className="movie-card">
            <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : `/no-movie.png`} alt={title}/>

            <div className="mt-4">
                <h3>{displayTitle}</h3>

                <div className="content">
                    <div className="rating">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-shoucang"></use>
                        </svg>
                        <p>{vote_average ? vote_average.toFixed(1) : '暂无评分'}</p>
                    </div>

                    <span> </span>
                    <p className="lang">语言：{original_language}</p>

                    <span> </span>
                    <p className="year">
                        上映日期：{release_date ? release_date.split('-')[0] : 'N/A'}
                    </p>
                </div>
            </div>
        </div>
    )
}
export default MovieCard
