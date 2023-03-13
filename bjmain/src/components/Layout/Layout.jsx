import Footer from "./Footer/Footer";
import NavBar from "./NavBar/NavBar";

const Layout = ({ children }) => {
    return(
        <div>
            <NavBar />

            {children}
            
            <Footer />
        </div>
    )
}

export default Layout;
