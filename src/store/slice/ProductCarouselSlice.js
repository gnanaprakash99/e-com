import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    ProductData: [
        // Fashion
        { name: 'Men’s T-Shirt', category: 'fashion', price: 599, description: 'Cotton crew neck t-shirt', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
        { name: 'Women’s Kurti', category: 'fashion', price: 999, description: 'Printed kurti for casual wear', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
        { name: 'Sneakers - Unisex', category: 'fashion', price: 1999, description: 'Trendy sneakers with soft soles', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
        { name: 'Backpack - Casual', category: 'fashion', price: 899, description: 'Multi-compartment backpack', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
        { name: 'Sunglasses - Aviator', category: 'fashion', price: 1299, description: 'UV protected metal frame sunglasses', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },

        // Appliances
        { name: 'Air Conditioner', category: 'appliances', price: 32999, description: '1.5 Ton Split AC with inverter technology', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
        { name: 'Washing Machine', category: 'appliances', price: 18999, description: 'Front load washing machine with smart inverter', image: 'https://images.unsplash.com/photo-1545249394-066c6c134f67?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
        { name: 'Refrigerator', category: 'appliances', price: 22999, description: 'Double door fridge with frost free technology', image: 'fridge.jpg' },
        { name: 'Microwave Oven', category: 'appliances', price: 8999, description: 'Convection microwave for fast cooking', image: 'microwave.jpg' },
        { name: 'Dishwasher', category: 'appliances', price: 27999, description: '12 place setting dishwasher', image: 'dishwasher.jpg' },

        // Mobiles
        { name: 'iPhone 15', category: 'mobiles', price: 79999, description: 'Latest Apple iPhone with A17 Bionic chip', image: 'iphone15.jpg' },
        { name: 'Samsung Galaxy S24', category: 'mobiles', price: 74999, description: 'Flagship Android phone from Samsung', image: 's24.jpg' },
        { name: 'OnePlus 12', category: 'mobiles', price: 62999, description: 'Smooth performance with Snapdragon processor', image: 'oneplus12.jpg' },
        { name: 'Realme Narzo', category: 'mobiles', price: 13999, description: 'Budget-friendly smartphone with great battery life', image: 'narzo.jpg' },
        { name: 'Xiaomi Redmi Note 13', category: 'mobiles', price: 15999, description: 'Value for money mid-range phone', image: 'redmi13.jpg' },

        // Electronics
        { name: 'Bluetooth Speaker', category: 'electronics', price: 2499, description: 'Portable speaker with deep bass', image: 'speaker.jpg' },
        { name: 'Smart TV 43"', category: 'electronics', price: 24999, description: 'Full HD LED TV with smart features', image: 'tv.jpg' },
        { name: 'Laptop - HP Pavilion', category: 'electronics', price: 55999, description: 'Powerful laptop with i5 processor', image: 'laptop.jpg' },
        { name: 'Wireless Earbuds', category: 'electronics', price: 4999, description: 'Noise-canceling TWS earbuds', image: 'earbuds.jpg' },
        { name: 'Tablet - iPad Air', category: 'electronics', price: 45999, description: 'Sleek and powerful tablet for creatives', image: 'ipad.jpg' },

        // Beauty
        { name: 'Face Wash', category: 'beauty', price: 299, description: 'Daily face wash with natural ingredients', image: 'facewash.jpg' },
        { name: 'Lipstick Set', category: 'beauty', price: 899, description: 'Matte finish lipsticks in 5 shades', image: 'lipsticks.jpg' },
        { name: 'Sunscreen SPF 50', category: 'beauty', price: 499, description: 'Broad spectrum sun protection', image: 'sunscreen.jpg' },
        { name: 'Makeup Kit', category: 'beauty', price: 2499, description: 'Complete professional makeup set', image: 'makeup.jpg' },
        { name: 'Perfume - Floral Mist', category: 'beauty', price: 1199, description: 'Long lasting fragrance for women', image: 'perfume.jpg' },

        // Grocery
        { name: 'Basmati Rice 5kg', category: 'grocery', price: 599, description: 'Premium long grain rice', image: 'rice.jpg' },
        { name: 'Organic Wheat Flour', category: 'grocery', price: 349, description: 'Stone-ground whole wheat atta', image: 'wheat.jpg' },
        { name: 'Cooking Oil 1L', category: 'grocery', price: 179, description: 'Refined sunflower oil for healthy cooking', image: 'oil.jpg' },
        { name: 'Spices Combo Pack', category: 'grocery', price: 499, description: 'Essential Indian spices in one pack', image: 'spices.jpg' },
        { name: 'Tea Powder 500g', category: 'grocery', price: 249, description: 'Strong and aromatic tea blend', image: 'tea.jpg' },

        // Furniture
        { name: 'Wooden Coffee Table', category: 'furniture', price: 4999, description: 'Compact and stylish center table', image: 'coffee_table.jpg' },
        { name: 'Queen Bed Frame', category: 'furniture', price: 11999, description: 'Solid wood frame with headboard', image: 'bed.jpg' },
        { name: 'Office Chair', category: 'furniture', price: 3999, description: 'Ergonomic design with lumbar support', image: 'chair.jpg' },
        { name: 'Bookshelf - 5 Tier', category: 'furniture', price: 3499, description: 'Compact storage for books and décor', image: 'bookshelf.jpg' },
        { name: 'Dining Table Set', category: 'furniture', price: 15999, description: '4-seater dining table with chairs', image: 'dining.jpg' },

        // Toys
        { name: 'Remote Car', category: 'toys', price: 1499, description: 'Fast and durable remote control car', image: 'remote_car.jpg' },
        { name: 'Building Blocks', category: 'toys', price: 699, description: '100-piece colorful block set', image: 'blocks.jpg' },
        { name: 'Doll House', category: 'toys', price: 1999, description: 'Miniature house with accessories', image: 'dollhouse.jpg' },
        { name: 'Puzzle Game', category: 'toys', price: 299, description: 'Brain development puzzle for kids', image: 'puzzle.jpg' },
        { name: 'Action Figure - Superhero', category: 'toys', price: 899, description: 'Articulated collectible figure', image: 'superhero.jpg' },


        // Books
        { name: 'Atomic Habits', category: 'books', price: 449, description: 'Bestseller by James Clear', image: 'atomic.jpg' },
        { name: 'The Alchemist', category: 'books', price: 299, description: 'Inspirational story by Paulo Coelho', image: 'alchemist.jpg' },
        { name: 'Harry Potter Box Set', category: 'books', price: 2999, description: 'All 7 books by J.K. Rowling', image: 'harrypotter.jpg' },
        { name: 'Rich Dad Poor Dad', category: 'books', price: 399, description: 'Financial advice by Robert Kiyosaki', image: 'richdad.jpg' },
        { name: 'Wings of Fire', category: 'books', price: 199, description: 'Autobiography of Dr. A.P.J. Abdul Kalam', image: 'wings.jpg' },

        // Pharmacy
        { name: 'Paracetamol Tablets', category: 'pharmacy', price: 25, description: 'Pain and fever reducer', image: 'paracetamol.jpg' },
        { name: 'Vitamin C Capsules', category: 'pharmacy', price: 199, description: 'Boosts immunity', image: 'vitaminc.jpg' },
        { name: 'Hand Sanitizer 500ml', category: 'pharmacy', price: 149, description: 'Kills 99.9% germs', image: 'sanitizer.jpg' },
        { name: 'Digital Thermometer', category: 'pharmacy', price: 299, description: 'Fast and accurate temperature check', image: 'thermometer.jpg' },
        { name: 'First Aid Kit', category: 'pharmacy', price: 499, description: 'Essential emergency items', image: 'firstaid.jpg' }
    ]
}

const productCarouselSlice = createSlice({
    name: 'ProductData',
    initialState,
    reducers: {
        setProductData: ((state, action) => {
            state.ProductData = action.payload || []
        }),
    }
})

export const { setProductData } = productCarouselSlice.actions;
export default productCarouselSlice.reducer;