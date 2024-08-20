const Baseurls  = "https://upskilling-egypt.com:3006/api/v1/" ;
const baseUsers = `${Baseurls}/Users`

export const UserUrls = {
    login:`${baseUsers}/Login`,
    register:`${baseUsers}/Register`,
    reset:`${baseUsers}/Reset`,
    request:`${baseUsers}/Reset/Reques`,
    verify:`${baseUsers}/Verify`,
}
export const catUrls ={
    getlist:`${Baseurls}/Category`,
    deletecat:( id )=>`${Baseurls}/Category/${id}`,
    addcat:`${Baseurls}/Category`,
}