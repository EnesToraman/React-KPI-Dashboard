import { useState, useEffect } from 'react'
import { api } from '../apis/api';

export const useFindUser = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const findUser = async () => {
            try {
                const { data } = await api.getUser()
                const { email } = data
                setUser({ email })
            } catch (error) { }
            setLoading(false);
        }
        findUser();
    }, []);


    return {
        user,
        isLoading,
        setUser
    }
}
