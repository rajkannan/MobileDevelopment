var db;
function errorHandler(transaction, error) {
    alert("SQL error: " + error.message);
}
$(document).ready(function(){
		db=openDatabase('RKFeedBackDB','1.0','RKFeedBackDB',2*1024*1024);
		
		createTables();
		
		//Populate the drop down list
		get_rktype();
		//Populate the edit drop down list
		editget_rktype();
		//List of all reviews
		$("#btnAll").on("click",  
		getAll	); 
		//Update Reviews
		$("#btnUpdate").on("click", function(){  
			updateRecord();
			return false;}
		);
		 
			$("#btnDelete").on("click",  
			deleteRecord 
			); 

		loadDefault();
		
		function sR(a,b){
// The query was successfully!
	}
		function fR(a,b){
// Oops! There was an issue. Let’s alert the user.
		alert(b.message);
	}
	function createTables(){
	
	db.transaction(function(tx){
			
			tx.executeSql("CREATE TABLE IF NOT EXISTS rktype(type_id INTEGER PRIMARY KEY AUTOINCREMENT, type_name)",null,sR,fR);
			tx.executeSql("CREATE TABLE IF NOT EXISTS rkreview(id INTEGER PRIMARY KEY AUTOINCREMENT,business_name,type_id INTEGER,reviewer_email, reviewer_comments,review_date DATE,has_rating,rating1 INTEGER,rating2 INTEGER,rating3 INTEGER,FOREIGN KEY(type_id) REFERENCES rktype(type_id))",null,sR,fR);
		});
		
		db.transaction(function (tx) {
  tx.executeSql('SELECT * FROM rktype', [], function (tx, results) {
   var len = results.rows.length;
   if(len==0){
   		tx.executeSql("INSERT INTO rktype(type_name)VALUES('Coffee Shop')",null,fR);
			tx.executeSql("INSERT INTO rktype(type_name)VALUES('Canadian')",null,fR);
			tx.executeSql("INSERT INTO rktype(type_name)VALUES('Asian')",null,fR);
			tx.executeSql("INSERT INTO rktype(type_name)VALUES('Other')",null,fR);
   }
 }, null);
});
}	
		
});
