import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from "formik";
import * as Yup from 'yup';
import { Link } from "react-router-dom";

import ErrorMessage from '../errorMessage/ErrorMessage'
import useCharService from "../../services/CharService";

import './charSearch.scss'


const CharSearch = () => {
    const [char, setChar] = useState(null);
    const [data, setData] = useState([]);
    const [input, setInput] = useState("");
    const {loading, error, getCharacterByName, getCharacterbyNameInput, clearError} = useCharService();

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const loadCharacterbyName = (name) => {
        if(!name) {
            return
        }
        getCharacterbyNameInput(name).then(data => {setData(data); })
        
    }

    const updateChar = (name) => {
        clearError();

        getCharacterByName(name)
            .then(onCharLoaded);
    }

    useEffect(()=> {
        if(input === '') {
            setData([]);
        }
        loadCharacterbyName(input)
    },[input]);

    const renderCharacter = (data) => data.map(({id, name, thumbnail}) => 
        <Link to={`char/${id}`} key={name}>
            <div>
                <img src={thumbnail} alt={name}/>
                <div>{name}</div>
            </div>
        </Link>);

    const errorMessage = error ? <div className="char__search-critical-error"><ErrorMessage /></div> : null;
    const results = !char ? null : char.length > 0 ?
                    <div className="char__search-wrapper">
                        <div className="char__search-success">There is! Visit {char[0].name} page?</div>
                        <Link to={`/char/${char[0].id}`} className="button button__secondary">
                            <div className="inner">To page</div>
                        </Link>
                    </div> : 
                    <div className="char__search-error">
                        The character was not found. Check the name and try again
                    </div>;

    return (
        <div className="char__search-form">
            <Formik
                initialValues = {{
                    charName: ''
                }}
                validationSchema = {Yup.object({
                    charName: Yup.string().required('This field is required')
                })}
                onSubmit = { ({charName}) => {
                    updateChar(charName);
                }}
                handleChange = {(e) => {
                    setInput(e.target.value);
                }}
            >
                <Form>
                    <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
                    <div className="char__search-wrapper">
                        <Field 
                            id="charName" 
                            name='charName' 
                            type='text' 
                            placeholder="Enter name"/>
                        <button 
                            type='submit' 
                            className="button button__main"
                            disabled={loading}>
                            <div className="inner">find</div>
                        </button>
                    </div>
                    <FormikErrorMessage component="div" className="char__search-error" name="charName" />
                </Form>
            </Formik>
            {results}
            {loading? 'loading ...': renderCharacter(data)}
            {errorMessage}
        </div>
    )
}

export default CharSearch