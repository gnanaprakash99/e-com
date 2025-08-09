import { createSlice } from "@reduxjs/toolkit";

const sampleProducts = [
  // Appliances
  { id: 6, name: 'Air Conditioner', category: 'appliances', price: 32999, description: '1.5 Ton Split AC with inverter technology', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80' },
  { id: 7, name: 'Washing Machine', category: 'appliances', price: 18999, description: 'Front load washing machine with smart inverter', image: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80'] },
  { id: 8, name: 'Refrigerator', category: 'appliances', price: 22999, description: 'Double door fridge with frost free technology', image: ['https://images.unsplash.com/photo-1590080877789-cdb875cd7c44?auto=format&fit=crop&w=600&q=80'] },
  { id: 9, name: 'Microwave Oven', category: 'appliances', price: 8999, description: 'Convection microwave for fast cooking', image: 'https://images.unsplash.com/photo-1545249394-066c6c134f67?auto=format&fit=crop&w=600&q=80' },
  { id: 10, name: 'Dishwasher', category: 'appliances', price: 27999, description: '12 place setting dishwasher', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80' },

  // Mobiles
  { id: 11, name: 'iPhone 15', category: 'mobiles', price: 79999, description: 'Latest Apple iPhone with A17 Bionic chip', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80' },
  { id: 12, name: 'Samsung Galaxy S24', category: 'mobiles', price: 74999, description: 'Flagship Android phone from Samsung', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80' },
  { id: 13, name: 'OnePlus 12', category: 'mobiles', price: 62999, description: 'Smooth performance with Snapdragon processor', image: 'https://images.unsplash.com/photo-1616140750580-2fd7c79b9d41?auto=format&fit=crop&w=600&q=80' },
  { id: 14, name: 'Realme Narzo', category: 'mobiles', price: 13999, description: 'Budget-friendly smartphone with great battery life', image: 'https://images.unsplash.com/photo-1614899963201-b1f91a4e6d1f?auto=format&fit=crop&w=600&q=80' },
  { id: 15, name: 'Xiaomi Redmi Note 13', category: 'mobiles', price: 15999, description: 'Value for money mid-range phone', image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80' },

  // Toys
  { id: 36, name: 'Remote Car', category: 'toys', price: 1499, description: 'Fast and durable remote control car', image: 'https://images.unsplash.com/photo-1558981285-6f0c94958bb6?auto=format&fit=crop&w=600&q=80' },
  { id: 37, name: 'Building Blocks', category: 'toys', price: 699, description: '100-piece colorful block set', image: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=600&q=80' },
  { id: 38, name: 'Doll House', category: 'toys', price: 1999, description: 'Miniature house with accessories', image: 'https://images.unsplash.com/photo-1603399301330-89507b70d1c6?auto=format&fit=crop&w=600&q=80' },
  { id: 39, name: 'Puzzle Game', category: 'toys', price: 299, description: 'Brain development puzzle for kids', image: 'https://images.unsplash.com/photo-1586861203944-5908e5d90c1e?auto=format&fit=crop&w=600&q=80' },
  { id: 40, name: 'Action Figure - Superhero', category: 'toys', price: 899, description: 'Articulated collectible figure', image: 'https://images.unsplash.com/photo-1589230847484-88e68cb1c97a?auto=format&fit=crop&w=600&q=80' },

  // Fashion
  { id: 1, name: 'Men’s T-Shirt', category: 'fashion', price: 599, description: 'Cotton crew neck t-shirt', image: ['https://m.media-amazon.com/images/I/81eeXxnDWWL._UY1100_.webp', 'https://craftzone.in/backend/uploads/products/SKU0000003960/0a85f490bdba24d1804822e1c374064f.webp'] },
  { id: 2, name: 'Women’s Kurti', category: 'fashion', price: 999, description: 'Printed kurti for casual wear', image: ['https://craftzone.in/backend/uploads/products/SKU0000003960/0a85f490bdba24d1804822e1c374064f.webp'] },
  { id: 3, name: 'Sneakers - Unisex', category: 'fashion', price: 1999, description: 'Trendy sneakers with soft soles', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80' },
  { id: 4, name: 'Backpack - Casual', category: 'fashion', price: 899, description: 'Multi-compartment backpack', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80' },
  { id: 5, name: 'Sunglasses - Aviator', category: 'fashion', price: 1299, description: 'UV protected metal frame sunglasses', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80' },

  // Books
  { id: 41, name: 'Atomic Habits', category: 'books', price: 449, description: 'Bestseller by James Clear', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80' },
  { id: 42, name: 'The Alchemist', category: 'books', price: 299, description: 'Inspirational story by Paulo Coelho', image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80' },
  { id: 43, name: 'Harry Potter Box Set', category: 'books', price: 2999, description: 'All 7 books by J.K. Rowling', image: 'https://images.unsplash.com/photo-1544939571-3d81eab7f5c4?auto=format&fit=crop&w=600&q=80' },
  { id: 44, name: 'Rich Dad Poor Dad', category: 'books', price: 399, description: 'Financial advice by Robert Kiyosaki', image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=600&q=80' },
  { id: 45, name: 'Wings of Fire', category: 'books', price: 199, description: 'Autobiography of Dr. A.P.J. Abdul Kalam', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80' },

  // Pharmacy
  { id: 46, name: 'Paracetamol Tablets', category: 'pharmacy', price: 25, description: 'Pain and fever reducer', image: 'https://images.unsplash.com/photo-1624635703054-4d7b65ccf2c6?auto=format&fit=crop&w=600&q=80' },
  { id: 47, name: 'Vitamin C Capsules', category: 'pharmacy', price: 199, description: 'Boosts immunity', image: 'https://images.unsplash.com/photo-1624635703054-4d7b65ccf2c6?auto=format&fit=crop&w=600&q=80' },
  { id: 48, name: 'Hand Sanitizer 500ml', category: 'pharmacy', price: 149, description: 'Kills 99.9% germs', image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=600&q=80' },
  { id: 49, name: 'Digital Thermometer', category: 'pharmacy', price: 299, description: 'Fast and accurate temperature check', image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=600&q=80' },
  { id: 50, name: 'First Aid Kit', category: 'pharmacy', price: 499, description: 'Essential emergency items', image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=600&q=80' }
];

const initialState = {
  ProductData: [...sampleProducts],
};

const productCarouselSlice = createSlice({
  name: 'ProductData',
  initialState,
  reducers: {
    setProductData: (state, action) => {
      const newProducts = action.payload || [];
      const filtered = newProducts.filter(p => {
        const imgs = Array.isArray(p.image) ? p.image : [p.image];
        return imgs.every(url => url.startsWith("http"));
      });
      state.ProductData = [...state.ProductData, ...filtered];
    },
    addProduct: (state, action) => {
      const imgs = Array.isArray(action.payload.images)
        ? action.payload.images
        : Array.isArray(action.payload.image)
          ? action.payload.image
          : [action.payload.image || action.payload.images];

      // no URL check here if you're allowing base64
      const newProduct = { ...action.payload, image: imgs, id: state.ProductData.length + 1 };
      state.ProductData.push(newProduct);
    }

  },
});

export const { setProductData, addProduct } = productCarouselSlice.actions;
export default productCarouselSlice.reducer;
