const METHOD_GET = "GET";
const METHOD_POST = "POST";
const METHOD_PUT = "PUT";
const METHOD_DELETE = "DELETE";



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

function showBodyBlock(blockToShow)
{
    var blocks = $("#body_type_blocks")[0].children;

    if(blocks != null && blocks.length != 0)
        for(var i = 0; i < blocks.length; i++)
            hideDOM(blocks[i]);

    if(blockToShow != null)
        showDOM(blockToShow);
}

function getHeaderAsObject()
{
    var headers = {};
    headers["Access-Control-Allow-Origin"] = "https://reqbin.com";
    $("#headers-tab>div").each(function(i, elem){
        var key = $(":input[name='headers_key']", elem).val();
        var value = $(":input[name='headers_value']", elem).val();
        if (key.length == 0)
            return; // continue;
            //return false; // break;
        headers[key] = value;
    });
    return headers;
}

function getParamsAsObject()
{
    var params = {};
    $("#params-tab>div").each(function(i, elem){
        var key = $(":input[name='params_key']", elem).val();
        var value = $(":input[name='params_value']", elem).val();
        if (key.length == 0)
            return; // continue;
            //return false; // break;
        params[key] = value;
    });
    return params;
}

function getReqBody()
{
    var bodyBlockName = $("#body-tab input[name='content-type']:checked")[0].value;
    var bodyBlock = $("#" + bodyBlockName)[0];

    if (bodyBlockName.length == 0 || bodyBlock == null || typeof bodyBlock === 'undefined')
        return {};
    
    switch(bodyBlockName)
    {
        case "body_none_block":
            return {};
        case "body_raw_block":
            return ($(".value_field", bodyBlock)[0].value + "");
        case "body_binary_block":
            {
                throw "Binary file posting not working. Please, try some other option.";
                return;

                /*var val_field = $("input.value_field" ,elem)[0];
                if(typeof val_field !== 'undefined')
                    return {};
                var value = null;
                if (val_field.type.toLowerCase() == "file")
                    value = val_field.files[0];
                else
                    value = val_field.value;
                
                return value;*/
            }
        case "body_form-data_block":
            {
                var fd = new FormData();
                $("div", bodyBlock).each(function(i, elem) {
                    var key = $("input.key_field" ,elem)[0].value;
                    var val_field = $("input.value_field" ,elem)[0];
                    var value = null;
                    if (val_field.type.toLowerCase() == "file")
                        value = val_field.files[0];
                    else
                        value = val_field.value;

                    if(typeof key !== 'undefined' && key.length > 0)
                        fd.append(key, value);
                });
                return fd;
            }
        case "body_x-www-form-urlen_block":
            {
                var data = {};
                $("div", bodyBlock).each(function(i, elem) {
                    var key = $("input.key_field" ,elem)[0].value;
                    var value = $("input.value_field" ,elem)[0].value;
                    
                    if(typeof key !== 'undefined' && key.length > 0)
                        data[key] = value;
                });
                return data;
            }

    }
}


function beforeSend(jqXHR, settings)
{
    console.log("Requesting...");
}

function onSuccess(data, textStatus, jqXHR)
{
    console.log("Success. Response: " + data);
}

function onError(jqXHR, textStatus, errorThrown) 
{
    console.log("Error. " + errorThrown);
}

function onComplete(jqXHR, textStatus)
{
    console.log("Completed.");
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

    showBodyBlock(blockToShow);
});

$("#send_request").click(function () {
    var url = $("#URL").val();
    var contentType = $('input[name=content-type]:checked').val();
    var method = $("#method").val();
    var ajax_obj = {};


    //alert(url + " " + contentType + " " + method);
    if (url == null || url == undefined || url.length == 0)
        return;

    if (contentType == "body_none" || contentType.length == 0)
        contentType = false;

    ajax_obj['url'] = url;
    ajax_obj['method'] = method;
    ajax_obj['headers'] = getHeaderAsObject();
    if(method == METHOD_GET)
    {
        ajax_obj['data'] = getParamsAsObject();
    }
    else
    {
        ajax_obj['contentType'] = contentType;
        ajax_obj['data'] = getReqBody();
    }
    console.log(ajax_obj);

    ajax_obj['beforeSend'] = beforeSend;
    ajax_obj['success'] = onSuccess;
    ajax_obj['error'] = onError;
    ajax_obj['complete'] = onComplete;


    $.ajax(ajax_obj);

    /*if(method == METHOD_GET)
    {
        $.ajax({
            url: url,
            method: method,
            data: getParamsAsObject(),
            contentType: contentType,

        });
    }
    else
    {
        $.ajax({
            url: url,
            method: method,
            headers: getHeaderAsObject(),
            contentType: contentType,

        });
    }*/


});