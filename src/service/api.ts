import axios from 'axios'

export const BASE_API = 'http://192.168.0.113:2500';

export const api = {
    music: async () => {
        const res = await axios.get(`${BASE_API}/list/musics`);
        return res.data;
    },
    author: async (id: string) => {
        const res = await axios.post(`${BASE_API}/author`, {id})
        return res.data;
    },
    serash: async (title: string) => {
        const res = await axios.post(`${BASE_API}/musuc/searsh`, {title})
        return res.data;
    }
 
};