import axios from 'axios';

export async function editProfile(data) {
    try {
        const response = await axios.post('/profile/edit',data);
        const result = await response;
        return result;    
    }catch(err) {
        console.log(err)
    }
}

export async function editPhotoProfile(photo) {
    try {
        const response = await axios.post('/profile/edit/photo',photo);
        const result = await response;
        return result;
    }catch(err) {
        console.log(err)
    }
}