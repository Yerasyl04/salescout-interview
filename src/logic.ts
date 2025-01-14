// Implement a function which takes an array of Product and returns unique products sorted by price

type Product = {
    name: string;
    price: number;
};
 
function filterAndSortProducts(products: Product[]): Product[] {
    return Array.from(
        products.reduce((map, p) => map.set(p.name, map.get(p.name)?.price > p.price ? p : map.get(p.name) || p), new Map())
        .values()
    ).sort((a, b) => a.price - b.price);
}

module.exports = { filterAndSortProducts }
