import NavBar from '../navbar/NavBar'
import Footer from '../footer/Footer'

// eslint-disable-next-line react/prop-types
export default function Layout({ children }) {
    return (
        <div>
            <NavBar />
            {children}
            <Footer />
        </div>
    )
}
