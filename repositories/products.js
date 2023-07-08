import Repository from './repository.js';

class ProductsRepository extends Repository {}

export default new ProductsRepository('products.json');
