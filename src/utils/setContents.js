import Skeleton from "../components/skeleton/Skeleton"
import Spinner from "../components/spinner/Spinner"
import ErrorMessage from "../components/errorMessage/ErrorMessage"


const setContent = (procedure, Component, data) => {
    switch (procedure) {
        case 'waiting': 
            return <Skeleton/>
        case 'loading':
            return <Spinner/>
        case 'confirmed':
            return <Component data={data}/>
        case 'error':
            return <ErrorMessage/>
        default:
            throw new Error('Unexpected procedure state');
    }
}

export default setContent