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
  
module.exports = {
    dummy,
    totalLikes
}