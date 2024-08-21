

import { useEffect, useState, useRef } from 'react'
import './global.css'
import s from './style.module.css'
import TVShowAPI from './API/tv-show';
import { BACKDROP_BASE_URL, BACKDROP_BASE_SMALL_URL } from './config.tsx'
import { TVShowDetail } from './components/TVShowDetail/TVShowDetail.tsx';
import { Logo } from './components/Logo/Logo';
import  Carousel  from './components/Carousel/Carousel.tsx';


function App() {
  const  [currentTVShow, setCurrentTVShow] = useState<any>({});
  const  [TVShows, setTVShows] = useState<any>({});
  const  [recommendation, setRecommendation] = useState<any>({});
  const  [trigger, setTrigger] = useState(false);
  const  [suggestions, setSuggestions] = useState<any>([])
  const suggestionRef = useRef();

  async function fetchPopulars() {
    const api = new TVShowAPI();
    const populars = await api.fetchPopulars();
    setTVShows(populars.slice(0, 20));
    getPopular(populars);
  }

  async function getPopular(populars: object) {
    var arrayPopulars = Object.values(populars).map((value) => value);
    if(arrayPopulars !== undefined && typeof arrayPopulars === 'object' && arrayPopulars.length > 0) {
      setCurrentTVShow(arrayPopulars[0]);
    }

  }

  async function fetchTVShow(e: any) {
    const api = new TVShowAPI();
    if(e.target.value.length >= 3) {
      let shows = await api.fetchTVShow(e.target.value);
      let arrayShows = Object.values(shows).map((value) => value);
      if(shows !== undefined && arrayShows.length > 0) {
        
        setSuggestions(shows);
      }
    }
  }

  function updateCurrentTvShow(tvshow: any) {
    setTrigger(!trigger);
    setCurrentTVShow(tvshow);
    setRecommendation(tvshow.id)
  }

  async function fetchRecommendations(tvShowId: number) {
    const api = new TVShowAPI();
    const recommendation = await api.fetchRecommendation(tvShowId);
    if(recommendation !== undefined && recommendation.length > 0) {
      setRecommendation(recommendation.slice(0, 10));
    }
  }
  
  function resetSuggestions(e: any) {
    const suggestionBloc: number|undefined = suggestionRef.current
    if(suggestionBloc !== e.target) {
      setSuggestions([]);
    }
  }

  useEffect(() => {
    fetchPopulars();
   
  }, [])

  useEffect(() => {
    
    if(currentTVShow.id !== undefined) {
      fetchRecommendations(currentTVShow.id);
    }
  }, [currentTVShow, trigger])

 
  useEffect(() => {

  }, [suggestions])
  return (
    <div onClick={resetSuggestions} className={s.main_container} 
      style={{ background: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.5)), url("${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center center / cover`, minHeight: "100Vh", height: "100%"}}>
      <div className={s.header}>
        <div className="flex">
          <div className="col-4">
            <Logo title="WatoWatch" subtitle="Find a show you may like" />
          </div>
          <div className="col-lg-4" >
            <input style={{ width: "100%"}} type="text" onChange={fetchTVShow} className="search-bar" placeholder="Search a TV show" />
            <div className="suggestions-container">
              <div className="suggestions" ref={suggestionRef?.current}>
                {
                  suggestions.length > 0 && (
                    suggestions.map((value: any, index: number) => {
                      return (
                        <div key={index} className="suggestion-item" onClick={() => updateCurrentTvShow(value) }>
                          <img src={`${BACKDROP_BASE_SMALL_URL}${value.backdrop_path}`} alt="" />
                          {value.name}
                        </div>
                      )
                    })
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={s.tv_show_detail}>
        
        { currentTVShow && <TVShowDetail tvShow={currentTVShow} />}
      </div>
      

      <div className={s.redirect}>
        <h1>Most watched TV shows :</h1>
        {
          TVShows !== undefined && TVShows.length > 0 && (<Carousel 
              height={200} 
              width={400} 
              gap={30} 
              cardNumber={TVShows.length}
              tvshows={TVShows}
              updateCurrentTvShow={updateCurrentTvShow}
              currentTvShow={currentTVShow}
          />)
        }
      </div>
      <div className={s.recommendation}>
        <h3>Recommendations :</h3>
        {recommendation !== undefined && recommendation.length > 0 && (<Carousel 
            height={400} 
            width={250} 
            gap={30} 
            cardNumber={recommendation.length}
            tvshows={recommendation}
            updateCurrentTvShow={updateCurrentTvShow}
            currentTvShow={currentTVShow}
        />)}
      </div>
    </div>
  )
}

export default App
