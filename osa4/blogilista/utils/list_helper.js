const dummy = (blogs) => {
    return(1)
  }

const totalLikes = (blogs) => {

    const sumOfLikes = blogs.reduce(
        function(sum, blog){
            return sum + blog.likes
        },0)

    return(sumOfLikes)
}

const mostLikes = (blogs) => {

    const mostLikes = blogs.reduce(
        (prev, current) => {
            return prev.likes > current.likes ? prev : current
        }
    )

    const { __v, _id, url, ...mostLiked} = mostLikes

    return mostLiked
}
  
module.exports = {
    dummy,
    totalLikes,
    mostLikes
}