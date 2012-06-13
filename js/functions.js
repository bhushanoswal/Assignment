$(document).ready(function(){

			          	
$('#name').bind('focusout keyup',function(event) {
	var mG=$(this).val();
	if(mG=="")
	novalfld(0,"This field is required");
	else
	valfld(0);	
});

$('#email').bind('focusout keyup',function(event) {
	
	var mG=$(this).val();
	var mID=$(this).attr('id');
	var datastr= 'chkemail='+mID+'&email='+mG;
	var pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);
	if(mG=="")
	{
	novalfld(1,"This field is required");
	}
	else
	{
		if(!pattern.test(mG))
		novalfld(1,"This email is not valid");
		else
		valfld(1);
	}
});

$('#age').bind('focusout keyup',function(event) {
    var mG=$(this).val();
     if(mG=="")
	novalfld(2,"This field is required");
	else
	valfld(2);
});

$('#gender').bind('focusout change keyup',function(event) {
	var mG=$(this).val();
	if(mG=="default")
	novalfld(3,"Select the gender");
	else
	valfld(3);
});

$('#address').bind('focusout change keyup',function(event) {
	var mG=$(this).val();
     if(mG=="")
	novalfld(4,"This field is required");
	else
	valfld(4);
});

$('#description').bind('focusout change keyup',function(event) {
	var mG=$(this).val();
     if(mG=="")
	novalfld(5,"This field is required");
	else
	valfld(5);
});

$('#pincode').bind('focusout change keyup',function(event) {
	var mG=$(this).val();
     if(mG=="")
	novalfld(6,"This field is required");
	else
	   if(mG.length!=6)
	   novalfld(6,"Invalid Pincode");
	   else
	   valfld(6);
});

$('#age').keydown(function(event) {
       intOnly(event);
    });

$('#pincode').keydown(function(event) {
       intOnly(event);
    });
    
$('#signup').click(function(){
	var flg=0;
	$('#sign-up-frm div.cf').each(function(index){
		$('#sign-up-frm div.cf:eq('+index+') > input, #sign-up-frm div.cf:eq('+index+') select').keyup().focusout();
		mG=$('#sign-up-frm div.cf:eq('+index+') > div.field_confirm').hasClass('invalid');
		if(mG)
		flg=1;
	});
	if(flg==0)
	{
	$('.loader').css('display','block'); 
	$('#sign-up-frm').bind('submit',function(event){
	   var data1={
        "utf8": "✓",
        "authenticity_token": "TWq5wTGiDBnUuWj3t6Qte9EhTJOWpHViSJYZTLVtsL4=",
        "user": {
            "name": $('#name').val(),
            "email": $('#email').val(),
            "age": $('#age').val(),
            "gender": $('#gender').val(),
            "address": $('#address').val(),
            "description": $('#description').val(),
            "pincode": $('#pincode').val()
        },
        "commit": "Create User"
    }   
    
                               $.ajax({   
                                type: "POST",
                                async: true,
                                cache: true, 
                                data: data1,
                                dataType:'json',
                                url: "http://blooming-beach-2334.herokuapp.com/users",   
                                complete: function(status) {
                                    alert(JSON.stringify(status));
                                 }
                                    });
                        
						event.preventDefault();
		});
		$('#sign-up-frm').trigger('submit');
	}
	
});

$('#getreq').click(function(){
	
	$.ajax({   
                                type: "GET",
                                async:true,
                                dataType:'json',
                                contentType: 'application/json; charset=utf-8',
                                url: "users.json",
                                 error: function(data,data1){
                                 	console.log(JSON.stringify(data));
                                 },
                                 success: function(data){
                                 	console.log(data);
                                 	var usrdata="<tr><td>Name</td><td>Email</td><td>Age</td><td>Gender</td><td>Address</td><td>Description</td><td>Pincode</td></tr>";
                                 	$('#box-container').html('<table id="datafill" width="100%"></table>');
                                 	for(var i=0;i<data.length;i++)
                                 	{
                                 		usrdata+='<tr><td>'+data[i]['name']+'</td><td>'+data[i]['email']+'</td><td>'+data[i]['age']+'</td><td>'+data[i]['gender']+'</td><td>'+data[i]['address']+'</td><td>'+data[i]['description']+'</td><td>'+data[i]['pincode']+'</td></tr>'
                                 		}
                                 		$('#datafill').html(usrdata);
                                 	}
                                
        });
		
	});

});

function novalfld(index,txt){
	$('#sign-up-frm div.cf:eq('+index+') > div:not(#picker):not(#pwd_strength):eq(0)').css('display','block');
	$('#sign-up-frm div.cf:eq('+index+') > div:not(#picker):not(#pwd_strength):eq(0)').html(txt);
	$('#sign-up-frm div.cf:eq('+index+') > div.field_confirm').addClass('invalid').removeClass('valid');
	$('#sign-up-frm div.cf:eq('+index+') > input, #sign-up-frm div.cf:eq('+index+') select').addClass('error');
}
function valfld(index){
	$('#sign-up-frm div.cf:eq('+index+') > div:not(#picker):not(#pwd_strength):eq(0)').css('display','none');
	$('#sign-up-frm div.cf:eq('+index+') > div:not(#picker):not(#pwd_strength):eq(0)').html("");
	$('#sign-up-frm div.cf:eq('+index+') > div.field_confirm').addClass('valid').removeClass('invalid');
	$('#sign-up-frm div.cf:eq('+index+') > input, #sign-up-frm div.cf:eq('+index+') select').removeClass('error');
}
function nullfld(index){
	$('#sign-up-frm div.cf:eq('+index+') > div:not(#picker):not(#pwd_strength):eq(0)').css('display','none');
	$('#sign-up-frm div.cf:eq('+index+') > div:not(#picker):not(#pwd_strength):eq(0)').html("");
	$('#sign-up-frm div.cf:eq('+index+') > div.field_confirm').removeClass('invalid valid');
	$('#sign-up-frm div.cf:eq('+index+') > input, #sign-up-frm div.cf:eq('+index+') select').removeClass('error');
}

function intOnly(event)
{
     if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || (event.keyCode == 65 && event.ctrlKey === true) || (event.keyCode >= 35 && event.keyCode <= 39)) {
                 return;
        }
        else {
            if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                event.preventDefault(); 
            }   
        }
}


