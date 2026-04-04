import { useDispatch } from 'react-redux'
import { login, register, logout, getMe } from '../Services/auth.api'
import { setUser, setError, setLoading, setUsername } from '../auth.slice'

export const useAuth = () => {
    const dispatch = useDispatch()
    const handleLogin = async (username, email, password) => {
        try {
            dispatch(setLoading(true))
            const response = await login(username, email, password)
            dispatch(setUser(response.user))
            dispatch(setLoading(false))
            dispatch(setUsername(response.user.user))
        }
        catch (error) {
            dispatch(setError(error.message))
        }
    }
    const handleRegister = async (username, email, password) => {
        try {
            dispatch(setLoading(true))
            const response = await register(username, email, password)
            dispatch(setUser(response.user))
            dispatch(setLoading(false))
            dispatch(setUsername(response.user.user))
        }
        catch (error) {
            dispatch(setError(error.message))
            dispatch(setLoading(false))
        }
    }
    const handleLogout = async () => {
        try {
            dispatch(setLoading(true))
            await logout()
            dispatch(setUser(null))
            dispatch(setLoading(false))
            dispatch(setUsername(null))
        }
        catch (error) {
            dispatch(setError(error.message))
            dispatch(setLoading(false))
        }
    }
    const handleGetMe = async () => {
        try {
            dispatch(setLoading(true))
            const response = await getMe()
            dispatch(setUser(response.user))
            dispatch(setLoading(false))
        }
        catch (error) {
            dispatch(setError(error.message))
            dispatch(setLoading(false))
        }
    }
    return { handleLogin, handleRegister, handleLogout, handleGetMe }
}
