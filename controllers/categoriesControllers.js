import connection from '../config/database.js';
import validateId from '../middlewares/validateId.js';

// Get/categories restituisce tutte le categorie(in ordine alfabetico)
async function indexCategories(request, response) {
    try {

        const [categories] = await connection.execute(`
            SELECT
                id,
                name,
                description
            FROM categories
            ORDER BY name ASC
            `);

        response.status(200).json({
            success: true,
            message: categories
        });
    } catch (error) {

        console.log(error);

        response.status(500).json({
            success: false,
            message: 'internal Server Error'
        });
    };
}

// Get/categories/:id/products restituisce tutti i prodotti di una categoria specifica
async function indexCategoriesProducts(request, response) {
    try {

        const categoryId = request.validateId

        //Verifica esistenza categorie
        const [category] = await connection.execute(`
             SELECT
                id,
                name
            FROM categories
            WHERE id = ?`,
            [categoryId]);

        if (category.length === 0) {
            return response.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        // Recupero prodotti associati alla categoria
        const [products] = await connection.execute(
            `
            SELECT
                p.id,
                p.name,
                p.description,
                p.price,
                p.image,
                p.place_of_origin,
                p.is_available
            FROM products p

            JOIN product_category pc
                ON p.id = pc.product_id

            WHERE pc.category_id = ?
            `,
            [categoryId]
        );

        response.status(200).json({
            success: true,
            category: category[0],
            data: products
        });

    } catch (error) {

        console.error(error);

        response.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });

    };
}

//Show:
async function showCategory(request, response) {
    try {
        const categoryId = request.validateId
        const query = `SELECT * FROM categories WHERE id=?;`

        const [results] = await connection.execute(query, [categoryId]);
        if (results.length === 0) {
            return response
                .status(404)
                .json({ message: "Category not Found." });
        }
        return response
            .status(200)
            .json({ results });
    }
    catch (error) {
        console.error("Error requesting category:", error);
        return response
            .status(500).json({ error: "Internal Error." });
    }
}

export { indexCategories, indexCategoriesProducts, showCategory };