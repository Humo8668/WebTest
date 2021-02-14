
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

    value_input.attr("type", field_type);
});

$("input[type='radio'][name='content-type']").change(function (e) {
    console.log(e.target);
})