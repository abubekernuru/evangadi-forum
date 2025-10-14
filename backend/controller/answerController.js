function getAnswers(req, res){
    res.send("get answers")
}

function postAnswer(req, res){
    res.send("post answers")
}

module.exports = { getAnswers, postAnswer }