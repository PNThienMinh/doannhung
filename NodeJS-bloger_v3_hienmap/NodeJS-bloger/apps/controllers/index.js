var express = require("express");
var router = express.Router();

var user_md = require("../models/user");
var helper = require("../helpers/helper");

router.get("/", function (req, res) {
	//res.json({"message": "This is Home Page"});
	res.render("home");
});

//Chuyen den dang kí
router.get("/signup", function (req, res) {
	res.render("signup", { data:{} });
});


//chuyển đến chat
router.get("/chat", function (req, res) {
	res.render("chat", { data:{} });
});

//chuyển đến chat
router.get("/playgame", function (req, res) {
	res.render("playgame", { data:{} });
	//res.sendFile('/public/index.html');


	
});

//tay cam
router.post('/', function (req, res) {
	
	console.log("request.method: " + req.method);
	
	res1 = {
		textdata: req.body,
	};

	//this line is optional and will print the response on the command prompt
	//It's useful so that we know what infomration is being transferred
	//using the server
	console.log(res1);

	//convert the response in JSON format
	res.end(JSON.stringify(res1));
});


router.get("/taycam",function(req,res){
	res.render("taycam",{data:{}});

});

router.post("/signup", function (req, res) {
	//bien chua du lieu trong from
	var user = req.body;

	if (user.email.trim().length == 0) {
		res.render("signup", {
			data: {
				error: "User is required"
			}
		});
	} else if (user.passwd.trim().length == 0) {
		res.render("signup", {
			data: {
				error: "Password is required"
			}
		});
	} else if (user.passwd != user.repasswd && user.passwd.trim().length != 0) {
		res.render("signup", {
			data: {
				error: "Password is not match"
			}
		});
	} else {
	// Insert to DB
		var password = helper.hash_password(user.passwd);
		user = {
			email: user.email,
			//password: user.passwd
			password: password

		};

		// Dua xu lieu vao database
		//var results = user_md.addUser(user);

		var results = user_md.addUser_check(user);
		/*
		if (!results){
		res.render("signup.ejs", {data: {error: "Could not insert to DB"}});
		}else{
		res.json({message: "insert success data to DB"});
		}
		 */

		/* results.then(function(data){
		res.json({message: "Insert success"});
		}).catch(function(err){
		res.render("signup", {data: {error: "error"}});
		});
		 */

		//Xu ly xong tro lại trang dang nhap
		results.then(function (data) {
			//res.redirect("/admin/signin");
			res.redirect("/signin");
		}).catch(function (err) {
			console.log(err);
			res.render("signup", {
				data: {
					//error: "error"
					error: "User is already taken"
				}
			});
		});
	}
});

// Duong dan toi form dang nhap
router.get("/signin", function (req, res) {
	res.render("signin", {
		data: {}
	});
});

router.post("/signin", function (req, res) {
	// Hung duoc router
	// Lay thong tin tu form từ biến params
	var params = req.body;

	// Loi khong nhap email
	if (params.email.trim().length == 0) {
		// render luôn trả về html
		res.render("signin", {
			data: {
				error: "Please enter an email"
			}
		});
	} else if (params.password.trim().length == 0) {
		// render luôn trả về html
		res.render("signin", {
			data: {
				error: "Please enter an password"
			}
		});
	} else {
		// data nhan email
		var data = user_md.getUserByEmail(params.email);

		// nếu có data
		if (data) {
			// data là đối tượng defer
			data.then(function (users) {
				var user = users[0];
				
				//console.log(user);
				//console.log(user.password);
				//console.log(params.password);
				
				var status = helper.compare_password(params.password, user.password);
				//console.log(status);
				if (!status) {
					res.render("signin", {
						data: {
							error: "Password Wrong"
						}
					});
				//dang nhap dung
				} else {
					// Đẩy user ra
					req.session.user = user;
					console.log(req.session.user);
					//Sang trang chu home
					//res.redirect("/");
					 res.redirect('playgame');
					//res.redirect('chat');
				
				}
			});

			//Lỗi không có data user
		} else {
			res.render("signin", {
				data: {
					error: "User not exists"
				}
			});
		}
	}

});

module.exports = router;


