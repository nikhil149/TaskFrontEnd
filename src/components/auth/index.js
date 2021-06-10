import { API } from '../../Config'
export const signUp = (user) =>{
    // console.log(name, email, password)
    return fetch(`${API}/signup`,{
        method: "POST",
        headers:{
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(res => {
        return res.json()
    })
    .catch(err => {
        console.log(err)
    })
}


export const signIn = (user) =>{
    // console.log(name, email, password)
    return fetch(`${API}/signin`,{
        method: "POST",
        headers:{
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(res => {
        return res.json()
    })
    .catch(err => {
        console.log(err)
    })
}

export const authenticate = (data, next) =>{
    if(typeof window !== 'undefined'){
        localStorage.setItem('jwt', JSON.stringify(data))
        next()
    }
}


export const signOut =(next)=>{
    if(typeof window !== 'undefined'){
        localStorage.removeItem('jwt')
        next()
        return fetch(`${API}/signout`,{
            method: "GET"
        })
        .then(response =>{
            console.log('singout', response)
        })
        .catch(err =>{
            console.log(err)
        })
    }
}

export const isAuthenticated =()=>{
    if(typeof window ==='undefined'){
        return false
    }
    if(localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'))
    }else{
        return false
    }
}

export const calender=(mydates)=>{
    return fetch(`${API}/calender`,{
        method: "POST",
        headers:{
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(mydates)
    })
    .then(res => {
        return res.json()
    })
    
    .catch(err => {
        console.log(err)
    })
}