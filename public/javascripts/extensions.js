function onReveal() {
    const endpointReveal = '/api/reveal/';
    const links = $('.jq-to-ide');
    links.on('click', function() {
        const link = $(this);
        $('.selected').removeClass('selected');
        $.get(endpointReveal + link.data('id'), function() {
            link.addClass('selected');
        });
    });
}

function onToIde() {
    const endpointIde = '/api/ide/?path=';
    const links = $('.jq-to-ide2');
    links.on('click', function() {
        const link = $(this);
        $('.selected').removeClass('selected');
        $.get(endpointIde + link.data('path'), function() {
            link.addClass('selected');
        });
    });
}

$(function() {
    onReveal();
    onToIde();
    filterItemsOnInput('.jq-filter-extensions input', '.jq-filter-extensions .clear',
        '.item', '.name')
});
