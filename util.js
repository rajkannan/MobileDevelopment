/**
 * @author rkannan-cc
 */
function toggleBox(a) {
	
	if ($(a).is(':checked'))
	{
		$("#add_rating").show();
	}
	else
	{
		$("#add_rating").hide();
	}
}

function toggleBoxE(a) {
	
	if ($(a).is(':checked'))
	{
		$("#edit_rating").show();
	}
	else
	{
		$("#edit_rating").hide();
	}
}


function handleAddForm() 
{
	$('#rkaddForm').validate( 
		{
			rules: {
				business_name: {
					required:true,
					rangelength:[2,30]
				},
				reviewer_email:{
					required:true,
					email:true
				},
				reviewer_comments:{
				required:true,
					rangelength:[4,100]
				},
				review_date: {
					date:true,
					required:true
				},
				food_quality:{
					rangelength:[0,5]
				},
				service:{
					
					rangelength:[0,5]
				},
				valueRating:{
					
					rangelength:[0,5]
				}
			}, // end of rules
			
			messages: {
				business_name: {
					required: "<span style='color:red'>Please enter the business name.</span>",
					rangelength: "<span style='color:red'>Your name must be between 2 and 30 characters long.</span>"
				},
				reviewer_email:{
					required:"<span style='color:red'>Please enter reviewer email.</span>",
					email:"<span style='color:red'>Please enter valid email.</span>"
				},
				reviewer_comments:{
					required:"<span style='color:red'>Please enter comments.</span>",
					rangelength:"<span style='color:red'>Your comments must be between 4 and 100 characters long.</span>"
				},
				review_date:{
					required:"<span style='color:red'>Please enter a date in the format YYYY-MM-DD.</span>"
				},
				food_quality:{
					required:"<span style='color:red'>Please enter value between 0 to 5.</span>"
				},
				service:{
					rangelength:"<span style='color:red'>Please enter value between 0 to 5</span>"
				},
				valueRating:{
					rangelength:"<span style='color:red'>Please enter value between 0 to 5</span>"
				}
			} // end of messages					
		}  // end of argument array	
	); // end of validate

	// call add() if valid
	if ($('#rkaddForm').valid()) {
	
		//alert("Entry form is valid");
		var business_name = $('#business_name').val();  			   
		var reviewer_email = $('#reviewer_email').val();  	
		var reveiwerComments=$("#reviewer_comments").val();			
		var review_date = $('#review_date').val();  	
		var food_quality;
		var service;
		var RatingValue;
		var addRating;		
		var typename=$("#type_name").val();
		if ($('#rating').prop('checked')) {
			food_quality=$("#food_quality").val();
			service=$("#service").val();
			RatingValue=$("#RatingValue").val();
			addRating='Y';
		}
		else
		{
			addRating='N';
			food_quality=0;
			service=0;
			RatingValue=0;
		}
		
		add_rkreview(business_name,typename, reviewer_email,reveiwerComments,review_date, addRating,food_quality,service,RatingValue);
						
	} // end if	
} // end function
	
function overallRatingCalculator(){
	var foodquality=$("#food_quality").val();
	var service=$("#service").val();
	var RatingValue=$("#RatingValue").val();
	foodquality=parseInt(foodquality);
	service=parseInt(service);
	RatingValue=parseInt(RatingValue);
	var overallRating=((foodquality + +service + +RatingValue)/15)*100;
  	$("#overallRating").val(overallRating.toFixed(0));
}	
function editoverallRatingCalculator(){
	var editfood_quality=$("#editfood_quality").val();
	var editservice=$("#editservice").val();
	var editRatingValue=$("#editRatingValue").val();
	editfood_quality=parseInt(editfood_quality);
	editservice=parseInt(editservice);
	editRatingValue=parseInt(editRatingValue);
	var editoverallRating=((editfood_quality + +editservice + +editRatingValue)/15)*100;
  	$("#editedoverallRating").val(editoverallRating.toFixed(0));
}	

function updateRecord(){
	
	$('#rkeditForm').validate( 
		{
			rules:{
				editbusiness:{
					required:true,
					rangelength:[2,30]
				},
				editemail:{
					required:true,
					email:true
				},
				editcomments:{
				required:true,
					rangelength:[4,100]
				},
				editreviewdate:{
					date:true,
					required:true
				},
				editfood_quality:{
					rangelength:[0,5]
				},
				editservice:{
					
					rangelength:[0,5]
				},
				editRatingValue:{
					
					rangelength:[0,5]
				}
			}, // end of rules
			
			messages:{
				editbusiness:{
					required:"<span style='color:red'>Please enter the business name.</span>",
					rangelength:"<span style='color:red'>Your name must be between 2 and 30 characters long.</span>"
				},
				editemail:{
					required:"<span style='color:red'>Please enter reviewer email.</span>",
					email:"<span style='color:red'>Please enter valid email.</span>"
				},
				editcomments:{
					required:"<span style='color:red'>Please enter comments.</span>",
					rangelength:"<span style='color:red'>Your comments must be between 4 and 100 characters long.</span>"
				},
				editreviewdate:{
					required:"<span style='color:red'>Please enter a date in the format YYYY-MM-DD.</span>"
				},
				editfood_quality:{
					required:"<span style='color:red'>Please enter value between 0 to 5.</span>"
				},
				editservice:{
					rangelength:"<span style='color:red'>Please enter value between 0 to 5</span>"
				},
				editRatingValue:{
					rangelength:"<span style='color:red'>Please enter value between 0 to 5</span>"
				}
			} // end of messages					
		}  // end of argument array	
); // end of validate
if ($('#rkeditForm').valid()) {
    
	var rowid = localStorage.getItem('data-row-id');
	
	var business_name= $('#editbusiness').val(); 
	var type_id = $('#edittype_name').val();
	var reviewer_email = $('#editemail').val();  			  
	var reviewer_comments = $('#editcomments').val(); 
	var review_date = $('#editreviewdate').val(); 
	var food_quality;
	var service;
	var RatingValue;
	var has_rating;
	if ($('#erating').prop('checked')) {
			food_quality=$("#editfood_quality").val();
			service=$("#editservice").val();
			RatingValue=$("#editRatingValue").val();
			has_rating='Y';
		}
		else
		{
			has_rating='N';
			food_quality=0;
			service=0;
			RatingValue=0;
		}
		
	
	var rating1 = $('#editfood_quality').val(); 
	var rating2 = $('#editservice').val();  				
	var rating3 = $('#editRatingValue').val(); 
		
	
	updaterkreview(rowid, business_name, type_id, reviewer_email, reviewer_comments, review_date, has_rating, rating1, rating2, rating3);
	
}
}



/*Delete a particular record*/
function deleteRecord() {
    var result = confirm("This will delete this record. Continue delete?");
	if (result) {
		deleterkreview( localStorage.getItem('data-row-id') );
	}
	else
	{
		$.mobile.changePage('#rkViewFeedback', { transition: 'slide' });
	}
}


function setFormDefaultValues() {
	$('#rkaddForm input').val('');		
}

function rksetDefault(email){
	email=$("#default").val();
	localStorage.setItem("default_email",email);
}

function loadDefault(){
	var email=localStorage.getItem("default_email");
	if(email!=null){
		$("#reviewer_email").val(email);
	}
}
