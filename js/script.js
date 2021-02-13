
$(document).on('click', '.btn-add', function(e)
{
    e.preventDefault();

    var controlForm = $('#params-tab:first'),
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
