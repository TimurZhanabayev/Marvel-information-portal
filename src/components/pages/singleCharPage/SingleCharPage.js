import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AppBanner from '../../appBanner/AppBanner';
import useCharService from '../../../services/CharService';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import Spinner from '../../spinner/Spinner';

import './singleCharPage.scss';

const SingleCharPage = () => {
    const {charId} = useParams();
    const [char, setChar] = useState({});
    console.log(char);

    const {loading, error, getCharacter, clearError} = useCharService();

    useEffect(() => {
        updateChar()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [charId])

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = () => {
        clearError();
        getCharacter(charId).then(char => onCharLoaded(char))
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const {name, thumbnail, description} = char;
    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'unset'};
    }
    return (
        <>
            <AppBanner/>
            {errorMessage}
            {spinner}
            <div className="single-char">
                <img src={thumbnail} alt={name} className="single-char__img" style={imgStyle}/>
                <div className="single-char__info">
                    <h2 className="single-char__name">{name}</h2>
                    <p className="single-char__descr">{description}</p>
                </div>
                <Link to="/" className="single-char__back">Back to all</Link>
            </div>
        </>
    )
}


export default SingleCharPage