const randClassName = [
    'gray-white',
    'green-white',
    'indigo-white',
    'red-white',
    'white-blue',
    'white-gray',
    'white-indigo',
    'yellow-black',
    'black-yellow',
    'orange-black',
    'black-orange'
];
$(document).ready(function () {
    var randomNumber = Math.floor(Math.random() * randClassName.length);
    $("main").addClass(randClassName[randomNumber]);
    $("body").click(function () {
        $("main").removeClass();
        var randomNumber = Math.floor(Math.random() * randClassName.length);
        $("main").addClass(randClassName[randomNumber]);
    });
});