import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AppBanner from '../../appBanner/AppBanner';
import useCharService from '../../../services/CharService';
import setContent from '../../../utils/setContents';

import './singleCharPage.scss';

const SingleCharPage = () => {
    const {charId} = useParams();
    const [char, setChar] = useState({});
    console.log(char);

    const {getCharacter, clearError, procedure, setProcedure} = useCharService();

    useEffect(() => {
        updateChar()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [charId])

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = () => {
        clearError();
        getCharacter(charId)
            .then(char => onCharLoaded(char))
            .then(() => setProcedure('confirmed'));
    }

    return (
        <>
            <AppBanner/>
            {setContent(procedure, View, char)}
        </>
    )
}

const View = ({data}) => {
    const {name, thumbnail, description} = data;
    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'unset'};
    }
    return (
        <div className="single-char">
            <img src={thumbnail} alt={name} className="single-char__img" style={imgStyle}/>
            <div className="single-char__info">
                <h2 className="single-char__name">{name}</h2>
                <p className="single-char__descr">{description}ew</p>
            </div>
            <Link to="/" className="single-char__back">Back to all</Link>
        </div>
    )
}


export default SingleCharPage