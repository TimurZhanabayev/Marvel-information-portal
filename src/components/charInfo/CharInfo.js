import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useCharService from '../../services/CharService';
import setContent from '../../utils/setContents';
import './charInfo.scss';

const CharInfo = (props) => {
    const [char, setChar] = useState(null);

    const {getCharacter, clearError, procedure, setProcedure} = useCharService();

    useEffect(() => {
        updateChar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.charId]);


    const onCharLoaded = (char) => {
        setChar(char);
    }


    const updateChar = () => {
        const {charId} = props;
        if (!charId) {
            return;
        }

        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcedure('confirmed'))
    }

    return (
        <div className="char__info">
            {setContent(procedure, View, char)}
        </div>
    )
}

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = data;
    let imgStyle = {'objectFit': 'cover'};
            if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit': 'unset'}
            }
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} target="_blank" rel='noreferrer' className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} target="_blank" rel='noreferrer' className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'There is no comics'}
                {
                    comics.map(({name, resourceURI}, i) => {
                        // eslint-disable-next-line array-callback-return
                        if (i > 9) return;
                        console.log(resourceURI.split('/'));
                        return (
                            <li key={i} className="char__comics-item">
                                <Link to={`/comics/${resourceURI.split('/').pop()}`}>
                                    {name}
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

export default CharInfo;