import { useEffect,  useState } from "react";
import { Link, useParams } from "react-router-dom";
// import style from './assets/styles/style.css'
import './assets/styles/style.css'
import Banner from './assets/component/banner'

export default function Products() {
    const { category, searchQuery } = useParams();
    const[Products ,setProducts] = useState([])
    const[loading, setLoading] = useState(true)
    const [error, setErr] = useState(null)

   console.log("Products State:", Products);

    useEffect(() =>{
        const controller = new AbortController();

        async function fecthProduct() {
            try {
                setLoading(true)
                setErr(null)

                // const res = await fetch("https://fakestoreapi.com/products", {signal: controller.signal,})
                const res = await fetch("http://localhost:3000/products", {signal: controller.signal,})
                
                
                if (!res.ok) {
                    throw new Error(`Request failed,${res.status} ${res.statusText}`)
                }

                const data = await res.json();
                console.log("API Response:", data);
                console.log("First item:", data[0]);
                
                let filteredData = data;

                // Filter by category if provided
                if (category) {
                    const categories = category.split(',').map(cat => cat.trim().toLowerCase());
                    filteredData = filteredData.filter(product => 
                        product.category && categories.includes(product.category.toLowerCase())
                    );
                }

                // Filter by search query if provided (search in title and category)
                if (searchQuery) {
                    const query = searchQuery.toLowerCase();
                    filteredData = filteredData.filter(product =>
                        (product.title && product.title.toLowerCase().includes(query)) ||
                        (product.category && product.category.toLowerCase().includes(query))
                    );
                }

                // Sort by rating (highest first) and limit to 5 items
                filteredData = filteredData
                    .sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))
                    .slice(0, 4);

                setProducts(filteredData);
            } catch (err) {
                if (err.name !== "AbortError") {
                    setErr(err.message || "Something went wrong")
                }
            } finally {
                setLoading(false);
            }
        }
        fecthProduct();
       
        return () => controller.abort();
        
    },[category, searchQuery]);

    const handleAddToCart = (e, product) => {
        e.preventDefault();
        
        // Get existing cart from localStorage
        const savedCart = localStorage.getItem('cart');
        let cart = savedCart ? JSON.parse(savedCart) : [];
        
        // Check if product already exists in cart
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            // Increase quantity if product exists
            existingItem.quantity += 1;
        } else {
            // Add new product to cart
            cart.push({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                category: product.category,
                quantity: 1
            });
        }
        
        // Save updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Show feedback
        alert(`${product.title} added to cart!`);
    }

    if (loading) return <p>Loading...</p>
    if (error) return <p style={{color: "res"} }>Error : {error}</p>

    

    return (
        <div>
            {!category && !searchQuery && <Banner />}
            <div className="container" style={{paddingLeft: 10, paddingRight: 24}}>
                <ul style={{lineHeight:1.8}}>
                    <div className="product-grid">
                         {Products.map((item) =>
                         
                    (
                        <div key={item.id} className="product-card-link">
                            <Link to={`/product/${item.id}`} className="product-card-inner">
                                <img src={item.image} alt="product" className="product-imgage-images" />
                                <div className="product-content">
                                    <div className="product-title">{item.title}</div>
                                    <div className="product-price ">${item.price}</div>
                                    <div className="product-rating" style={{display: 'flex', alignItems: 'center', gap: '5px', marginTop: '8px'}}>
                                        <span style={{color: '#FFC107', fontSize: '18px'}}>★</span>
                                        <span style={{fontSize: '14px'}}>{item.rating?.rate || 0} ({item.rating?.count || 0})</span>
                                    </div>
                                </div>
                            </Link>
                            <button 
                                className="product-button" 
                                onClick={(e) => handleAddToCart(e, item)}
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))}
                    </div>
                   

                </ul>
            </div>
        </div>
    )
}