import '../styles/style.css'
import Logo from '../img/Header.png'
import { Link } from 'react-router-dom'


const Header = () => {

    const menus = [
    { label: "HOME", href: "/" },
    { label: "BUSHI-SOU", href: "/category/ashigaru,o-yoroi,mushashugyo" },
    { label: "GEN-SUI", href: "/category/Shaker,Tumbler,Mug" },
    { label: "HYO-SOU", href: "/category/Accessories" },  
]

    return(
        <header className="header">
            {/* logo */}
            <div className="header-logo">
                <img src={Logo} alt="Onitensei Store" className="reponsive-img" />
                <div className="header-title">
                    Onitensei Store
                </div>
            </div>

            {/* Navigation bar */}

            <nav className="header-nav">
                {menus.map((item) =>{
                    return (
                        <a className="menu-title"key={item.href} href={item.href}>
                         {item.label}
                    </a> 
                    )})}
                {/* Cart link on the far right */}
                <Link to="/cart" className="menu-title" style={{ marginLeft: 'auto' }}>
                    🛒 Cart
                </Link>
            </nav>
        </header>
    )
}

export default Header;