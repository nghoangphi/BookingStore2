import axios from '../utils/axiosCustomize';
const postCreateNewUser = (name, email, credit, phone, role, date, image) => {
    let data = {
        name: name,
        email: email,
        credit: credit,
        phone: phone,
        role: role,
        date: date,
        image: image
    }
    return axios.post('create', data)
}

const getAllUsers = () => {
    return axios.get('getallusers')
        .then(response => {
            console.log('User data:', response.data);
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching users:', error);
            throw error; // Rethrow the error to handle it further up the chain
        });
}
const putUpdateUser = (id, name, email, credit, phone, role, date) => {
    let data = {
        id: id,
        name: name,
        email: email,
        credit: credit,
        phone: phone,
        role: role,
        date: date,

    }
    return axios.put(`updateuser/${id}`, data)
}
const deleteUser = async (userId) => {
    try {
        const response = await axios.delete(`deleteuser/${userId}`);
        console.log('User deleted successfully');
        return response.data; // Trả về dữ liệu của người dùng đã bị xóa
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};

export { postCreateNewUser, getAllUsers, putUpdateUser, deleteUser }