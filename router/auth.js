const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");
const cookieParser = require("cookie-parser");

require("../db/conn");
const User = require("../model/userSchema");
const Post = require("../model/post");

router.use(cookieParser());

router.get("/", (req, res) => {
    res.send(`Hello World from server router js`);
});



//registration route..

router.post("/register", async (req, res) => {

    try {
        const { name, email, password, cpassword } = req.body;
        if (!name || !email || !password || !cpassword) {
            return res.status(422).json({ error: "fill all.." });
        }

        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(422).json({ error: "email already exist." });
        } else if (password != cpassword) {
            return res.status(422).json({ error: "passwords are not matching." });
        } else {
            const user = new User({ name, email, password, cpassword });

            await user.save();

            res.status(201).json({ message: "user registered succesfully." });
        }

    } catch (err) {
        console.log(err);
    }


    // console.log(name);
    // console.log(email);
    // res.json({ message: req.body });
    // res.send("My register page..");
});



//login route..

router.post("/signin", async (req, res) => {

    try {
        let token;

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "fill all of them.." });
        }

        const userLogin = await User.findOne({ email: email });
        if (userLogin) {

            const isMatch = await bcrypt.compare(password, userLogin.password);

            token = await userLogin.generateAuthToken();

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });

            if (!isMatch) {
                return res.status(400).json({ error: "invalid details.." });
            }
            return res.json({ message: "signed in.." });

        } else {
            res.status(400).json({ error: "invalid details.." });
        }



    } catch (err) {
        console.log(err);
    }


    // console.log(req.body);
    // res.json({ message: "signed in" });
});

// aboutus
router.get("/about", authenticate, (req, res) => {
    res.send(req.rootUser);
});


// get user data for contact us and homepage
router.get("/getdata", authenticate, (req, res) => {
    res.send(req.rootUser);
});


//contactus
router.post("/contact", authenticate, async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        if (!name || !email || !phone || !message) {
            console.log("error in contact form");
            return res.json({ error: "plz fill all.." });
        }

        const userContact = await User.findOne({ _id: req.UserID });

        if (userContact) {
            const userMessage = await userContact.addMessage(name, email, phone, message);

            await userContact.save();

            res.status(201).json({ message: "user contact succesfully" });
        }
    } catch (error) {
        console.log(error);
    }
});


//favourite
router.post("/favourite", authenticate, async (req, res) => {
    try {
        const { mid, mtype } = req.body;

        const user = await User.findOne({ _id: req.UserID });

        if (user) {
            const userFavourite = await user.addFavourite(mid, mtype);

            await user.save();

            res.status(201).json({ message: "added to favourite" });
        }
    } catch (error) {
        console.log(error);
    }
});


//havefav
router.post("/havefav", authenticate, async (req, res) => {
    try {
        const { mid, mtype } = req.body;

        const user = await User.findOne({ _id: req.UserID });
        if (user) {
            const havefav = await User.findOne({ favourite: { $elemMatch: { mid: mid } } })
            if (havefav) {
                res.status(201).json({ message: "havefav" });
            }
        }
    } catch (error) {
        console.log(error);
    }
});


//removefav
router.post("/removefav", authenticate, async (req, res) => {
    try {
        const { mid, mtype } = req.body;

        const user = await User.findOne({ _id: req.UserID });
        if (user) {
            const removefav = await user.updateOne({ $pull: { favourite: { mid: mid } } });
            await user.save();
            if (removefav) {
                res.status(201).json({ message: "removedfromfavs" });
            }
        }
    } catch (error) {
        console.log(error);
    }
});


//createrec
router.post("/postrec", authenticate, async (req, res) => {
    try {
        const { mid, mtype, body } = req.body;
        if (!mid || !mtype || !body) {
            return res.status(422).json({ error: "fill all.." });
        }

        const post = new Post({ mid, mtype, body, postedBy: req.rootUser });

        await post.save();

        res.status(201).json({ message: "posted succesfully." });

    } catch (error) {
        console.log(error);
    }
});

//allposts
router.get("/allposts", async (req, res) => {
    try {
        const posts = await Post.find().populate("postedBy", "_id name").sort({ $natural: -1 });

        res.json({ posts });
    } catch (err) {
        console.log(err);
    }
});

//post
router.post("/post", async (req, res) => {
    try {
        const post = await Post.findById(req.body.postId).populate("postedBy", "_id name").populate("comments.postedBy", "_id name");
        if (post) {
            res.json({ post });
        }
    } catch (err) {
        console.log(err);
    }
})

//myposts
router.get("/myposts", authenticate, async (req, res) => {
    try {
        const myposts = await Post.find({ postedBy: req.UserID }).populate("postedBy", "_id name").sort({ $natural: -1 });

        res.json({ myposts });
    } catch (err) {
        console.log(err);
    }
});



//like
router.put("/like", authenticate, async (req, res) => {
    try {

        const likepost = await Post.findByIdAndUpdate(req.body.postId, {
            $push: { likes: req.UserID }
        });
        await likepost.save();
        res.status(201).json({ message: "liked" });
    } catch (err) {
        console.log(err);
    }
});

//unlike
router.put("/unlike", authenticate, async (req, res) => {
    try {
        const unlikepost = await Post.findByIdAndUpdate(req.body.postId, {
            $pull: { likes: req.UserID }
        });
        await unlikepost.save();
        res.status(201).json({ message: "unliked" });
    } catch (err) {
        console.log(err);
    }
});

// alreadyliked
// router.post("/alreadyliked", authenticate, async (req, res) => {
//     try {
//         const alreadyliked = await Post.findById(req.body.postId, { likes: req.UserID });
//         if (alreadyliked) {
//             res.status(201).json({ message: "alreadyliked" });
//         }
//     } catch (err) {
//         console.log(err);
//     }
// })

//comments
router.put("/comment", authenticate, async (req, res) => {
    try {
        const comment = {
            text: req.body.text,
            postedBy: req.UserID
        }
        const commentpost = await Post.findByIdAndUpdate(req.body.postId, {
            $push: { comments: comment }
        }).populate("comments.postedBy", "_id name");
        await commentpost.save();
        res.status(201).json({ message: "commented", commentpost });
    } catch (err) {
        console.log(err);
    }
});

//deletepost
router.delete("/deletepost", authenticate, async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.body.postId }).populate("postedBy", "_id");
        if (post.postedBy._id.toString() === req.UserID.toString()) {
            post.remove();
            res.status(201).json({ message: "post deleted successfully" });
        }
    } catch (err) {
        console.log(err);
    }
})


// logout
router.get("/logout", (req, res) => {
    console.log("Logout Page");
    res.clearCookie("jwtoken", { path: "/" });
    res.status(200).send("User Logout");
});



module.exports = router;