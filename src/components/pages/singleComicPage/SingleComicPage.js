import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import AppBanner from '../../appBanner/AppBanner';
import useComicService from '../../../services/ComicService';
import setContent from '../../../utils/setContents';

import './singleComicPage.scss';

const SingleComicPage = () => {
    const {comicId} = useParams();
    const [comic, setComic] = useState({});
    console.log(comic);
    
    const {getComic, clearError, procedure, setProcedure} = useComicService();
    

    useEffect(() => {
        updateComic();
    }, [comicId]);

    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    const updateComic = () => {
        clearError();
        getComic(comicId)
            .then(onComicLoaded)
            .then(() => setProcedure('confirmed'));
    }
    return (
        <>
            <AppBanner/>
            {setContent(procedure, View, comic)}
        </>
    )
}

const View = ({data}) => {
    const {title, thumbnail, price, description, pageCount, language} = data;
    // const navigate = useNavigate();
    // const onBack = () => {
    //     navigate(-1);
    // }
    return (
        <>
            <div className="single-comic">
                <img src={thumbnail} alt={title} className="single-comic__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{title}</h2>
                    <p className="single-comic__descr">{description}</p>
                    <p className="single-comic__descr">{pageCount}</p>
                    <p className="single-comic__descr">Language: {language}</p>
                    <div className="single-comic__price">{price}</div>
                </div>
                {/* <button onClick={onBack} className="single-comic__back">Back to all</button> */}
                <Link to="/comics" className="single-comic__back">Back to all</Link>
            </div>
        </>
    )
}

export default SingleComicPage;