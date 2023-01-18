import Header from './Header'
import { useAuth } from '../context/AuthUserContext';
export default function Layout({ children }) {
    const { authUser, loading, signOut } = useAuth()
    return (
        <>
            <Header authUser={authUser} signOut ={signOut}/>
            <main>{children}</main>
        </>
    )
}