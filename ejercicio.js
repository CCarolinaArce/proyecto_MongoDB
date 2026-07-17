db.productos.agregate([
    { $match: { code: 'P01'}},
       { $lookup: {
            from: 'categories',
            localField: 'categoryID',
            foreignField: '_id',
            as: 'category'
        }},
        { $unwind: '$category'}
])