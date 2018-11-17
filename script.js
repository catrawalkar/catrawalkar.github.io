$(document).ready(function () {
    $("body").click(function () {
        var randClassName = [
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
        var randomNumber = Math.floor(Math.random() * randClassName.length);
        $("main").removeClass();
        $("main").addClass(randClassName[randomNumber]);
    });
});