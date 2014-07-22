/**
 * @author raj
 */
/*
 * 
 */

function rkcreateFeedbackTable(){
	
	db.transaction(function(tx){
			tx.executeSql("CREATE TABLE IF NOT EXISTS rkreview(id INTEGER PRIMARY KEY AUTOINCREMENT,business_name,type_id INTEGER,reviewer_email, reviewer_comments,review_date DATE,has_rating,rating1 INTEGER,rating2 INTEGER,rating3 INTEGER,FOREIGN KEY(type_id) REFERENCES rktype(type_id))",null,sR,fR);
		});
}

function rkclearDatabase(){
	db.transaction(function(tx,res){
		var a=confirm("All review records will be deleted permanently. Are you sure?");
if (a==true)
  {
  tx.executeSql("DELETE FROM rkreview",[],null,errorHandler);
			rkcreateFeedbackTable();
			
  }		
	});
}
/* For drop down list of types of business */
function get_rktype(){
	
	db.transaction(function (tx) {
		tx.executeSql("SELECT * from rktype order by type_name DESC", null,
		function(tx, res) {
			if (res.rows.length == 0) {

				// this shouldn't happen - as we already inserted them.
		
			}
			else
			{	
				var len = res.rows.length;
				
				var code = "";
				
				for (var i = 0; i < len; i++){
					
					if (i == 0) {
						code = code + '<option selected="TRUE" value="'+res.rows.item(i).type_id+'">'+res.rows.item(i).type_name+'</option>';
					}
					else
					{
						code = code + '<option value="'+res.rows.item(i).type_id+'">'+res.rows.item(i).type_name+'</option>';
					}
		

				}
			
				$("#type_name").html(code);
			}
		},
		fR);
	});
}

/* Edit Form - For types of business*/
function editget_rktype(){ 
		
		db.transaction(function (tx) {
			tx.executeSql("SELECT * from rktype", null,
			function(tx, res) {
				if (res.rows.length == 0) {
					//console.log("seriously");
				}
				
			else
				{
					var len = res.rows.length;

					var code = "";
		
				for (var i = 0; i < len; i++)	
					{
						code = code + '<option value="'+res.rows.item(i).type_id+'">'+res.rows.item(i).type_name+'</option>';
					}
					
					$("#edittype_name").html(code);
				}
				},		
			fR);
		});
}
/*Adding Review*/
function add_rkreview(business_name,typename, reviewer_email,reveiwerComments,review_date, addRating,food_quality,service,RatingValue){
	
	var sqlString = "INSERT INTO rkreview (business_name,type_id,reviewer_email, reviewer_comments, review_date,has_rating,rating1,rating2,rating3)"
		+ " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);";
		
	db.transaction(function (tx) {
		tx.executeSql(sqlString, [business_name,typename, reviewer_email,reveiwerComments,review_date, addRating,food_quality,service,RatingValue],
		function(tx, res) {
			console.debug("Debug: Record added");
			alert("New review has been added.");
			setFormDefaultValues();
		},
		errorHandler);
	});
	
}
/* Select all */

function onFindSuccess(results) { 
 
    var aRow = null;

    if (results.rows.length > 0) {
    	// only one row expected
        aRow = results.rows.item(0);
        // populate edit form input fields
       	$('#editbusiness').val( aRow['business_name'] );   
		$('#edittype_name').val( aRow['type_id'] ).attr("selected", "selected");  
		$('#editemail').val( aRow['reviewer_email'] ); 	   
       	$('#editcomments').val( aRow['reviewer_comments'] ); 	   
       	$('#editreviewdate').val( aRow['review_date'] );       	 
       	$('#editfood_quality').val( aRow['rating1'] ); 	   
       	$('#editservice').val( aRow['rating2'] ); 	   
       	$('#editRatingValue').val( aRow['rating3'] ); 	   
		$('#edittype_name').selectmenu('refresh', 'true');
		
		 	// type radio control
       	if ( aRow['has_rating'] === 'Y' ) {
       		$('#erating').prop('checked', true);
       		$("#edit_rating").show();
       	} 
       	else {
       		$('#erating').prop('checked', false);
       		$("#edit_rating").hide();
       	}
       	$("#rkeditForm input[type='checkbox']").checkboxradio("refresh");;
    }
		
		   
    
    $.mobile.changePage('#rkEditFeedback', { transition: 'none' });
	//alert("reached end of find success");   

}

function findfeedback( id ) {
    db.transaction(function (transaction) {
        transaction.executeSql("SELECT rowid as id, * FROM rkreview WHERE id = ?",
				[ id ],
                function (transaction, results) { onFindSuccess(results) },
                errorHandler);
				//INNER JOIN rktype on rkreview.type_id =rktype.type_id
    });
}

/*function getallrktypes(type_id){
	   db.transaction(function (transaction) {
        transaction.executeSql("SELECT type_name FROM rktype WHERE type_id= ?,
				[ type_id ],
                function (transaction, results) { onFindSuccess(results) },
                errorHandler);
}*/


/* Update */
function onGetAllSuccess(results) {  
    // alert("rows: " + results.rows.length);
    
    // initialise a string to hold the html line items
    var htmlStr = '';
    var aRow = null;

    if (results.rows.length == 0) {
        htmlStr += '<h4>No records found.</h4>';
    }

    // read each of the rows from the results
    for (var i = 0; i < results.rows.length; i++) {
        //  htmlStr += JSON.stringify(results.rows.item(i));
        aRow = results.rows.item(i);
		
		// Note: store the PK (id) as data-row-id attribute	
		
	
        htmlStr += '<li class="listviewItem" '
            + 'data-row-id="' + aRow['id'] 
        	+ '">'
            + '<a href="#rkEditFeedback">'
            + '<h4>'
			+'Business Name: '
            + aRow['business_name']
            + '</h4>'
			+ '<p><b> Type of Business: '
            + aRow['type_id']
            + '</b></p>'
            + '<p> Reviewer Email:'
            + aRow['reviewer_email']
            + '</p>'
			+'<p> Reviewer Comments: '
			+ aRow['reviewer_comments']
            + '</p>'
			+'<p> Review Date: '
            + aRow['review_date']
			+'</p>'
			+'<p> Ratings: </p>'
            + '<p> Food Quality: '
			+ aRow['rating1']
            + '</p>' 
			+ '<p>Service: '
			+ aRow['rating2']
            + '</p>'
			+'<p> Value: '
			+ aRow['rating3']
            + '</p>'
            + '</a>'
			+ '</li>'; 
    } // for

    //alert(htmlStr);
    $("#lstAll").empty();
    $("#lstAll").append(htmlStr);
    $("#lstAll").listview('refresh'); 
    
    // event handler for listview items
    $(".listviewItem").click(function () {
        var id = this.getAttribute('data-row-id');       
        
        // save to localStorage: id is not editable
        localStorage.setItem('data-row-id', id);
        findfeedback( id );
    });
}

function getAll() {
    db.transaction(function (transaction) {
        transaction.executeSql("SELECT rowid as id, * FROM rkreview ORDER BY rowid DESC",
				[],
                function (transaction, results) { onGetAllSuccess(results) },
                errorHandler);
				//INNER JOIN rktype ON rkreview.type_id=rktype.type_id 
    });
}

//update function

function onUpdateSuccess( response ) {
    alert("Row updated");

    // refresh an element on any page to refresh the new values
    $("#lstAll").listview('refresh');

    // refresh the list
    getAll();
    $.mobile.changePage('#rkViewFeedback', { transition: 'slide' });
}

function updaterkreview(rowid, business_name, type_id, reviewer_email, reviewer_comments, review_date, has_rating, rating1, rating2, rating3) 
{
    
	var sqlString = "UPDATE rkreview SET business_name = '" + business_name
        + "', type_id= '" + type_id
        + "', reviewer_email = '" + reviewer_email
		+ "', reviewer_comments = '" + reviewer_comments
		+ "', review_date = '" + review_date
		+ "', has_rating = '" + has_rating
		+ "', rating1 = '" + rating1
		+ "', rating2 = '" + rating2
		+ "', rating3 = '" + rating3
		+ "' WHERE id = " + rowid + ";";
     db.transaction(function (transaction) {
        transaction.executeSql(
                sqlString,
                [],
                function (transaction, response) {
                    onUpdateSuccess( response );
                },
                errorHandler
            ); // executeSql

    });

} // end update

/*Delete a review*/
function onDeleteSuccess( response ) {
	alert("Row deleted");

    // refresh the list
    getAll();
    $.mobile.changePage('#rkViewFeedback', { transition: 'slide' });
}


function deleterkreview(id) {
    var sqlString = "DELETE FROM rkreview WHERE id = " + id + ";";

    db.transaction(function (transaction) {
        transaction.executeSql(
                sqlString,
                [],
                function (transaction, response) {
                    onDeleteSuccess( response );
                },
                errorHandler
            );
    });
} 



function sR(a,b){
// The query was successfully!
	}
		function fR(a,b){
// Oops! There was an issue. Let’s alert the user.
		alert(b.message);
	}
		
