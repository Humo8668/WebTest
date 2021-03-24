
function hideDOM(DOM)
{
    if(DOM == null || DOM.length == 0)
        return;
    
    if(typeof DOM == "string")
    {
        var node = document.getElementById(DOM);
        if(node == null)
            return;

        node.style.display = 'none';
    }
    else if(typeof DOM == 'object')
    {
        if(DOM.nodeType == null || DOM.nodeType != 1) // DOM.nodeType != ELEMENT_NODE
        return;

        DOM.style.display = 'none';    
    } 
    return;
}

function showDOM(DOM)
{
    if(DOM == null || DOM.length == 0)
        return;
    
    if(typeof DOM == "string")
    {
        var node = document.getElementById(DOM);
        if(node == null)
            return;

        node.style.display = 'block';
    }
    else if(typeof DOM == 'object')
    {
        if(DOM.nodeType == null || DOM.nodeType != 1) // DOM.nodeType != ELEMENT_NODE
        return;

        DOM.style.display = 'block';    
    } 
    return;
}








$(document).on('click', '.btn-add', function(e)
{
    e.preventDefault();

    var controlForm = $(e.target).parents('.key_value_block'),
        currentEntry = $(this).parents('.entry:first'),
        newEntry = $(currentEntry.clone()).appendTo(controlForm);

    newEntry.find('input').val('');
    controlForm.find('.entry:not(:last) .btn-add')
        .removeClass('btn-add').addClass('btn-remove')
        .removeClass('btn-success').addClass('btn-danger')
        .html('-');
}).on('click', '.btn-remove', function(e)
{
	$(this).parents('.entry:first').remove();

	e.preventDefault();
	return false;
});


$(".field_type").change(function () {
    var field_type = $(this).val();
    var value_input = $(this).siblings("input[name='body_form-data_value']");
    if(value_input.length == 0)
        return;

    value_input.val(null);
    value_input.attr("type", field_type);
});

$("input[type='radio'][name='content-type']").change(function (e) {
    var blockToShow = $('#' + e.target.value)[0];
    var blocks = $("#body_type_blocks")[0].children;
    
    if(blocks != null && blocks.length != 0)
        for(var i = 0; i < blocks.length; i++) 
            hideDOM(blocks[i]);

    if(blockToShow != null)  
        showDOM(blockToShow);
})