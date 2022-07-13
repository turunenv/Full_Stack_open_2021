import { useDispatch } from "react-redux"
import { addFilter } from "../reducers/filterReducer"

const AnecdoteFilter = () => {
    const dispatch = useDispatch()

    const handleChange = e => {
        e.preventDefault()
        dispatch(addFilter(e.target.value))
    }

    const style = {
        marginBottom: 10,
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

export default AnecdoteFilter