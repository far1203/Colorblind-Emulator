import HomeButton from './HomeButton.jsx';

function Layout({ children }) {
    return (
        <>
            <HomeButton />
            {children}
        </>
    )
}

export default Layout;