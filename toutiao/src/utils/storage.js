
 export const getItem = key =>{
     const data = localStorage.getItem(key)
     try{
         return JSON.parse(data)
     } catch (err){
        return data
     }
 } 
  export const setItem = (name, value) => {
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }
    window.localStorage.setItem(name, value)
  }
  
  export const removeItem = name => {
    window.localStorage.removeItem(name)
  }