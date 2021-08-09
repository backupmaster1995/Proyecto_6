import {useState,useEffect} from "react"
import PropTypes from 'prop-types';
import Error from "./Error"

export default function Form({userQuery,setUserQuery,allcountries,setQueryChecked}) {
    
    //States
    const [error, setError] = useState(false)

    const handleChange = (e) => {
        e.target.value.trim()
        setUserQuery({
            ...userQuery,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(!userQuery.country ||!userQuery.city) {
            return setError(true)
        }
        setError(false)

        setQueryChecked(true)
    }

    return (
        <form
            onSubmit={handleSubmit}
        >
            {error && <Error message="Ambos campos son obligatorios" />} 

            <div className="input-field col s12">
                <input
                    type="text"
                    name="city"
                    id="city"
                    onChange={handleChange}
                />
                 <label htmlFor="city">Ciudad, provincia o estado:</label>
            </div>

            {
                allcountries.length > 0 &&
                <>
                <div className="input-field col s12">
                        <select 
                        name="country" 
                        id="country"
                        onChange={handleChange}
                    >
                        <option value="">-- Selecciona un País --</option>
                        {
                            allcountries.map(country=> 
                                <option value={country.alpha2Code} key={country.name}>{country.name} </option>
                            )
                        }
                    </select>
                    <label htmlFor="country">País:</label>
                </div>
                </>  
            } 

            <div className="input-field col s12">
                <button
                    type="submit"
                    className="waves-effect waves-light btn-large btn-block yellow accent-4 col s12"
                >Buscar Clima</button>
            </div>
        </form>
    )
}

Form.propTypes = {
    userQuery : PropTypes.object.isRequired,
    setUserQuery: PropTypes.func.isRequired,
    allcountries: PropTypes.array.isRequired,
    setQueryChecked: PropTypes.func.isRequired,
}
