import '../styles/style.css'



const Header = () => {

    const menus = [
    { label: "หน้าแรก", href: "/" },
    { label: "สินค้า", href: "/products" },
    { label: "เกี่ยวกับเรา", href: "/about" },
    { label: "ติดต่อ", href: "/contact" },  
]

    return(
        <header className="header">
            {/* logo */}
            <div className="header-title">
                Onitensei Store
            </div>

            {/* Navigation bar */}

            <nav className="header-nav">
                {menus.map((item) =>{
                    return (
                        <a className="menu-title"key={item.href} href={item.href}>
                         {item.label}
                    </a> 
                    )})}
            </nav>
        </header>
    )
}

export default Header;