import '../styles/style.css'
import Logo from '../img/Header.png'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'


const Header = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const menus = [
    { label: "HOME", href: "/" },
    { label: "BUSHI-SOU", href: "/category/ashigaru,o-yoroi,mushashugyo" },
    { label: "GEN-SUI", href: "/category/Shaker,Tumbler,Mug" },
    { label: "HYO-SOU", href: "/category/Accessories" },  
]

    // Fetch all products on mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true)
                const res = await fetch("http://localhost:3000/products")
                if (res.ok) {
                    const data = await res.json()
                    setProducts(data)
                }
            } catch (err) {
                console.error("Error fetching products:", err)
            } finally {
                setIsLoading(false)
            }
        }
        fetchProducts()
    }, [])

    // Real-time search with debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchTerm.trim()) {
                const query = searchTerm.toLowerCase()
                const filtered = products.filter(product =>
                    (product.title && product.title.toLowerCase().includes(query)) ||
                    (product.category && product.category.toLowerCase().includes(query))
                )
                setFilteredProducts(filtered.slice(0, 20)) // Show top 20 results
            } else {
                // When search is empty, show all products
                setFilteredProducts(products.slice(0, 20))
            }
        }, 300)

        return () => clearTimeout(timer)
    }, [searchTerm, products])

    const handleClearSearch = () => {
        setSearchTerm('')
        setFilteredProducts([])
    }

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`)
        setSearchTerm('')
        setIsModalOpen(false)
    }

    const handleAddToCart = (e, product) => {
        e.stopPropagation()
        
        // Get existing cart from localStorage
        const savedCart = localStorage.getItem('cart')
        let cart = savedCart ? JSON.parse(savedCart) : []
        
        // Check if product already exists in cart
        const existingItem = cart.find(item => item.id === product.id)
        
        if (existingItem) {
            // Increase quantity if product exists
            existingItem.quantity += 1
        } else {
            // Add new product to cart
            cart.push({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                category: product.category,
                quantity: 1
            })
        }
        
        // Save updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart))
        
        // Show feedback
        alert(`${product.title} added to cart!`)
    }

    const handleOpenModal = () => {
        setIsModalOpen(true)
    }

    const handleModalClose = () => {
        setIsModalOpen(false)
        setSearchTerm('')
        setFilteredProducts([])
    }

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
                
                {/* Search and Cart section */}
                <div className="header-actions-section">
                    {/* Search Button - opens modal */}
                    <button 
                        className="search-btn" 
                        onClick={handleOpenModal}
                        aria-label="Open search"
                    >
                        🔍
                    </button>
                    
                    {/* Cart link on the far right */}
                    <Link to="/cart" className="menu-title cart-link">
                        🛒
                    </Link>
                </div>
            </nav>

            {/* Search Modal/Popup */}
            {isModalOpen && (
                <>
                    {/* Modal Overlay */}
                    <div className="search-modal-overlay" onClick={handleModalClose}></div>
                    
                    {/* Modal Content */}
                    <div className="search-modal">
                        <div className="search-modal-header">
                            {/* Search input inside modal */}
                            <div className="search-wrapper">
                                <input 
                                    type="text" 
                                    className="search-input modal-search-input" 
                                    placeholder="SEARCH PRODUCTS..." 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    autoFocus
                                />
                                
                                {/* Clear button - appears when search has text */}
                                {searchTerm && (
                                    <button 
                                        className="search-clear-btn" 
                                        onClick={handleClearSearch}
                                        aria-label="Clear search"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>

                            <button 
                                className="search-modal-close" 
                                onClick={handleModalClose}
                            >
                                ✕
                            </button>
                        </div>

                        <div className="search-modal-content">
                            {isLoading ? (
                                <div className="search-loading">
                                    <div className="loading-spinner"></div>
                                    <p>Loading products...</p>
                                </div>
                            ) : filteredProducts.length > 0 ? (
                                <div className="search-results-grid">
                                    {filteredProducts.map((product) => (
                                        <div 
                                            key={product.id} 
                                            className="search-result-item"
                                        >
                                            <div className="search-result-image">
                                                <img 
                                                    src={product.image} 
                                                    alt={product.title}
                                                    onClick={() => handleProductClick(product.id)}
                                                    style={{ cursor: 'pointer' }}
                                                />
                                            </div>
                                            <div className="search-result-info">
                                                <h3 onClick={() => handleProductClick(product.id)} style={{ cursor: 'pointer' }}>
                                                    {product.title}
                                                </h3>
                                                <p className="search-result-category">{product.category}</p>
                                                <p className="search-result-price">${product.price}</p>
                                                <button 
                                                    className="search-result-add-btn"
                                                    onClick={(e) => handleAddToCart(e, product)}
                                                >
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="search-no-results">
                                    <p>No products found</p>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </header>
    )
       
    
}

export default Header;