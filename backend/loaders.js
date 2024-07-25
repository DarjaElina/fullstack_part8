const DataLoader = require('dataloader')
const Book = require('./models/book')

const bookCountLoader = new DataLoader(async (authorIds) => {

  const counts = await Book.aggregate([
    { $match: { author: { $in: authorIds } } },
    { $group: { _id: "$author", count: { $sum: 1 } } }
  ]);

  const countsByAuthorId = {}
  counts.forEach(({ _id, count }) => {
    countsByAuthorId[_id.toString()] = count
  })

  return authorIds.map(authorId => countsByAuthorId[authorId] || 0)
});

module.exports = bookCountLoader

