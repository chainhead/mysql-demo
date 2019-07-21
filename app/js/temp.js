function add(a,b,callback) {
    return callback(a + b)
}
function display() {
    add(2,3, function(sum) {console.log(sum)})
}
display()