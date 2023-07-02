export const isLoggedIn = ()=>{
    const data = localStorage.getItem('user-info')
    if(data != null) return true
    else return false
}
const AuthUser = () => {
   
}
// export {isLoggedIn}
export default AuthUser
