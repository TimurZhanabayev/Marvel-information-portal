import { useHttp } from "../hooks/http.hook";

const useComicService = () => {
    const {request, clearError, procedure, setProcedure} = useHttp();
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';

    const getAllComics = async (offset = 0) => {
        const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&apikey=${process.env.REACT_APP_ACCESS_KEY}`);
        return res.data.results.map(_transformComics)
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?apikey=${process.env.REACT_APP_ACCESS_KEY}`);
        return _transformComics(res.data.results[0]);
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            thumbnail: comics.thumbnail.path + `.` + comics.thumbnail.extension,
            description: comics.description || "There is no description",
            price: comics.prices[0].price ? `${comics.prices[0].price}$` : "not available",
            language: comics.textObjects[0]?.language || "en-us",
            pageCount: comics.pageCount
				? `${comics.pageCount} p.`
				: "No information about the number of pages"
        }
    }

    return {
        procedure, 
        setProcedure,
        getAllComics,
        getComic,
        clearError
    }
}

export default useComicService