let { posts } = require("../data")
let { users } = require("../data")

let postId = 4;

const getPosts = () => {
    return posts;
}

const getPostById = (id) => {
    const result = posts.find(p => p.id === Number(id))
    if(!result) throw Error(`No existe post con el ${id}`)
    return result;
}

const createPost = (title, contents, userId) => {
    if(!title || !contents || !userId) throw Error("Missing data")
    const userIdValidate = users.find(u => u.id === Number(userId))
    if(!userIdValidate) throw Error(`User ID ${userId} does not exist`)

    const newPost = {
        id: postId++,
        title,
        contents,
        userId
    }

    posts.push(newPost)
    return newPost;
}

const updatePost = (id, title, contents) => {
    if(!title || !contents || !id) throw Error("Missing data")
    const post = getPostById(id);

    post.title = title;
    post.contents = contents;

    return post;
}

const deletePost = (id) => {
    const post = getPostById(id);

    posts = posts.filter(p => p.id !== Number(id))

    return post;
}

module.exports = {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
}
