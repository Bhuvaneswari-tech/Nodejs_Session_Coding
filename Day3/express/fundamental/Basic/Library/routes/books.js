/*
Library System (Route Parameters + Query Filters)
Scenario
A library allows users to:
Fetch book by ID
Filter books using query strings: /books?author=John&year=2021
Nested route: /books/:id/reviews

*/
const express = require('express')
const router = express.Router()

let books = [
    {id:1, title:'Node Masters',author:'John', year:"2021"},
    {id:2, title:'Express Deep Drive',author:'Mary', year:"2023"},
    {id:3, title:'MongoDB DI',author:'Ellis', year:"2021"}
]

//List books with filters
router.get('/',(req,res)=>{
    const { author, year } = req.query

    let result = books
    if(author) result = result.filter(b => b.author === author)
    if(year) result = result.filter(b => b.year === year)

    res.json(result)
})

//Route parameter
router.get('/:id',(req,res)=>{
    const book = books.find(b => b.id === req.params.id)
    if(!book) return res.status(404).json({error: "Book not found"})
    res.json(book)
})

//Nested route: /books/:id/reviews
router.get("/:id/reviews",(req,res)=>{
    res.json({
        bookId: req.params.id,
        reviews: ["Good","Excellent","Must read"]
    })
})

module.exports = router