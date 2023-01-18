import axios from 'axios'

export const BASE_API = 'http://192.168.0.109:2500';

export const api = {
    music: async () => {
        const res = await axios.get(`${BASE_API}/list/musics`);
        return res.data;
    },
    musicById: async (id: string) => {
        const res = await axios.post(`${BASE_API}/music`, {id});
        return res.data;
    },
    author: async (id: string) => {
        const res = await axios.post(`${BASE_API}/author`, {id})
        return res.data;
    },
    searsh: async (title: string) => {
        const res = await axios.post(`${BASE_API}/music/searsh`, {title})
        return res.data;
    },
    validate: async (token: string) => {
        const res = await axios.post(`${BASE_API}/validate`, { token })
        return res.data;
    },
    login: async (email: string, password: string) => {
        const res = await axios.post(`${BASE_API}/login`, {email, password})
        return res.data;
    },
    historicSave: async ({musicId, userId} : {musicId: string, userId: string}) => {
        const res = await axios.post(`${BASE_API}/save/hitoric`, {musicId, userId})
        return res.data;
    },
    historicList: async (userId: string) => {
        const res = await axios.post(`${BASE_API}/list/hitoric`, {userId})
        return res.data;
    }
};