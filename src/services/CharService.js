import { useHttp } from "../hooks/http.hook";

const useCharService = () => {
    const {loading, request, error, clearError} = useHttp();
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&apikey=${process.env.REACT_APP_ACCESS_KEY}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?apikey=${process.env.REACT_APP_ACCESS_KEY}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getCharacterByName = async (name) => {
		const res = await request(`${_apiBase}characters?name=${name}&apikey=${process.env.REACT_APP_ACCESS_KEY}`);
		return res.data.results.map(_transformCharacter);
	};

    const getCharacterbyNameInput =  async (name) => {
        const res =  await request(`${_apiBase}characters?nameStartsWith=${name}&orderBy=name&apikey=${process.env.REACT_APP_ACCESS_KEY}`);
        return res.data.results.map(item => _transformCharacter(item));
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    return {
        loading,
        error,
        getAllCharacters,
        getCharacter,
        getCharacterByName,
        getCharacterbyNameInput,
        clearError
    }
}

export default useCharService;