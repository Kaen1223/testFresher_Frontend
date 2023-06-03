import { add } from 'lodash'
import axios from '../utils/axios-customize'
import { Avatar } from 'antd'

export const fetchRegisterUser = (fullName , email , password , phone) => {
    return axios.post('/api/v1/user/register',{fullName , email , password , phone})
}

export const fetchLoginUser = ( username , password , delay ) => {
    return axios.post('/api/v1/auth/login',{username , password , delay},{withCredentials: true})
}

export const fetchAccount  = () => {
    return axios.get('/api/v1/auth/account')
}

export const fetchLogOutUser = ( ) => {
    return axios.post('/api/v1/auth/logout')
}


export const fetchAllUser  = () => {
    return axios.get('/api/v1/user')
}

export const fetchSearchUser  = (current,pageSize,email,phone) => {
    console.log(email)
    return axios.get(`api/v1/user?current=1&pageSize=2&email=${email}`)
}

export const fetchSortUserByName  = (current,pageSize,fullName) => {
    return axios.get(`api/v1/user?current=${current}&pageSize=${pageSize}&sort=${fullName}`)
}


export const fetchSortUserByEmail  = (current,pageSize,email) => {
    return axios.get(`api/v1/user?current=${current}&pageSize=${pageSize}&sort=${email}`)
}

export const fetchCreateUser = (fullName ,  password, email  , phone) => {
    return axios.post('/api/v1/user',{fullName ,password, email  , phone})
}

export const fetchImportListUser = (dataFileUpload) => {
    return axios.post('/api/v1/user/bulk-create',dataFileUpload)
}

export const fetchListUserPaganigate  = (current,pageSize) => {
    return axios.get(`api/v1/user?current=${current}&pageSize=${pageSize}`)
}

export const fetchUpdateUser  = (_id,fullName , email , phone) => {
    return axios.put('/api/v1/user',{_id,fullName,email,phone})
}


export const fetchDeleteUser  = (_id) => {
    return axios.delete(`/api/v1/user/${_id}`)
}

export const fetchGetListBook = (current , pageSize) => {
    return axios.get(`api/v1/book?current=${current}&pageSize=${pageSize}`)
}

export const fetchGetAllBook = () => {
    return axios.get(`api/v1/book`)
}

export const fetchGetBookWithPaganigate = (current , pageSize) => {
    return axios.get(`api/v1/book?current=${current}&pageSize=${pageSize}`)
}

export const fetchGetListBookByName = (current , pageSize , name) => {
    return axios.get(`api/v1/book?current=${current}&pageSize=${pageSize}&mainText=${name}`)
}

// sort book
export const fetchSortBookByPrice  = (current,pageSize,price) => {
    return axios.get(`/api/v1/book?current=${current}&pageSize=${pageSize}&sort=${price}`)
}

export const fetchSortBookByPriceAtHomePage  = (current,pageSize,choice) => {
    return axios.get(`/api/v1/book?current=${current}&pageSize=${pageSize}&sort=${choice}price`)
}

export const fetchSortBookByName  = (current,pageSize,name) => {
    return axios.get(`/api/v1/book?current=${current}&pageSize=${pageSize}&sort=${name}`)
}

export const fetchSortBookByDate  = (current,pageSize) => {
    return axios.get(`/api/v1/book?current=${current}&pageSize=${pageSize}&sort=-updatedAt`)
}

export const fetchSortBookBySold = (current,pageSize) => {
    return axios.get(`/api/v1/book?current=${current}&pageSize=${pageSize}&sort=-sold`)
}

export const fetchSortBook = (current,pageSize,role) => {
    return axios.get(`/api/v1/book?current=${current}&pageSize=${pageSize}&sort=${role}`)
}



export const callUploadBookImg=(fileImg) =>{

const bodyFormData=  new FormData();

bodyFormData.append('fileImg',fileImg);

    return axios({
        method: 'post',
        url: '/api/v1/file/upload',
        data: bodyFormData,
        headers: {
            "Content-Type":"multipart/form-data",
            "upload-type": "book"
        },
        });
    }

export const callUploadAvatarImg=(fileImg) =>{

        const bodyFormData=  new FormData();
        
        bodyFormData.append('fileImg',fileImg);
        
            return axios({
                method: 'post',
                url: '/api/v1/file/upload',
                data: bodyFormData,
                headers: {
                    "Content-Type":"multipart/form-data",
                    "upload-type": "avatar"
                },
                });
            }

            
export const callFetchCategory = () => {
    return axios.get(`/api/v1/database/category`)
}

export const fetchCreateNewBook  = (thumbnail,slider,mainText,author,price,sold,quantity,category) => {
    return axios.post(`/api/v1/book`,{"thumbnail" :thumbnail ,
    "slider" : slider,
    "mainText" :mainText,
    "author" : author,
    "price" : price,
    "sold" : sold,
    "quantity" : quantity,
    "category" : category})
}


export const fetchUpdateBook  = (id,thumbnail,slider,mainText,author,price,sold,quantity,category) => {
    return axios.put(`/api/v1/book/${id}`,{"thumbnail" :thumbnail ,
    "slider" : slider,
    "mainText" :mainText,
    "author" : author,
    "price" : price,
    "sold" : sold,
    "quantity" : quantity,
    "category" : category})
}


export const fetchDeleteBook  = (_id) => {
    return axios.delete(`/api/v1/book/${_id}`)
}

export const getBookById = (id) => {
    return axios.get(`/api/v1/book/${id}`)

}

export const fetchCreateNewOrder = (name,address,phone,totalPrice,detail) => {
    return axios.post(`/api/v1/order`,{
        "name" : name,
        "address" : address,
        "phone" : phone,
        "totalPrice" : totalPrice,
        "detail" : detail
    })

}



export const getOrderHistory = () => {
    return axios.get(`/api/v1/history`)

}


export const updateUserInfo = (_id , phone , fullName , avatar) => {
    return axios.put(`/api/v1/user`,{
        _id ,phone, fullName , avatar
    })
}

export const updateUserPassword = (email ,oldpass , newpass) => {
    return axios.post(`/api/v1/user/change-password`,{
        email, oldpass , newpass
    })
}


export const getDashboard = () => {
    return axios.get(`/api/v1/database/dashboard`)

}