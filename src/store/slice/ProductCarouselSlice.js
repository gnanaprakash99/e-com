import { createSlice } from "@reduxjs/toolkit";

const defaultProducts = [
        // Fashion
        { id: 1, name: 'Men’s T-Shirt', category: 'fashion', price: 599, description: 'Cotton crew neck t-shirt', image: ['https://m.media-amazon.com/images/I/81eeXxnDWWL._UY1100_.jpg','https://www.jiomart.com/images/product/original/rvnmxraqrp/royar-traders-shirt-shirts-shirt-for-men-men-shirt-kids-shirt-formal-shirt-cotton-shirt-slim-fit-shirt-half-sleeve-shirt-solid-color-shirt-office-wear-shirt-summer-shirt-party-wear-shirt-stylish-shirt-green-l-product-images-rvnmxraqrp-0-202409031928.jpg?im=Resize=(500,630)','https://www.seasonbazaar.com/wp-content/uploads/2019/08/TUNEVUSE-Mens-shirts-Camisa-Masculina-Long-Sleeve-Shirt-Men-Korean-Slim-Design-Formal-Casual-Male-Dress-9.jpg'] },
        { id: 2, name: 'Women’s Kurti', category: 'fashion', price: 999, description: 'Printed kurti for casual wear', image: ['https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.craftzone.in%2Fwinter-woolen-long-sweater-for-women-beautiful-authentic-slong-sweater-for-women%2FSKU0000003961%3Fsrsltid%3DAfmBOore6dzah6ANqpteLJl7u9P0yoSGytHD7m1WHZ0Sv4OPnOXuX37h&psig=AOvVaw2KQ088dXtZ_-Cu28COv6dR&ust=1754628633968000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCOjTgJjz944DFQAAAAAdAAAAABAE','https://craftzone.in/backend/uploads/products/SKU0000003960/0a85f490bdba24d1804822e1c374064f.webp']},
        { id: 3, name: 'Sneakers - Unisex', category: 'fashion', price: 1999, description: 'Trendy sneakers with soft soles', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
        { id: 4, name: 'Backpack - Casual', category: 'fashion', price: 899, description: 'Multi-compartment backpack', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
        { id: 5, name: 'Sunglasses - Aviator', category: 'fashion', price: 1299, description: 'UV protected metal frame sunglasses', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },

        // Appliances
        { id: 6, name: 'Air Conditioner', category: 'appliances', price: 32999, description: '1.5 Ton Split AC with inverter technology', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
        { id: 7, name: 'Washing Machine', category: 'appliances', price: 18999, description: 'Front load washing machine with smart inverter', image: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80','https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80','https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'] },
        { id: 8, name: 'Refrigerator', category: 'appliances', price: 22999, description: 'Double door fridge with frost free technology', image: ['https://images.unsplash.com/photo-1590080877789-cdb875cd7c44?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'] },
        { id: 9, name: 'Microwave Oven', category: 'appliances', price: 8999, description: 'Convection microwave for fast cooking', image: 'https://images.unsplash.com/photo-1545249394-066c6c134f67?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
        { id: 10, name: 'Dishwasher', category: 'appliances', price: 27999, description: '12 place setting dishwasher', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },

        // Mobiles
        { id: 11, name: 'iPhone 15', category: 'mobiles', price: 79999, description: 'Latest Apple iPhone with A17 Bionic chip', image: 'iphone15.jpg' },
        { id: 12, name: 'Samsung Galaxy S24', category: 'mobiles', price: 74999, description: 'Flagship Android phone from Samsung', image: 's24.jpg' },
        { id: 13, name: 'OnePlus 12', category: 'mobiles', price: 62999, description: 'Smooth performance with Snapdragon processor', image: 'oneplus12.jpg' },
        { id: 14, name: 'Realme Narzo', category: 'mobiles', price: 13999, description: 'Budget-friendly smartphone with great battery life', image: 'narzo.jpg' },
        { id: 15, name: 'Xiaomi Redmi Note 13', category: 'mobiles', price: 15999, description: 'Value for money mid-range phone', image: 'redmi13.jpg' },

        // Electronics
        { id: 16, name: 'Bluetooth Speaker', category: 'electronics', price: 2499, description: 'Portable speaker with deep bass', image: 'speaker.jpg' },
        { id: 17, name: 'Smart TV 43"', category: 'electronics', price: 24999, description: 'Full HD LED TV with smart features', image: 'tv.jpg' },
        { id: 18, name: 'Laptop - HP Pavilion', category: 'electronics', price: 55999, description: 'Powerful laptop with i5 processor', image: 'laptop.jpg' },
        { id: 19, name: 'Wireless Earbuds', category: 'electronics', price: 4999, description: 'Noise-canceling TWS earbuds', image: 'earbuds.jpg' },
        { id: 20, name: 'Tablet - iPad Air', category: 'electronics', price: 45999, description: 'Sleek and powerful tablet for creatives', image: 'ipad.jpg' },

        // Beauty
        { id: 21, name: 'Face Wash', category: 'beauty', price: 299, description: 'Daily face wash with natural ingredients', image: 'facewash.jpg' },
        { id: 22, name: 'Lipstick Set', category: 'beauty', price: 899, description: 'Matte finish lipsticks in 5 shades', image: 'lipsticks.jpg' },
        { id: 23, name: 'Sunscreen SPF 50', category: 'beauty', price: 499, description: 'Broad spectrum sun protection', image: 'sunscreen.jpg' },
        { id: 24, name: 'Makeup Kit', category: 'beauty', price: 2499, description: 'Complete professional makeup set', image: 'makeup.jpg' },
        { id: 25, name: 'Perfume - Floral Mist', category: 'beauty', price: 1199, description: 'Long lasting fragrance for women', image: 'perfume.jpg' },

        // Grocery
        { id: 26, name: 'Basmati Rice 5kg', category: 'grocery', price: 599, description: 'Premium long grain rice', image: 'rice.jpg' },
        { id: 27, name: 'Organic Wheat Flour', category: 'grocery', price: 349, description: 'Stone-ground whole wheat atta', image: 'wheat.jpg' },
        { id: 28, name: 'Cooking Oil 1L', category: 'grocery', price: 179, description: 'Refined sunflower oil for healthy cooking', image: 'oil.jpg' },
        { id: 29, name: 'Spices Combo Pack', category: 'grocery', price: 499, description: 'Essential Indian spices in one pack', image: 'spices.jpg' },
        { id: 30, name: 'Tea Powder 500g', category: 'grocery', price: 249, description: 'Strong and aromatic tea blend', image: 'tea.jpg' },

        // Furniture
        { id: 31, name: 'Wooden Coffee Table', category: 'furniture', price: 4999, description: 'Compact and stylish center table', image: 'coffee_table.jpg' },
        { id: 32, name: 'Queen Bed Frame', category: 'furniture', price: 11999, description: 'Solid wood frame with headboard', image: 'bed.jpg' },
        { id: 33, name: 'Office Chair', category: 'furniture', price: 3999, description: 'Ergonomic design with lumbar support', image: 'chair.jpg' },
        { id: 34, name: 'Bookshelf - 5 Tier', category: 'furniture', price: 3499, description: 'Compact storage for books and décor', image: 'bookshelf.jpg' },
        { id: 35, name: 'Dining Table Set', category: 'furniture', price: 15999, description: '4-seater dining table with chairs', image: 'dining.jpg' },

        // Toys
        { id: 36, name: 'Remote Car', category: 'toys', price: 1499, description: 'Fast and durable remote control car', image: 'remote_car.jpg' },
        { id: 37, name: 'Building Blocks', category: 'toys', price: 699, description: '100-piece colorful block set', image: 'blocks.jpg' },
        { id: 38, name: 'Doll House', category: 'toys', price: 1999, description: 'Miniature house with accessories', image: 'dollhouse.jpg' },
        { id: 39, name: 'Puzzle Game', category: 'toys', price: 299, description: 'Brain development puzzle for kids', image: 'puzzle.jpg' },
        { id: 40, name: 'Action Figure - Superhero', category: 'toys', price: 899, description: 'Articulated collectible figure', image: 'superhero.jpg' },

        // Books
        { id: 41, name: 'Atomic Habits', category: 'books', price: 449, description: 'Bestseller by James Clear', image: 'atomic.jpg' },
        { id: 42, name: 'The Alchemist', category: 'books', price: 299, description: 'Inspirational story by Paulo Coelho', image: 'alchemist.jpg' },
        { id: 43, name: 'Harry Potter Box Set', category: 'books', price: 2999, description: 'All 7 books by J.K. Rowling', image: 'harrypotter.jpg' },
        { id: 44, name: 'Rich Dad Poor Dad', category: 'books', price: 399, description: 'Financial advice by Robert Kiyosaki', image: 'richdad.jpg' },
        { id: 45, name: 'Wings of Fire', category: 'books', price: 199, description: 'Autobiography of Dr. A.P.J. Abdul Kalam', image: 'wings.jpg' },

        // Pharmacy
        { id: 46, name: 'Paracetamol Tablets', category: 'pharmacy', price: 25, description: 'Pain and fever reducer', image: 'paracetamol.jpg' },
        { id: 47, name: 'Vitamin C Capsules', category: 'pharmacy', price: 199, description: 'Boosts immunity', image: 'vitaminc.jpg' },
        { id: 48, name: 'Hand Sanitizer 500ml', category: 'pharmacy', price: 149, description: 'Kills 99.9% germs', image: 'sanitizer.jpg' },
        { id: 49, name: 'Digital Thermometer', category: 'pharmacy', price: 299, description: 'Fast and accurate temperature check', image: 'thermometer.jpg' },
        { id: 50, name: 'First Aid Kit', category: 'pharmacy', price: 499, description: 'Essential emergency items', image: 'firstaid.jpg' }
    ]

// Products from localStorage
const storedData = JSON.parse(localStorage.getItem("productData")) || [];

// Merge while ensuring no duplicate `id`s
const mergedProducts = [
  ...defaultProducts,
  ...storedData.filter(newProd =>
    !defaultProducts.some(defaultProd => defaultProd.id === newProd.id)
  )
];

const initialState = {
  ProductData: mergedProducts,
};

const productCarouselSlice = createSlice({
  name: 'ProductData',
  initialState,
  reducers: {
    setProductData: (state, action) => {
      state.ProductData = action.payload || [];
      localStorage.setItem("productData", JSON.stringify(
        state.ProductData.filter(prod => prod.id > 50) // only store new
      ));
    },
    addProduct: (state, action) => {
      const newProduct = {
        ...action.payload,
        id: state.ProductData.length + 1
      };
      state.ProductData.push(newProduct);

      // Save only the added (non-default) products to localStorage
      const newProductsOnly = state.ProductData.filter(p => p.id > 50);
      localStorage.setItem("productData", JSON.stringify(newProductsOnly));
    },
  }
});

export const { setProductData, addProduct } = productCarouselSlice.actions;
export default productCarouselSlice.reducer;
