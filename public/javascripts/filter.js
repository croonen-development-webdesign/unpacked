function filter(query, itemSelector, fieldSelector) {
    query = query && query.toLowerCase();
    $(itemSelector).each(function() {
        const $item = $(this);
        const titleElement =  $item.find(fieldSelector);
        const title = titleElement.text().toLowerCase();
        $item.toggle(!query || title.indexOf(query) !== -1);
    })
}

function textContainsValue($item, fieldSelector, searchValue) {
    const fieldElement =  $item.find(fieldSelector);
    const fieldValue = fieldElement.text().toLowerCase();
    return fieldValue.indexOf(searchValue) !== -1;
}

function filter2(items, params) {
    for (const key in params) {
        const param = params[key];
        param.inputValue = $(param.inputSelector).val().toLowerCase();
    }
    items.each(function() {
        const $item = $(this);
        let match = true;
        for (const key in params) {
            const param = params[key];
            if (param.inputValue && !textContainsValue($item, param.fieldSelector, param.inputValue)) {
                match = false;
                break;
            }
        }
        $item.toggle(match);
    })
}

function onFilter(inputSelector, clearButtonSelector, cb) {
    const $filterInput = $(inputSelector);
    const $clearButton = $(clearButtonSelector);
    $clearButton.hide();
    $filterInput.on('keyup', (function() {
        if ($filterInput.val().length > 0) {
            cb($filterInput.val());
            $clearButton.show();
        } else {
            cb(null);
            $clearButton.hide();
        }
    }))
    $clearButton.on('click', (function() {
        $filterInput.val('');
        $clearButton.hide();
        cb('');
        $filterInput.focus();
    }))
}

function onFilterKeyup2(inputSelector, cb) {
    const $filterInput = $(inputSelector);
    $filterInput.on('keyup', (function() {
        if ($filterInput.val().length > 0) {
            cb($filterInput.val());
        } else {
            cb(null);
        }
    }))
}

function onFilterCrossClick(inputSelector, cb) {
    const $filterInput = $(inputSelector);
    $filterInput.on('input', (function(e) {
        cb();
    }))
}

function filterItemsOnInput(inputSelector, clearButtonSelector,
                            itemSelector, fieldSelector) {
    onFilter(inputSelector, clearButtonSelector,
        s => filter(s, itemSelector, fieldSelector));
}

function filterItemsOnInputMulti(inputSelector, params) {
    onFilterKeyup2(inputSelector, () => filter2($('.item'), params))
    onFilterCrossClick(inputSelector, () => filter2($('.item'), params))
}
