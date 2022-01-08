import { useState, useEffect } from 'react'
import { api } from '../api';

export const useFindUser = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const findUser = async () => {
            try {
                const { data } = await api.getUser()
                const { email, role } = data
                setUser({ email, role })
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
