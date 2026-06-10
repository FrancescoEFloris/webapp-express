//Index:

//Show:

//Create:

// Update:
async function updateReview(request, response) {
    try {
        const { id } = request.params; 
        const { name, title, review_content, rating, product_id } = request.body;

        const query = `
            UPDATE reviews 
            SET name = ?, title = ?, review_content = ?, rating = ?, product_id = ?
            WHERE id = ?;
        `;
        const [result] = await connection.execute(query, [
            name, 
            title, 
            review_content, 
            rating, 
            product_id, 
            id
        ]);
        //notfound
        if (result.affectedRows === 0) {
            return response
                .status(404)
                .json({ message: "Review not Found." });
        }
        //ok
        return response.status(200).json({
            message: "Your review was updated!",
            id: id
        });

    } catch (error) {
        console.error("Error updating review:", error);
        return response
            .status(500).json({ error: "Internal Error." });
    }
}

//Delete:

export {
    updateReview
};