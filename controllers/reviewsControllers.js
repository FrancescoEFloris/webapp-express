




// Get/reviews restituisce tutte le recensioni con i relativi prodotti
async function indexReviews(request, response) {
    try {

        const [reviews] = await connection.query(`
            SELECT
                r.id,
                r.name,
                r.title,
                r.review_content,
                r.date,
                r.rating,
                p.id AS product_id,
                p.name AS product_name
            FROM reviews r

            JOIN products p
                ON r.product_id = p.id

            ORDER BY r.date DESC
        `);

        response.status(200).json({
            success: true,
            data: reviews
        });

    } catch (error) {
        console.error(error);

        response.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}

// Get/reviews/:id restituisce le recensioni del relativo prodotto
async function IndexReviewsProduct(request, response) {
    try {

        const { id } = request.params;
        const realId = Number(id);

        if (isNaN(realId)) {
            return response.status(400).json({
                success: false,
                message: 'Invalid product id'
            });
        }

        //Verifica esistenza prodotto
        const [product] = await connection.query(
            `
            SELECT
                id,
                name
            FROM products
            WHERE id = ?
            `,
            [realId]
        );

        if (product.length === 0) {
            return response.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Recupero recensioni associate al prodotto
        const [reviews] = await connection.query(
            `
            SELECT
                id,
                name,
                title,
                review_content,
                date,
                rating
            FROM reviews
            WHERE product_id = ?
            ORDER BY date DESC
            `,
            [realId]
        );

        response.status(200).json({
            success: true,
            product: product[0],
            data: reviews
        });

    } catch (error) {

        console.error(error);

        response.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}

export { indexReviews, IndexReviewsProduct };