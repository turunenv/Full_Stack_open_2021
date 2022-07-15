import { connect } from "react-redux"
import { addFilter } from "../reducers/filterReducer"

const AnecdoteFilter = (props) => {
    

    const handleChange = e => {
        e.preventDefault()
        props.addFilter(e.target.value)
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

const mapDispatchToProps = {
    addFilter,
}

export default connect(null, mapDispatchToProps)(AnecdoteFilter)