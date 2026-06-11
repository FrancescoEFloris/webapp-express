const validateId = (request, response, next) => {

    const { id } = request.params;

    if (!id) {
        return response.status(400).json({
            error: "ID mancante nella richiesta"
        });
    }

    const numId = Number(id.trim());

    if (isNaN(numId)) {
        return response.status(400).json({
            error: "Valore dell'id non conforme o inesistente"
        });
    }

    if (!Number.isInteger(numId)) {
        return response.status(400).json({
            error: "L'ID deve essere un numero intero"
        });
    }

    if (numId <= 0) {
        return response.status(400).json({
            error: "Non esistono elementi con id minori o uguali a zero nel sistema"
        });
    }

    request.validateId = numId;

    next();
};

export default validateId;