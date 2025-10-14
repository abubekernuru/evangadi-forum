function getAllQuestions(req, res){
    res.send("Get all questions")
}

function getSingleQuestion(req, res){
    res.send("Get specific question")
}

function postQuestion(req, res){
    res.send("Post question")
}

module.exports = { getAllQuestions, getSingleQuestion, postQuestion }