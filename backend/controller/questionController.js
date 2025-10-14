function getQuestions(req, res){
    res.send("Get all questions")
}

function getQuestion(req, res){
    res.send("Get specific question")
}

function postQuestion(req, res){
    res.send("Post question")
}

module.exports = { getQuestions, getQuestion, postQuestion }