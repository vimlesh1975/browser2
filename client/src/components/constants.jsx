import moment from "moment";
export const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
};

export const myTime = val => {
    return moment(val).format('yyyy-MM-DDTHH:mm:ss');
}
