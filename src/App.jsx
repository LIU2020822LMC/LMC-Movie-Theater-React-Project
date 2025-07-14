import {useEffect,useState} from 'react'
import Search from "./assets/components/Search.jsx";
import Spinner from "./assets/components/Spinner.jsx";
import MovieCard from "./assets/components/MovieCard.jsx";
import {useDebounce} from "react-use";
import {getTrendingMovies, updateSearchCount} from "./appwrite.js";

const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
    method: 'GET',
    headers:{
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
    }
}

const App = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [movieList,setMovieList] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [trendingMovies,setTrendingMovies] = useState([])

    //防止过多请求，通过防抖来处理搜索词
    //通过等待用户停止输入500毫秒，即半秒钟之后才显示搜索画面
    useDebounce(()=>setDebouncedSearchTerm(searchTerm),500,[searchTerm]);

    const fetchMovies = async (query=' ') => {
        setIsLoading(true);
        setErrorMessage('')

        try{
            const endpoint = query
                ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&language=zh-CN&region=CN`
                :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc&language=zh-CN&region=CN`;
            const response = await fetch(endpoint, API_OPTIONS);

            if(!response.ok){
                throw new Error('无法获取电影');
            }

            const data = await response.json();

            if(data.Response === 'false'){
                setErrorMessage(data.Error || '无法获取电影');
                setMovieList([]);
                return;
            }

            setMovieList(data.results || []);

            if(query && data.results.length > 0){
                await updateSearchCount(query,data.results[0]);
            }
        }catch (error) {
            console.error(`获取电影失败：${error}`);
            setErrorMessage('获取电影失败,请稍后再尝试啦~');
        }finally {
            setIsLoading(false);
        }
    }

    const loadTrendingMovies = async () =>{
        try{
            const movies = await getTrendingMovies();

            setTrendingMovies(movies);
        } catch (error){
            console.error(`热门电影获取错误：${error}`);

        }
    }

    useEffect(() => {
        fetchMovies(debouncedSearchTerm);
    },[debouncedSearchTerm]);

    useEffect(() => {
        loadTrendingMovies()
    },[])

    return (
        <main>
            <div className="pattern"/>

            <div className="wrapper">
                <header>
                    <img src="./hero.png" alt="Hero Banner" />
                    <h1>轻松邂逅心仪<span className="text-gradient">电影</span>，无需费心</h1>
                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </header>

                {trendingMovies.length > 0 && (
                    <section className="trending">
                        <h2>大家都爱看</h2>

                        <ul>
                            {trendingMovies.map((movie,index) => (
                                <li key={movie.$id}>
                                    <p style={{ marginRight: '15px' }}>{index + 1}</p>
                                    <img src={movie.poster_url} alt={movie.title}/>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                <section className="all-movies">
                    <h2 className="mt-[40px]">所有电影</h2>

                    {isLoading ? (
                        <Spinner />
                    ) : errorMessage ? (
                        <p className="text-red-500">{errorMessage}</p>
                    ) : (
                        <ul>
                            {movieList.map((movie) => (
                                <MovieCard key={movie.id} movie={movie}/>
                            ))}
                        </ul>
                    )}
                </section>

            </div>
        </main>
    )
}
export default App
