/**
 * Restaurant Service - Data Access Layer
 * 
 * Provides async functions to fetch restaurant and menu data.
 * Currently uses mock data internally, designed to be swapped with Supabase calls.
 */

import { Restaurant, MenuItem, SIMULATED_NETWORK_DELAY_MS } from '@/shared/types';
import { mockRestaurants } from '../mock-data';
import { lunchRestaurants } from '../lunch-menu-data';
import { bakeryRestaurants } from '../bakery-data';
import { iceMagicRestaurants } from '../ice-magic-data';

/**
 * Simulates network delay for realistic async behavior
 */
const simulateDelay = () =>
    new Promise((resolve) => setTimeout(resolve, SIMULATED_NETWORK_DELAY_MS));

/**
 * Normalize mock restaurant data to match shared Restaurant type
 */
function normalizeRestaurant(restaurant: any): Restaurant {
    const now = new Date().toISOString();
    return {
        ...restaurant,
        isOpen: true, // Default to open
        createdAt: now,
        updatedAt: now,
        items: restaurant.items || [], // Ensure items array exists
    };
}

/**
 * Get all available restaurants across all categories
 */
export async function getRestaurants(): Promise<Restaurant[]> {
    await simulateDelay();

    // Combine all restaurant sources
    const allRestaurants = [
        ...mockRestaurants,
        ...lunchRestaurants,
        ...bakeryRestaurants,
        ...iceMagicRestaurants,
    ];

    return allRestaurants.map(normalizeRestaurant);
}

/**
 * Get nearby restaurants from specific categories only (breakfast, lunch, bakery, ice-cream)
 * Removes duplicates based on restaurant name
 */
export async function getNearbyRestaurants(): Promise<Restaurant[]> {
    await simulateDelay();

    // Get restaurants from specific categories
    const breakfastRestaurants = mockRestaurants.filter((r) =>
        ['udupi', 'shree', 'shree-tiffanys', 'shree-kanteshwara'].includes(r.id)
    );

    const categoryRestaurants = [
        ...breakfastRestaurants,
        ...lunchRestaurants,
        ...bakeryRestaurants,
        ...iceMagicRestaurants,
    ];

    // Remove duplicates based on restaurant name (case-insensitive)
    const uniqueRestaurants = categoryRestaurants.reduce((acc, current) => {
        const isDuplicate = acc.some(
            (restaurant) => restaurant.name.toLowerCase() === current.name.toLowerCase()
        );
        if (!isDuplicate) {
            acc.push(current);
        }
        return acc;
    }, [] as any[]);

    return uniqueRestaurants.map(normalizeRestaurant);
}

/**
 * Get a single restaurant by ID
 */
export async function getRestaurantById(id: string): Promise<Restaurant | null> {
    await simulateDelay();

    const allRestaurants = await getRestaurants();
    const restaurant = allRestaurants.find((r) => r.id === id);

    return restaurant || null;
}

/**
 * Get restaurants filtered by category
 */
export async function getRestaurantsByCategory(category: string): Promise<Restaurant[]> {
    await simulateDelay();

    // Map category to restaurant source
    const categoryMap: Record<string, any[]> = {
        breakfast: mockRestaurants.filter((r) =>
            ['udupi', 'shree', 'shree-tiffanys', 'shree-kanteshwara'].includes(r.id)
        ),
        lunch: lunchRestaurants,
        bakery: bakeryRestaurants,
        'ice-cream': iceMagicRestaurants,
    };

    const restaurants = categoryMap[category.toLowerCase()] || [];
    return restaurants.map(normalizeRestaurant);
}

/**
 * Get a specific menu item by IDs
 */
export async function getMenuItemById(
    restaurantId: string,
    itemId: string
): Promise<MenuItem | null> {
    await simulateDelay();

    const restaurant = await getRestaurantById(restaurantId);
    if (!restaurant || !restaurant.items) return null;

    const item = restaurant.items.find((i) => i.id === itemId);
    return item || null;
}

/**
 * Search restaurants by name or description
 */
export async function searchRestaurants(query: string): Promise<Restaurant[]> {
    await simulateDelay();

    const allRestaurants = await getRestaurants();
    const lowerQuery = query.toLowerCase();

    return allRestaurants.filter(
        (r) =>
            r.name.toLowerCase().includes(lowerQuery) ||
            r.description.toLowerCase().includes(lowerQuery)
    );
}

/**
 * Get menu items for a restaurant filtered by category
 */
export async function getMenuItemsByCategory(
    restaurantId: string,
    category: string
): Promise<MenuItem[]> {
    await simulateDelay();

    const restaurant = await getRestaurantById(restaurantId);
    if (!restaurant || !restaurant.items) return [];

    return restaurant.items.filter((item) => item.category === category);
}
