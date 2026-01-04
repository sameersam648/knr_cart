import { Restaurant } from "./mock-data";

export const iceMagicRestaurants: Restaurant[] = [
    {
        id: "ice-magic",
        name: "Ice Magic",
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop",
        rating: 4.7,
        description: "Premium ice creams, shakes & snacks",
        deliveryTime: "15-20 min",
        items: [
            // FALOODA
            { id: "im-1", name: "Falooda Queen", price: 150, description: "ಫಾಲೂಡಾ ಕ್ವೀನ್", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop", category: "FALOODA" },
            { id: "im-2", name: "Royal Falooda", price: 130, description: "ರಾಯಲ್ ಫಾಲೂಡಾ", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop", category: "FALOODA" },
            { id: "im-3", name: "Mango Light", price: 130, description: "ಮಾವಿನ ಲೈಟ್", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop", category: "FALOODA" },
            { id: "im-4", name: "Kesar Knights", price: 130, description: "ಕೇಸರ್ ನೈಟ್ಸ್", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop", category: "FALOODA" },
            { id: "im-5", name: "Badam Corniche", price: 130, description: "ಬಾದಾಮ್ ಕಾರ್ನಿಶ್", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop", category: "FALOODA" },
            { id: "im-6", name: "IM Special Falooda", price: 160, description: "ಐಎಂ ಸ್ಪೆಷಲ್ ಫಾಲೂಡಾ", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop", category: "FALOODA" },

            // ROYAL SUNDAES
            { id: "im-7", name: "Titanic Sundae", price: 140, description: "ಟೈಟಾನಿಕ್ ಸಂಡೇ", image: "https://images.unsplash.com/photo-1558500524-5fa7a1a7428f?w=400&h=300&fit=crop", category: "ROYAL SUNDAES" },
            { id: "im-8", name: "Triangle Love", price: 150, description: "ಟ್ರೈಯಾಂಗಲ್ ಲವ್", image: "https://images.unsplash.com/photo-1558500524-5fa7a1a7428f?w=400&h=300&fit=crop", category: "ROYAL SUNDAES" },
            { id: "im-9", name: "Caribbean Snow Ball", price: 150, description: "ಕ್ಯಾರಿಬಿಯನ್ ಸ್ನೋ ಬಾಲ್", image: "https://images.unsplash.com/photo-1558500524-5fa7a1a7428f?w=400&h=300&fit=crop", category: "ROYAL SUNDAES" },
            { id: "im-10", name: "Island Fish", price: 150, description: "ಐಲ್ಯಾಂಡ್ ಫಿಶ್", image: "https://images.unsplash.com/photo-1558500524-5fa7a1a7428f?w=400&h=300&fit=crop", category: "ROYAL SUNDAES" },
            { id: "im-11", name: "Apple Split", price: 150, description: "ಆಪಲ್ ಸ್ಪ್ಲಿಟ್", image: "https://images.unsplash.com/photo-1558500524-5fa7a1a7428f?w=400&h=300&fit=crop", category: "ROYAL SUNDAES" },
            { id: "im-12", name: "Banana Split", price: 150, description: "ಬಾಳೆಹಣ್ಣು ಸ್ಪ್ಲಿಟ್", image: "https://images.unsplash.com/photo-1560787313-5dff3307e257?w=400&h=300&fit=crop", category: "ROYAL SUNDAES" },
            { id: "im-13", name: "Cashew Delight", price: 160, description: "ಗೋಡಂಬಿ ಡಿಲೈಟ್", image: "https://images.unsplash.com/photo-1558500524-5fa7a1a7428f?w=400&h=300&fit=crop", category: "ROYAL SUNDAES" },
            { id: "im-14", name: "The Great Pyramid", price: 160, description: "ಗ್ರೇಟ್ ಪಿರಮಿಡ್", image: "https://images.unsplash.com/photo-1558500524-5fa7a1a7428f?w=400&h=300&fit=crop", category: "ROYAL SUNDAES" },

            // KIDS ZONE
            { id: "im-15", name: "Disney Land", price: 130, description: "ಡಿಸ್ನಿ ಲ್ಯಾಂಡ್", image: "https://images.unsplash.com/photo-1505394033641-40c6ad1178d1?w=400&h=300&fit=crop", category: "KIDS ZONE" },
            { id: "im-16", name: "Snow White", price: 130, description: "ಸ್ನೋ ವೈಟ್", image: "https://images.unsplash.com/photo-1505394033641-40c6ad1178d1?w=400&h=300&fit=crop", category: "KIDS ZONE" },
            { id: "im-17", name: "Tom & Jerry", price: 130, description: "ಟಾಮ್ & ಜೆರ್ರಿ", image: "https://images.unsplash.com/photo-1505394033641-40c6ad1178d1?w=400&h=300&fit=crop", category: "KIDS ZONE" },

            // IM SPECIAL ICE CREAM
            { id: "im-18", name: "Train Cassata", price: 200, description: "ಟ್ರೈನ್ ಕಸಾಟಾ", image: "https://images.unsplash.com/photo-1579954115563-e72bf1381629?w=400&h=300&fit=crop", category: "SPECIAL ICE CREAM" },
            { id: "im-19", name: "Premium Falooda", price: 200, description: "ಪ್ರೀಮಿಯಂ ಫಾಲೂಡಾ", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop", category: "SPECIAL ICE CREAM" },
            { id: "im-20", name: "Death by Chocolate", price: 150, description: "ಡೆತ್ ಬೈ ಚಾಕೊಲೇಟ್", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop", category: "SPECIAL ICE CREAM" },
            { id: "im-21", name: "Hot Brownie with Ice Cream", price: 130, description: "ಹಾಟ್ ಬ್ರೌನಿ ಐಸ್ ಕ್ರೀಮ್ ಜೊತೆ", image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop", category: "SPECIAL ICE CREAM" },

            // PASTRY
            { id: "im-22", name: "Hot Choco Lava", price: 60, description: "ಹಾಟ್ ಚಾಕೋ ಲಾವಾ", image: "https://images.unsplash.com/photo-1617305855058-29e843825832?w=400&h=300&fit=crop", category: "PASTRY" },
            { id: "im-23", name: "Caramel Dry Fruit", price: 80, description: "ಕ್ಯಾರಮೆಲ್ ಡ್ರೈ ಫ್ರೂಟ್", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop", category: "PASTRY" },
            { id: "im-24", name: "Black Forest", price: 75, description: "ಬ್ಲ್ಯಾಕ್ ಫಾರೆಸ್ಟ್", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop", category: "PASTRY" },
            { id: "im-25", name: "Pineapple", price: 65, description: "ಪೈನಾಪಲ್", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop", category: "PASTRY" },
            { id: "im-26", name: "Rasmalai", price: 80, description: "ರಸ್ಮಲೈ", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop", category: "PASTRY" },

            // ICE CREAM SPECIALS
            { id: "im-27", name: "Honeymoon Dreams", price: 110, description: "ಹನಿಮೂನ್ ಡ್ರೀಮ್ಸ್", image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400&h=300&fit=crop", category: "ICE CREAM SPECIALS" },
            { id: "im-28", name: "Teenage Craze", price: 120, description: "ಟೀನೇಜ್ ಕ್ರೇಜ್", image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400&h=300&fit=crop", category: "ICE CREAM SPECIALS" },
            { id: "im-29", name: "Ocean Deep", price: 120, description: "ಓಷನ್ ಡೀಪ್", image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400&h=300&fit=crop", category: "ICE CREAM SPECIALS" },
            { id: "im-30", name: "Pistachio", price: 120, description: "ಪಿಸ್ತಾ", image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400&h=300&fit=crop", category: "ICE CREAM SPECIALS" },
            { id: "im-31", name: "Honey Nuts", price: 120, description: "ಹನಿ ನಟ್ಸ್", image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400&h=300&fit=crop", category: "ICE CREAM SPECIALS" },
            { id: "im-32", name: "Touch Me Not", price: 120, description: "ಟಚ್ ಮೀ ನಾಟ್", image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400&h=300&fit=crop", category: "ICE CREAM SPECIALS" },
            { id: "im-33", name: "Mimosa Floats", price: 120, description: "ಮಿಮೋಸಾ ಫ್ಲೋಟ್ಸ್", image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400&h=300&fit=crop", category: "ICE CREAM SPECIALS" },
            { id: "im-34", name: "Punch Bowl", price: 120, description: "ಪಂಚ್ ಬೌಲ್", image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400&h=300&fit=crop", category: "ICE CREAM SPECIALS" },
            { id: "im-35", name: "Candy Crush", price: 120, description: "ಕ್ಯಾನ್ಡಿ ಕ್ರಶ್", image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400&h=300&fit=crop", category: "ICE CREAM SPECIALS" },
            { id: "im-36", name: "Berry Blast", price: 120, description: "ಬೆರಿ ಬ್ಲಾಸ್ಟ್", image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400&h=300&fit=crop", category: "ICE CREAM SPECIALS" },
            { id: "im-37", name: "Temptation", price: 130, description: "ಟೆಂಪ್ಟೇಷನ್", image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400&h=300&fit=crop", category: "ICE CREAM SPECIALS" },

            // GUDBUD & CUSTARD
            { id: "im-38", name: "Exotic Fruits Salad", price: 80, description: "ಎಕ್ಸೋಟಿಕ್ ಫ್ರೂಟ್ಸ್ ಸಲಾಡ್", image: "https://images.unsplash.com/photo-1519996529931-28324d1a2923?w=400&h=300&fit=crop", category: "GUDBUD & CUSTARD" },
            { id: "im-39", name: "Mix Beauty", price: 120, description: "ಮಿಕ್ಸ್ ಬ್ಯೂಟಿ", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop", category: "GUDBUD & CUSTARD" },
            { id: "im-40", name: "Pink Berry Gudbud", price: 110, description: "ಪಿಂಕ್ ಬೆರಿ ಗುಡ್‌ಬಡ್", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop", category: "GUDBUD & CUSTARD" },
            { id: "im-41", name: "Dry Fruits Custard", price: 100, description: "ಡ್ರೈ ಫ್ರೂಟ್ಸ್ ಕಸ್ಟರ್ಡ್", image: "https://images.unsplash.com/photo-1519996529931-28324d1a2923?w=400&h=300&fit=crop", category: "GUDBUD & CUSTARD" },
            { id: "im-42", name: "Toffe Sneak", price: 140, description: "ಟಾಫಿ ಸ್ನೀಕ್", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop", category: "GUDBUD & CUSTARD" },

            // CHOCOLATE SUNDAES
            { id: "im-43", name: "Chocolate Fudge", price: 120, description: "ಚಾಕೊಲೇಟ್ ಫಡ್ಜ್", image: "https://images.unsplash.com/photo-1579954115563-e72bf1381629?w=400&h=300&fit=crop", category: "CHOCOLATE SUNDAES" },
            { id: "im-44", name: "Chocolate Darling", price: 130, description: "ಚಾಕೊಲೇಟ್ ಡಾರ್ಲಿಂಗ್", image: "https://images.unsplash.com/photo-1579954115563-e72bf1381629?w=400&h=300&fit=crop", category: "CHOCOLATE SUNDAES" },
            { id: "im-45", name: "Oreo Delight", price: 130, description: "ಓರಿಯೋ ಡಿಲೈಟ್", image: "https://images.unsplash.com/photo-1579954115563-e72bf1381629?w=400&h=300&fit=crop", category: "CHOCOLATE SUNDAES" },
            { id: "im-46", name: "Kit Kat Kiss", price: 130, description: "ಕಿಟ್‌ಕ್ಯಾಟ್ ಕಿಸ್", image: "https://images.unsplash.com/photo-1579954115563-e72bf1381629?w=400&h=300&fit=crop", category: "CHOCOLATE SUNDAES" },
            { id: "im-47", name: "Hot Chocolate Fudge", price: 140, description: "ಹಾಟ್ ಚಾಕೊಲೇಟ್ ಫಡ್ಜ್", image: "https://images.unsplash.com/photo-1579954115563-e72bf1381629?w=400&h=300&fit=crop", category: "CHOCOLATE SUNDAES" },
            { id: "im-48", name: "Choco Mellow", price: 140, description: "ಚೊಕೊ ಮೆಲ್ಲೋ", image: "https://images.unsplash.com/photo-1579954115563-e72bf1381629?w=400&h=300&fit=crop", category: "CHOCOLATE SUNDAES" },
            { id: "im-49", name: "Chocolate Fantasy", price: 150, description: "ಚಾಕೊಲೇಟ್ ಫ್ಯಾಂಟಸಿ", image: "https://images.unsplash.com/photo-1579954115563-e72bf1381629?w=400&h=300&fit=crop", category: "CHOCOLATE SUNDAES" },
            { id: "im-50", name: "Choco Spider", price: 150, description: "ಚೊಕೊ ಸ್ಪೈಡರ್", image: "https://images.unsplash.com/photo-1579954115563-e72bf1381629?w=400&h=300&fit=crop", category: "CHOCOLATE SUNDAES" },
            { id: "im-51", name: "Hot Chocolate Fantasy", price: 160, description: "ಹಾಟ್ ಚಾಕೊಲೇಟ್ ಫ್ಯಾಂಟಸಿ", image: "https://images.unsplash.com/photo-1579954115563-e72bf1381629?w=400&h=300&fit=crop", category: "CHOCOLATE SUNDAES" },
            { id: "im-52", name: "Choco Heaven", price: 160, description: "ಚೊಕೊ ಹೆವೆನ್", image: "https://images.unsplash.com/photo-1579954115563-e72bf1381629?w=400&h=300&fit=crop", category: "CHOCOLATE SUNDAES" },
            { id: "im-53", name: "Choco Toast", price: 160, description: "ಚೊಕೊ ಟೋಸ್ಟ್", image: "https://images.unsplash.com/photo-1579954115563-e72bf1381629?w=400&h=300&fit=crop", category: "CHOCOLATE SUNDAES" },

            // ICE CREAM SHAKES
            { id: "im-54", name: "Vanilla Shake", price: 80, description: "ವ್ಯಾನಿಲ್ಲಾ", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop", category: "ICE CREAM SHAKES" },
            { id: "im-55", name: "Strawberry Shake", price: 80, description: "ಸ್ಟ್ರಾಬೆರಿ", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop", category: "ICE CREAM SHAKES" },
            { id: "im-56", name: "Pista Shake", price: 90, description: "ಪಿಸ್ತಾ", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop", category: "ICE CREAM SHAKES" },
            { id: "im-57", name: "Mango Shake", price: 90, description: "ಮಾವು", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop", category: "ICE CREAM SHAKES" },
            { id: "im-58", name: "Chocolate Shake", price: 90, description: "ಚಾಕೊಲೇಟ್", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop", category: "ICE CREAM SHAKES" },

            // STARTERS
            { id: "im-70", name: "French Fries", price: 70, description: "ಫ್ರೆಂಚ್ ಫ್ರೈಸ್", image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400&h=300&fit=crop", category: "STARTERS" },
            { id: "im-71", name: "Peri Peri French Fries", price: 80, description: "ಪೇರಿ ಪೇರಿ ಫ್ರೈಸ್", image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=400&h=300&fit=crop", category: "STARTERS" },
            { id: "im-72", name: "Nuggets", price: 70, description: "ನಗೇಟ್ಸ್", image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop", category: "STARTERS" },

            // VEG MOMOS
            { id: "im-78", name: "Steam Momos", price: 100, description: "ಸ್ಟೀಮ್ ಮೊಮೋಸ್", image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&h=300&fit=crop", category: "VEG MOMOS" },
            { id: "im-79", name: "Fried Momos", price: 100, description: "ಫ್ರೈಡ್ ಮೊಮೋಸ್", image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&h=300&fit=crop", category: "VEG MOMOS" },

            // SANDWICH
            { id: "im-80", name: "Classic Sandwich", price: 70, description: "ಕ್ಲಾಸಿಕ್ ಸ್ಯಾಂಡ್ವಿಚ್", image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop", category: "SANDWICH" },
            { id: "im-81", name: "Cheesy Sandwich", price: 80, description: "ಚೀಸಿ ಸ್ಯಾಂಡ್ವಿಚ್", image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop", category: "SANDWICH" },

            // BURGER
            { id: "im-85", name: "Classic Burger", price: 70, description: "ಕ್ಲಾಸಿಕ್ ಬರ್ಗರ್", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop", category: "BURGER" },
            { id: "im-86", name: "Cheesy Burger", price: 80, description: "ಚೀಸಿ ಬರ್ಗರ್", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop", category: "BURGER" },
            { id: "im-87", name: "Paneer Crunchy Burger", price: 100, description: "ಪನೀರ್ ಕ್ರಂಚಿ", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop", category: "BURGER" },

            // PIZZA
            { id: "im-90", name: "Classic Hot Pizza (Small)", price: 130, description: "ಕ್ಲಾಸಿಕ್ ಹಾಟ್ ಪಿಜ್ಜಾ (Small)", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop", category: "PIZZA" },
            { id: "im-91", name: "Classic Hot Pizza (Medium)", price: 160, description: "ಕ್ಲಾಸಿಕ್ ಹಾಟ್ ಪಿಜ್ಜಾ (Medium)", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop", category: "PIZZA" },

            // PASTA
            { id: "im-100", name: "Tomato Chilly Pasta", price: 90, description: "ಟೊಮಾಟೋ ಚಿಲ್ಲಿ ಪಾಸ್ತಾ", image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop", category: "PASTA" },

            // SHAWARMA
            { id: "im-105", name: "Classic Shawarma", price: 70, description: "ಕ್ಲಾಸಿಕ್ ಶವಾರ್ಮಾ", image: "https://images.unsplash.com/photo-1667041797686-218eb8da7715?w=400&h=300&fit=crop", category: "SHAWARMA" },

            // CHINESE
            { id: "im-110", name: "Gobi Manchurian", price: 70, description: "ಗೋಬಿ ಮಂಚೂರಿಯನ್", image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&h=300&fit=crop", category: "CHINESE" },

            // NOODLES
            { id: "im-115", name: "Classic Noodles", price: 90, description: "ಕ್ಲಾಸಿಕ್ ನೂಡಲ್ಸ್", image: "https://images.unsplash.com/photo-1600289031464-74d374b649d2?w=400&h=300&fit=crop", category: "NOODLES" },

            // FRIED RICE
            { id: "im-120", name: "Classic Fried Rice", price: 110, description: "ಕ್ಲಾಸಿಕ್ ಫ್ರೈಡ್ ರೈಸ್", image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop", category: "FRIED RICE" }
        ]
    },
    {
        id: "ice-magic-beverages",
        name: "Ice Magic",
        image: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&h=300&fit=crop",
        rating: 4.7,
        description: "Fresh juices, shakes & beverages",
        deliveryTime: "15-20 min",
        items: [
            // FRESH JUICE
            { id: "imb-1", name: "Mosambi Juice", price: 40, description: "ಮೋಸಂಬಿ", image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400&h=300&fit=crop", category: "FRESH JUICE" },
            { id: "imb-2", name: "Orange Juice", price: 50, description: "ಆರೆಂಜ್", image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400&h=300&fit=crop", category: "FRESH JUICE" },
            { id: "imb-3", name: "Water Melon Juice", price: 50, description: "ಕಲ್ಲಂಗಡಿ", image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400&h=300&fit=crop", category: "FRESH JUICE" },
            { id: "imb-4", name: "Mixed Fruits Juice", price: 50, description: "ಮಿಕ್ಸ್ ಫ್ರೂಟ್ಸ್", image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400&h=300&fit=crop", category: "FRESH JUICE" },
            { id: "imb-5", name: "Ginger Lemon Juice", price: 40, description: "ಶುಂಠಿ ನಿಂಬೆ", image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400&h=300&fit=crop", category: "FRESH JUICE" },

            // SMOOTHIES
            { id: "imb-6", name: "Morning Magic", price: 90, description: "ಮಾರ್ನಿಂಗ್ ಮ್ಯಾಜಿಕ್", image: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&h=300&fit=crop", category: "SMOOTHIES" },
            { id: "imb-7", name: "Very Berry", price: 90, description: "ವೆರಿ ಬೆರಿ", image: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&h=300&fit=crop", category: "SMOOTHIES" },

            // SPECIAL LASSI
            { id: "imb-8", name: "Strawberry Lassi", price: 60, description: "ಸ್ಟ್ರಾಬೆರಿ ಲಸ್ಸಿ", image: "https://images.unsplash.com/photo-1598418659104-589f81da83e6?w=400&h=300&fit=crop", category: "SPECIAL LASSI" },
            { id: "imb-9", name: "Mango Lassi", price: 70, description: "ಮಾವು ಲಸ್ಸಿ", image: "https://images.unsplash.com/photo-1598418659104-589f81da83e6?w=400&h=300&fit=crop", category: "SPECIAL LASSI" },

            // SPECIAL SODA
            { id: "imb-10", name: "Sweet Lemon Soda", price: 30, description: "ಸ್ವೀಟ್ ಲೆಮನ್ ಸೋಡಾ", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&h=300&fit=crop", category: "SPECIAL SODA" },
            { id: "imb-11", name: "Blue Lemon Soda", price: 50, description: "ಬ್ಲೂ ಲೆಮನ್ ಸೋಡಾ", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&h=300&fit=crop", category: "SPECIAL SODA" },

            // MOJITO
            { id: "imb-12", name: "Water Melon Mojito", price: 80, description: "ಕಲ್ಲಂಗಡಿ ಮೊಜಿಟೋ", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&h=300&fit=crop", category: "MOJITO" },
            { id: "imb-13", name: "Blue Berry Mojito", price: 80, description: "ಬ್ಲೂ ಬೆರಿ", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&h=300&fit=crop", category: "MOJITO" }
        ]
    }
];
