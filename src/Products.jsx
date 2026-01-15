import { useEffect,  useState } from "react";
import { Link, useParams } from "react-router-dom";
// import style from './assets/styles/style.css'
import './assets/styles/style.css'

export default function Products() {
    const { category } = useParams();
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
                
                // Filter by category if provided
                if (category) {
                    const categories = category.split(',').map(cat => cat.trim().toLowerCase());
                    const filtered = data.filter(product => 
                        product.category && categories.includes(product.category.toLowerCase())
                    );
                    setProducts(filtered);
                } else {
                    setProducts(data);
                }
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
        
    },[category]);

    if (loading) return <p>Loading...</p>
    if (error) return <p style={{color: "res"} }>Error : {error}</p>

    

    return (
        <div className="container" style={{paddingLeft: 10, paddingRight: 24}}>
            <ul style={{lineHeight:1.8}}>
                <div className="product-grid">
                     {Products.map((item) =>
                     
                (
                    <Link to={`/product/${item.id}`} key={item.id} className="product-card-link">
                        <div className="product-card">
                            <img src={item.image} alt="product" className="product-imgage-images" />
                            <div className="product-content">
                                <div className="product-title">{item.title}</div>
                                <div className="product-price ">${item.price}</div>
                            </div>
                            <button className="product-button" onClick={(e) => e.preventDefault()}>Add to card</button>
                        </div>
                    </Link>
                ))}
                </div>
               

            </ul>
        </div>
    )
}