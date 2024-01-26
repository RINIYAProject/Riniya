if (($('body.front').length))
{
    $('.ui.menu.navbar').clone().insertBefore('.pusher').addClass('inverted vertical masthead sidebar')
    $(document).ready(function () {
        $('.dropdown').dropdown({on: 'hover'})
        $('.ui.checkbox').checkbox()
    })
}
