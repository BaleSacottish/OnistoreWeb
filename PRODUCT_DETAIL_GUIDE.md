# Product Detail Page Implementation Guide

เอกสารนี้อธิบายการตั้งค่าและการใช้งานหน้า Product Detail ใหม่

## 📦 Installation

### 1. ติดตั้ง React Router
```bash
npm install react-router-dom
```

## 📁 Files Created

### Component Files
- **[ProductDetail.jsx](src/ProductDetail.jsx)** - คอมโพเนนต์หน้า product detail แบบ responsive พร้อม:
  - Gallery รูปภาพพร้อม thumbnail selector
  - ข้อมูลสินค้า (ชื่อ, หมวดหมู่, ราคา, อัตราคะแนน)
  - ตัวเลือกขนาด (Size)
  - ตัวเลือกสี (Color)
  - ระบบเลือกจำนวน (Quantity)
  - ปุ่ม Add to Cart
  - ข้อมูลเพิ่มเติม (shipping, return policy)
  - ส่วนแชร์โซเชียล

### Style Files
- **[productDetail.css](src/assets/styles/productDetail.css)** - สไตล์สำหรับหน้า product detail พร้อม:
  - Responsive design (desktop, tablet, mobile)
  - Modern styling ที่เรียบง่าย
  - Hover effects และ transitions

## 🔄 Updated Files

### [App.jsx](src/App.jsx)
- เพิ่ม BrowserRouter และ Routes
- กำหนด route `/` สำหรับหน้า Products
- กำหนด route `/product/:productId` สำหรับหน้า ProductDetail

### [Products.jsx](src/Products.jsx)
- เพิ่ม Link component จาก react-router-dom
- แต่ละสินค้ากลายเป็น Link ที่ชี้ไป `/product/{id}`
- ปุ่ม "Add to cart" ใช้ onClick.preventDefault() เพื่อไม่ให้ navigate

## 🎨 Features

### Product Detail Page Includes:
1. **Image Gallery**
   - รูปภาพหลัก (Main image)
   - Thumbnail gallery (4 รูปแบบคอลัมน์)
   - Click on thumbnail เพื่อเปลี่ยนรูปหลัก

2. **Product Information**
   - ชื่อสินค้า (Title)
   - หมวดหมู่ (Category)
   - ราคา (Price with discount support)
   - อัตราคะแนน (Rating with stars)
   - คำบรรยาย (Description)

3. **Customization Options**
   - Size selector (ถ้า product มี sizes)
   - Color selector (ถ้า product มี colors)
   - Quantity dropdown

4. **Additional Features**
   - Add to Cart button
   - Shipping information
   - Return policy
   - Secure checkout badge
   - Share on social media

5. **Responsive Design**
   - Desktop (2 columns layout)
   - Tablet (1 column, adjusted spacing)
   - Mobile (optimized for small screens)

## 🔧 Data Structure Expected

API endpoint สำหรับ product detail ควรส่งข้อมูลในรูปแบบ:

```json
{
  "id": 1,
  "title": "Product Name",
  "price": 99.99,
  "originalPrice": 149.99,
  "category": "eyewear",
  "description": "Product description...",
  "image": "image-url",
  "images": ["img1", "img2", "img3", "img4"],
  "rating": {
    "rate": 4.5,
    "count": 120
  },
  "sizes": ["One Size", "S", "M", "L"],
  "colors": ["Black", "White", "Brown"]
}
```

## 🚀 Usage

### Navigation
```jsx
// ไปยังหน้า product detail
<Link to={`/product/${productId}`}>Product Name</Link>

// หรือ programmatic navigation
navigate(`/product/${productId}`)
```

### Go Back Feature
- ปุ่ม "← Back" ใช้ `useNavigate()` hook เพื่อกลับไปหน้าก่อนหน้า

## 📱 Responsive Breakpoints

- **Desktop**: > 1024px (2 columns layout)
- **Tablet**: 768px - 1024px (single column)
- **Mobile**: < 768px (optimized single column)
- **Extra Small**: < 480px (minimal spacing)

## 🎯 Next Steps

1. **Customize Colors**: แก้ไขสี background และ buttons ให้ตรงกับ brand ของคุณ
2. **Add to Cart Logic**: เชื่อมต่อกับ cart management system
3. **Related Products**: เพิ่มส่วน "You Might Also Like" ที่ด้านล่าง
4. **Product Reviews**: เพิ่มส่วน reviews และ ratings
5. **Image Optimization**: ใช้ image optimization libraries

## ⚙️ Customization Examples

### เปลี่ยนสีหลัก
ในไฟล์ `productDetail.css` ค้นหา `#333` และแทนที่ด้วยสีที่ต้องการ

### เพิ่มขนาด
สามารถเพิ่มตัวเลือกขนาดมากขึ้นในส่วน `size-options`

### เพิ่ม Quantity Options
ส่วน `quantity-select` สามารถเปลี่ยนเป็น increment/decrement buttons ได้

## 🔗 API Integration

ต้องปรับเปลี่ยน URL API ให้ตรงกับ backend ของคุณ:

```javascript
// ในไฟล์ ProductDetail.jsx บรรทัด ~25
const res = await fetch(`http://localhost:3000/products/${productId}`)
```

## ⚠️ Notes

- ใช้ placeholder images ถ้า image URL ไม่ valid
- Loading state แสดงขณะ fetching data
- Error handling สำหรับ network issues
- Back button ใช้ browser history

---

**Created**: January 2026
**Inspired by**: Gentle Monster Design Patterns
