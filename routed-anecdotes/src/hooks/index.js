import { useState } from "react"


export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (e) => {
        setValue(e.target.value)
    }

    const reset = (e) => {
        setValue('')
    }

    if(type === 'reset'){
        return{
            reset
        }
    } else {
        return {
            type,
            value,
            onChange
        }
    }
   
}