
exports.sortTags = function(tags, postTags){
    postTags.forEach(function(tag){
        if(tags.indexOf(tag) < 0){
            tags.push(tag)
        }
    })
}

