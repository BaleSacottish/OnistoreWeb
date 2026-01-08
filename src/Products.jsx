import { useEffect,  useState } from "react";
// import style from './assets/styles/style.css'
import './assets/styles/style.css'

export default function Products() {
    const[Products ,setProducts] = useState([])
    const[loading, setLoading] = useState(true)
    const [error, setErr] = useState(null)

   

    useEffect(() =>{
        const controller = new AbortController();

        async function fecthProduct() {
            try {
                setLoading(true)
                setErr(null)

                const res = await fetch("https://fakestoreapi.com/products", {signal: controller.signal,})
                
                if (!res.ok) {
                    throw new Error(`Request failed,${res.status} ${res.statusText}`)
                }

                const data = await res.json();
                setProducts(data)
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
        
    },[]);

    if (loading) return <p>Loading...</p>
    if (error) return <p style={{color: "res"} }>Error : {error}</p>

    

    return (
        <div className="container" style={{paddingLeft: 24, paddingRight: 24}}>
            <h2>Onitensei Store</h2>
            <ul style={{lineHeight:1.8}}>
                <div className="product-grid">
                     {Products.map((item) =>
                (
                    // <li key={item.id}>
                    //     <img src={item.image} alt="images" className="reponsive-img" />
                    //     <strong className="">{item.title}</strong> - ${item.price}
                    // </li>
                    <div className="product-card">
                        <img src={item.image} alt="title" className="product-imgage-images" />
                        <div className="product-content">
                            <div className=".product-title">{item.title}</div>
                            <div className=".product-price ">${item.price}</div>
                            <button className=".product-button">Add to card</button>
                        </div>
                    </div>
                ))}
                </div>
               

            </ul>
        </div>
    )
}