import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./assets/styles/productDetail.css";

export default function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProduct() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`http://localhost:3000/products/${productId}`, {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(`Product not found: ${res.status}`);
        }

        const data = await res.json();
        setProduct(data);
        setSelectedImage(0);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Failed to load product");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
    return () => controller.abort();
  }, [productId]);

  const handleAddToCart = () => {
    // Add to cart logic
    console.log(`Added ${quantity} of product ${productId} to cart`);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  if (loading) {
    return (
      <div className="product-detail-container">
        <div className="loading">Loading product...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-detail-container">
        <div className="error">
          <p>Error: {error}</p>
          <button onClick={() => navigate(-1)} className="back-btn">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-container">
        <div className="error">
          <p>Product not found</p>
          <button onClick={() => navigate(-1)} className="back-btn">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Mock image array if not provided
  const images = product.images && product.images.length > 0 
    ? product.images 
    : [product.image, product.image, product.image, product.image];

  return (
    <div className="product-detail-container">
      <button onClick={() => navigate(-1)} className="back-btn">
        ← Back
      </button>

      <div className="product-detail-wrapper">
        {/* Image Gallery Section */}
        <div className="product-images-section">
          <div className="main-image">
            <img
              src={images[selectedImage]}
              alt={product.title}
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/500x500?text=Product+Image";
              }}
            />
          </div>

          <div className="thumbnail-gallery">
            {images.map((img, index) => (
              <div
                key={index}
                className={`thumbnail ${selectedImage === index ? "active" : ""}`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={img}
                  alt={`${product.title} ${index + 1}`}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/80x80?text=Thumb";
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Information Section */}
        <div className="product-info-section">
          <div className="product-header">
            <h1 className="product-title">{product.title}</h1>
            <p className="product-category">{product.category}</p>
          </div>

          {/* Rating */}
          <div className="product-rating">
            <div className="stars">
              {"★".repeat(Math.round(product.rating?.rate || 4))}
              {"☆".repeat(5 - Math.round(product.rating?.rate || 4))}
            </div>
            <span className="rating-text">
              {product.rating?.rate || 4.5} ({product.rating?.count || 0} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="product-price">
            <span className="current-price">${product.price}</span>
            {product.originalPrice && (
              <span className="original-price">${product.originalPrice}</span>
            )}
          </div>

          {/* Description */}
          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          {/* Size/Color Options */}
          {product.sizes && (
            <div className="product-option">
              <label>Size:</label>
              <div className="size-options">
                {product.sizes.map((size) => (
                  <button key={size} className="size-btn">
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.colors && (
            <div className="product-option">
              <label>Color:</label>
              <div className="color-options">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className="color-btn"
                    style={{ backgroundColor: color.toLowerCase() }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="quantity-section">
            <label htmlFor="quantity">Quantity:</label>
            <select
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              className="quantity-select"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          {/* Add to Cart Button */}
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>

          {/* Additional Information */}
          <div className="product-additional-info">
            <div className="info-item">
              <span className="icon">📦</span>
              <span>Free Shipping on orders over $50</span>
            </div>
            <div className="info-item">
              <span className="icon">↩️</span>
              <span>30-day return policy</span>
            </div>
            <div className="info-item">
              <span className="icon">🔒</span>
              <span>Secure checkout</span>
            </div>
          </div>

          {/* Share Section */}
          <div className="share-section">
            <span>Share:</span>
            <div className="social-links">
              <a href="#" className="social-btn">Facebook</a>
              <a href="#" className="social-btn">Twitter</a>
              <a href="#" className="social-btn">Pinterest</a>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section (Optional) */}
      <div className="related-products-section">
        <h2>You Might Also Like</h2>
        <div className="related-products-grid">
          {/* Add related products here */}
        </div>
      </div>
    </div>
  );
}
