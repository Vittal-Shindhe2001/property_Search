import axios from "../config/axios";

export const GET_PROPERTY = 'GET_PROPERTY'

const setGetFilterProperty = (data) => {
    return {
        type: GET_PROPERTY,
        payload: data
    }
}

export const startGetProperties = () => {
    return (dispatch) => {
        (
            async () => {
                try {
                    const property = await axios.get("/api/properties")
                    dispatch(setGetFilterProperty(property.data))
                } catch (error) {
                    alert(error)
                }
            }
        )()
    }
}

export const startGetSortedProperty=(sort)=>{
    return(dispatch)=>{
        (
            async()=>{
                try {
                    const propertySort=await axios.get(`/api/properties/sort?type=${sort}`)
                    dispatch(setGetFilterProperty(propertySort.data))
                } catch (error) {
                    alert(error)
                }
            }
        )()
    }
}

export const startGetSearchedProperties=(search)=>{
    return(dispatch)=>{
        (
            async()=>{
               try {
                const searchProperty=await axios.get(`/api/properties/search?search=${search}`)
                dispatch(setGetFilterProperty(searchProperty.data))
               } catch (error) {
                alert(error)
               }
            }
        )()
    }
}

export const startGetfilterPurchase=(data)=>{
    return(dispatch)=>{
        (
            async()=>{
                try {
                    const filterProperty=await axios.get(`/api/properties/filterPurchase?purchaseType=${data}`)
                    dispatch(setGetFilterProperty(filterProperty.data))
                } catch (error) {
                    alert(error)
                }
            }
        )()
    }
}
export const startGetfilterProperty=(property,purchaseType)=>{
    console.log(property,purchaseType);
    return(dispatch)=>{
        (
            async()=>{
                try {
                    const filterProperty=await axios.get(`/api/properties/filterCategory?property=${property}&purchaseType=${purchaseType}`)
                    dispatch(setGetFilterProperty(filterProperty.data))
                } catch (error) {
                    alert(error)
                }
            }
        )()
    }
}