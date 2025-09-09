import { createSlice } from "@reduxjs/toolkit";

const sampleProducts = [
  // Appliances
  { id: 'a6F1', name: 'Air Conditioner', category: 'appliances', price: 32999, description: '1.5 Ton Split AC with inverter technology', image: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9_P_tLEbLCf_8K3ydleaUeIlCOHP3MNcxNQ&s', 'https://m.media-amazon.com/images/I/51O6l8nGwUL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/610WrHvLSBL._UF350,350_QL80_.jpg'] },
  { id: 'b7K2', name: 'Washing Machine', category: 'appliances', price: 18999, description: 'Front load washing machine with smart inverter', image: ['https://livpure.com/cdn/shop/articles/family-spending-time-together-outside_23-2148659464_e0d1fe68-5a26-488e-a17e-c1486f0d3d89-131818.jpg?v=1726725415', 'https://falconaircondition.com/wp-content/uploads/2022/10/split-1-scaled.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnUlPk6KQfRarjedFP265Eep3NmrwXVvG9qQ&s'] },
  { id: 'c8L3', name: 'Refrigerator', category: 'appliances', price: 22999, description: 'Double door fridge with frost free technology', image: ['https://whirlpoolindia.vtexassets.com/arquivos/ids/165797-800-auto?v=638705348977430000&width=800&height=auto&aspect=true', 'https://kaydeeelectronics.in/cdn/shop/files/untitled-design-59-66e410cc229bf.webp?v=1726222584&width=1946', 'https://mahajanelectronics.com/cdn/shop/files/in-t-style-french-door-beverage-center-rf65dg90bdsgtl-540400876.jpg?v=1755399985&width=600'] },
  { id: 'd9M4', name: 'Microwave Oven', category: 'appliances', price: 8999, description: 'Convection microwave for fast cooking', image: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpfkeY50FjzJ04DATYd5zKguHc2NEF2oXvPQ&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAFQHN8DisNPiK8n24DqbhTYZX_qbIttG-Tg&s'] },
  { id: 'e10N5', name: 'Dishwasher', category: 'appliances', price: 27999, description: '12 place setting dishwasher', image: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOE9-EhHFaNWsBGnrQ5P5EIMfIxqizppVf5w&s', 'https://www.jiomart.com/images/product/original/493620517/lg-dfb532fp-dishwasher-with-truesteam-quadwash-inverter-direct-drive-technology-silver-digital-o493620517-p596244663-2-202212092334.jpeg?im=Resize=(420,420)'] },

  // Mobiles
  { id: 'f11P6', name: 'iPhone 15', category: 'mobiles', price: 79999, description: 'Latest Apple iPhone with A17 Bionic chip', image: ['https://inspireonline.in/cdn/shop/files/iPhone_15_Pink_PDP_Image_Position-1__en-IN.jpg?v=1694605206&width=1920', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvDeVGDlEYZw2e5AMLK2tUv-U7vTAuNd_PTg&s', 'https://www.imagineonline.store/cdn/shop/files/iPhone_15_Pro_Black_Titanium_PDP_Image_Position-1__en-IN_955a5f8b-9006-4919-92f4-ddfa2ebec8f6.jpg?v=1694757755&width=1445'] },
  { id: 'g12Q7', name: 'Samsung Galaxy S24', category: 'mobiles', price: 74999, description: 'Flagship Android phone from Samsung', image: ['https://mahajanelectronics.com/cdn/shop/files/71IfBk7ET0L._SL1500.jpg?v=1715586557', 'https://sathya.in/media/93967/catalog/Cobalt%20Violet-1.jpg', 'https://i.ytimg.com/vi/GHZwRPskGc4/sddefault.jpg'] },
  { id: 'h13R8', name: 'OnePlus 12', category: 'mobiles', price: 62999, description: 'Smooth performance with Snapdragon processor', image: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpMN3MX6uiQZz6TV45P1NZq6EbHk93vj9W4Q&s', 'https://image01-in.oneplus.net/media/202407/04/9052428d8c69bd8bb884c7913af5fa73.png', 'https://image01-in.oneplus.net/media/202407/04/98b2530ed05768de317409f6a1e66d58.png'] },
  { id: 'i14S9', name: 'Realme Narzo', category: 'mobiles', price: 13999, description: 'Budget-friendly smartphone with great battery life', image: ['https://m.media-amazon.com/images/I/71DSxfKzkJL._UF1000,1000_QL80_.jpg', 'https://eshopy.in/wp-content/uploads/2023/12/c-600x600.jpg', 'https://m.media-amazon.com/images/I/71dEY4Neo3L._UF1000,1000_QL80_.jpg'] },
  { id: 'j15T0', name: 'Xiaomi Redmi Note 13', category: 'mobiles', price: 15999, description: 'Value for money mid-range phone', image: ['https://m.media-amazon.com/images/I/71VW8LmqqPL._UF894,1000_QL80_.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP6zyW62Wd87q6EWhmmCLeRdTvGYNchT-XNr8_OgYuvAZ2L_3-gcDEDI4KjJQCoXZd2J8&usqp=CAU', 'https://images-cdn.ubuy.co.in/66bf8dcf6b507b324111340e-xiaomi-redmi-note-13-pro-5g-smartphone.jpg'] },

  // Toys
  { id: 'k36U1', name: 'Remote Car', category: 'toys', price: 1499, description: 'Fast and durable remote control car', image: ['https://kipagaming.com/cdn/shop/files/1_669b5d0e-3836-4b4d-a1bb-75c3604effa9.jpg?v=1746599986', 'https://images.meesho.com/images/products/456902277/qjbhq_512.webp?width=512', 'https://m.media-amazon.com/images/I/71EJvtPBoxL._UF1000,1000_QL80_.jpg'] },
  { id: 'l37V2', name: 'Building Blocks', category: 'toys', price: 699, description: '100-piece colorful block set', image: ['https://images-cdn.ubuy.co.in/633bee3b8665b9448e2da68b-maple-wood-kids-building-blocks-by-hape.jpg', 'https://www.jaqueslondon.co.uk/cdn/shop/products/SmallBuildingBlocks-MathsCubesForKids-90248_grande.jpg?v=1715695923', 'https://m.media-amazon.com/images/I/81LGp8Fgz6S.jpg'] },
  { id: 'm38W3', name: 'Doll House', category: 'toys', price: 1999, description: 'Miniature house with accessories', image: ['https://toyzone.in/cdn/shop/files/44161_1_2048x.jpg?v=1739001352', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS37JlY4wZPFpTf472etyCpge6h6DnO5tzYZg&s'] },
  { id: 'n39X4', name: 'Puzzle Game', category: 'toys', price: 299, description: 'Brain development puzzle for kids', image: ['https://m.media-amazon.com/images/I/71oLIqj59GL._UF1000,1000_QL80_.jpg', 'https://craftdeals.in/wp-content/uploads/2023/08/Square-cube-n-xoxo.jpg'] },
  { id: 'o40Y5', name: 'Action Figure - Superhero', category: 'toys', price: 899, description: 'Articulated collectible figure', image: ['https://m.media-amazon.com/images/I/61YWZBsxBVL.jpg', 'https://www.superherotoystore.com/cdn/shop/files/1_71199de8-fcd3-48e5-8923-6be38ff33637_1600x.jpg?v=1729064878', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpokjUS-oON4wpnRY-ABtArz7bhvBWDAZ_fmQG1NQX_1YzHcbiOw8LrrFcf4RBERBUjVI&usqp=CAU'] },

  // Fashion
  { id: 'p1A6', name: 'Men’s T-Shirt', category: 'fashion', price: 599, description: 'Cotton crew neck t-shirt', image: ['https://images-cdn.ubuy.co.in/67ebedb90916a7b6620d5584-billionhats-12-pack-plus-size-mens.jpg', 'https://www.beyoung.in/api/cache/catalog/products/pick_any_3_2_new_polo/pick_any_3_polo_t-shirt_combo_base_23_10_2024_400x533.jpg'] },
  { id: 'q2B7', name: 'Women’s Kurti', category: 'fashion', price: 999, description: 'Printed kurti for casual wear', image: ['https://craftzone.in/backend/uploads/products/SKU0000003960/0a85f490bdba24d1804822e1c374064f.webp', 'https://www.urbanwardrobe.in/cdn/shop/products/s-210803.jpeg?v=1557631813&width=1445', 'https://m.media-amazon.com/images/I/71dVeb701cL._UY1100_.jpg'] },
  { id: 'r3C8', name: 'Sneakers - Unisex', category: 'fashion', price: 1999, description: 'Trendy sneakers with soft soles', image: ['https://m.media-amazon.com/images/I/51sX5zbiQ8L.jpg', 'https://www.converse.in/media/catalog/product/1/u/1u647c_d_107x163.jpg'] },
  { id: 's4D9', name: 'Backpack - Casual', category: 'fashion', price: 899, description: 'Multi-compartment backpack', image: ['https://skybags.co.in/cdn/shop/files/1_c268b906-f107-45c6-85ef-f045bd30521a_1800x1800.png?v=1753356867', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRID0GaznUJM3HCrjeQFNW9n5AdUvaXmBD-1g&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwLHUzFpKl_hk5og5UeEU_qo8z4-idctikeg&s'] },
  { id: 't5E0', name: 'Sunglasses - Aviator', category: 'fashion', price: 1299, description: 'UV protected metal frame sunglasses', image: ['https://india.ray-ban.com/media/catalog/product/cache/9198bde1d0eff71feec5e39d680e88c5/0/r/0rb3025_919648_030a_new_1.png', 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/blue-gradient-gunmetal-full-rim-aviator-vincent-chase-polarized-metal-classics-vc-s17403-c2-sunglasses_p_dsc4774.jpg'] },

  // Books
  { id: 'u41F1', name: 'Atomic Habits', category: 'books', price: 449, description: 'Bestseller by James Clear', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80' },
  { id: 'v42G2', name: 'The Alchemist', category: 'books', price: 299, description: 'Inspirational story by Paulo Coelho', image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80' },
  { id: 'w43H3', name: 'Harry Potter Box Set', category: 'books', price: 2999, description: 'All 7 books by J.K. Rowling', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdfX66EMTE4g-LqnFAE6Xeg6eMegRfzmuFVg&s' },
  { id: 'x44I4', name: 'Rich Dad Poor Dad', category: 'books', price: 399, description: 'Financial advice by Robert Kiyosaki', image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=600&q=80' },
  { id: 'y45J5', name: 'Wings of Fire', category: 'books', price: 199, description: 'Autobiography of Dr. A.P.J. Abdul Kalam', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80' },

  // Pharmacy
  { id: 'z46K6', name: 'Paracetamol Tablets', category: 'pharmacy', price: 25, description: 'Pain and fever reducer', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNEAQA8ws9_de41fCd3iTOa82dOMIDMxO1Bg&s' },
  { id: 'a47L7', name: 'Vitamin C Capsules', category: 'pharmacy', price: 199, description: 'Boosts immunity', image: 'https://www.thehimalayanorganics.in/cdn/shop/files/FrontJPG_6b4f0045-0287-488a-adfe-4471cd543c88.jpg?v=1740989467' },
  { id: 'b48M8', name: 'Hand Sanitizer 500ml', category: 'pharmacy', price: 149, description: 'Kills 99.9% germs', image: 'https://rukminim2.flixcart.com/image/704/844/kfoapow0/hand-wash-sanitizer/m/g/p/1-500ml-hand-sanitizer-gel-with-flipflop-cap-and-500ml-hand-original-imafw2bbg845ura6.jpeg?q=90&crop=false' },
  { id: 'c49N9', name: 'Digital Thermometer', category: 'pharmacy', price: 299, description: 'Fast and accurate temperature check', image: 'https://glenindia.com/cdn/shop/products/InfraredThermometerSA-6041_700x700.jpg?v=1631782207' },
  { id: 'd50O0', name: 'First Aid Kit', category: 'pharmacy', price: 499, description: 'Essential emergency items', image: ['https://m.media-amazon.com/images/I/91H34vDc1fL._UF1000,1000_QL80_.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwbBaHHNeTvhCNEUS0CTpixhLZfRFy5aPmjw&s'] }
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
