var _ = require('lodash');

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item
    }

    if (blogs === undefined) {
        return 0
    } else {
        let likes = blogs.map(x => x.likes)

        return likes.reduce(reducer, 0)
    }


}

const favoriteBlog = (blogs) => {
   

    if (blogs === undefined) {
        return 0
    } else {
        let likes = blogs.map(x => x.likes)

        let mostLikes = Math.max(...likes)
        
        return blogs[likes.indexOf(mostLikes)]
    }

}

const mostBlogs = (blogs) => {
   

    if (blogs === undefined) {
        return 0
    } else {
        let authors = blogs.map(x => x.author)

        let countAuthors = _.countBy(authors)
        
        let topAuthor = {
            author: `${Object.keys(countAuthors)[0]}`,
            blogs: Number(`${Object.values(countAuthors)[0]}`)
        }
        
    
        return topAuthor
    }

}

const mostLikes = (blogs) => {
   

    if (blogs === undefined) {
        return 0
    } else {
        let formattedLikes = blogs.map(x => x = { author: x.author, likes: x.likes})
       

        const result = formattedLikes.reduce((sum, item) => {
            let current = item.author

            let found = sum.find(element => element.author === current)
            if(found) found.likes += item.likes
            else sum.push(item)
            return sum
        }, [])

        result.sort((a,b) => {
            return b.likes - a.likes
        })
        return result[0]
    }

}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}