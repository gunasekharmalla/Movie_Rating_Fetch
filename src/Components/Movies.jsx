import React,{useState, useEffect} from 'react'

export default function Movies()
{
    const [movies, setMovies] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [category, setCategory] = useState("action")
    const [expanded, setExpanded] = useState({});

    const key = "72b375dc9fa170fc06b6a64db9441fee"
   const url = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=${category}`;

   useEffect(()=>{
    async function fetchData()
    {
        try
        {
            const response = await fetch(url)
            if(!response.ok)
            {
                throw new Error("Failed to fetch")
            }
            else{
                const data = await response.json()
                setMovies(data.results)
                setLoading(false)
            }
        }catch(error)
        {
            setError(error.message)
        }
    }
    fetchData();
   },[category])

    

    const toggleExpand = (index) => {
        setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
    };

    return(
        <div style={{
            
        }}>
            <h2 style={{fontFamily:"sans-serif",
                fontWeight:'bold',
                textAlign:'center',
                fontSize:'1.8em',
                marginTop:'1.5em',
                textShadow:'2px 2px 5px grey'

            }}>Welcome to ScreenStars -Movie Review Spot </h2>
        <div 
        style={
            {
                display:'grid',
                gridTemplateColumns:'repeat(auto-fit, minmax(220px,1fr))',
                gap:'20px',
                alignItems:'center',
                padding:'20px'
                }}>
                    <div 
                    style={{ 
                        gridColumn: '1 / -1',
                        textAlign: 'center',
                        marginBottom: '20px' 
                        }}>
                <h2>Select Movie Category</h2>
                <select value={category} onChange={(e) => setCategory(e.target.value)}
                     style={{ 
                        padding: '8px',
                        fontSize: '16px',
                        borderRadius: '5px',
                        boxShadow: '2px 2px 5px rgba(0,0,0,0.2)',
                        border: 'none',
                     }}>
                    <option value="28">Action</option>
                    <option value="35">Comedy</option>
                    <option value="27">Horror</option>
                    <option value="10749">Romance</option>
                </select>
                </div>

            {loading && <h2 style={{gridColumn:'1 / -1',textAlign:'center'}}>loading...</h2>}
            {error && <h2 style={{ gridColumn: '1 / -1', textAlign: 'center'}}>{error}</h2>}
            {!loading && !error && movies.length > 0 ? ( movies.map((movie, index)=>(
                <div key={index} style={{
                    backgroundColor: 'lightgrey',
                    borderRadius: '10px',
                    padding: '15px',
                    textAlign: 'center',
                    boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
                }}>
                    
                    <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="movie poster"  style={{ width: '100%', borderRadius: '10px' }}></img>
                    <p style={{ fontWeight: 'bold', marginTop: '10px' }}>Title: {movie.title}</p>
                    <p>Release date: {movie.release_date}</p>
                    <p>Popularity: {movie.popularity}</p>
                    <p style={{
                            textAlign: 'justify',
                            maxWidth: '220px',
                            margin: 'auto',
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: expanded[index] ? 'unset' : 2
                        }}>
                            Overview: {movie.overview}
                            </p>
                    {movie.overview.length > 100 && (
                            <button 
                                onClick={() => toggleExpand(index)} 
                                style={{
                                    background: 'white', color: 'black', border: 'none', padding: '5px 10px',
                                    cursor: 'pointer', marginTop: '5px', borderRadius: '5px', boxShadow: '2px 2px 5px rgba(0,0,0,0.2)'
                                }}>
                                {expanded[index] ? "Read Less" : "Read More"}
                            </button>)}

                </div>
            ))): ( <h2>no movies found</h2>)}
        </div>
    </div>
    )
}