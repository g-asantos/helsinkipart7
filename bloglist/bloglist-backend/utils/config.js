

let mongoUrl = 'mongodb+srv://fullstack:1111@cluster0-tqvpe.mongodb.net/THEBLOGLIST?retryWrites=true&w=majority'
const PORT = 3001
if (process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test' ) {
    mongoUrl = 'mongodb+srv://fullstack:1111@cluster0-tqvpe.mongodb.net/phonebook-test?retryWrites=true&w=majority'
}





module.exports = {
    mongoUrl,
    PORT
}