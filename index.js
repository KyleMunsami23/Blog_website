import { name } from "ejs";
import express from "express";
import bodyParser from "body-parser";
import multer from "multer";


import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
 
const app = express();
const port =3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

const blogDataList = [];


// Set up storage and file naming
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/images/"); // Destination folder for images
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname); // Naming convention
    },
  });
  const upload = multer({ storage: storage });

  app.get("/", (req, res) => {
    // Randomly select 4 posts from blogDataList
    const randomPosts = blogDataList
      .sort(() => 0.5 - Math.random()) // Shuffle the array
      .slice(0, 4); // Select the first 4 posts after shuffling
  
    res.render("index.ejs", { blogDataList, randomPosts });
  });
  
app.get("/newblog", (req,res) => {
    res.render("newblog.ejs");
});
app.get("/newform", (req,res) => {
  res.render("newform.ejs");
});
app.get("/index", (req,res) => {
    res.render("index.ejs");
});
app.get("/church", (req, res) => {
    const churchPosts = blogDataList.filter(post => post.category === "church");
    res.render("church.ejs", { posts: churchPosts, category: "Church" });
});
app.get("/cars", (req, res) => {
    const carsPosts = blogDataList.filter(post => post.category === "cars");
    res.render("cars.ejs", { posts: carsPosts, category: "Cars" });
});
app.get("/food", (req, res) => {
    const foodPosts = blogDataList.filter(post => post.category === "food");
    res.render("food.ejs", { posts: foodPosts, category: "Food" });
});
app.get("/photography", (req, res) => {
    const photographyPosts = blogDataList.filter(post => post.category === "photography");
    res.render("photography.ejs", { posts: photographyPosts, category: "Photography" });
});
app.get("/gym", (req, res) => {
    const gymPosts = blogDataList.filter(post => post.category === "gym");
    res.render("gym.ejs", { posts: gymPosts, category: "Gym" });
});
app.get("/motivational", (req, res) => {
  const motivationalPosts = blogDataList.filter(post => post.category === "motivational");
  res.render("motivational.ejs", { posts: motivationalPosts, category: "Motivational" });
});
app.get("/code", (req, res) => {
    const codePosts = blogDataList.filter(post => post.category === "code");
    res.render("code.ejs", { posts: codePosts, category: "Code" });
});
app.get("/music", (req, res) => {
    const musicPosts = blogDataList.filter(post => post.category === "music");
    res.render("music.ejs", { posts: musicPosts, category: "Music" });
});
app.get("/travel", (req, res) => {
    const travelPosts = blogDataList.filter(post => post.category === "travel");
    res.render("travel.ejs", { posts: travelPosts, category: "Travel" });
});
app.get("/other", (req, res) => {
  const otherPosts = blogDataList.filter(post => post.category === "other");
  res.render("other.ejs", { posts: otherPosts, category: "Other" });
});
  
app.post("/submit", upload.single("image"), (req, res) => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString();
    
    const postData = {
      title: req.body["title"],
      category: req.body["category"],
      fullname: req.body["author-name"] + " " + req.body["author-surname"],
      hashtags: req.body["hashtags"],
      image: req.file ? `/images/${req.file.filename}` : "",
      message: req.body["message"],
      date: formattedDate,
      timestamp: date.getTime(),
    };
  
    if (req.body.id) {
      // Update the existing post
      const postId = req.body.id;
      const postIndex = blogDataList.findIndex(post => post.id == postId);
      if (postIndex !== -1) {
        blogDataList[postIndex] = { ...blogDataList[postIndex], ...postData };
      }
    } else {
      // Add a new post
      postData.id = Date.now();
      blogDataList.push(postData);
    }
  
    blogDataList.sort((a, b) => b.timestamp - a.timestamp);
    res.redirect("/editform"); // Redirect to the edit form page after submission
  });
  


app.get("/editform", (req, res) => {
    blogDataList.sort((a, b) => b.timestamp - a.timestamp);  // Sort posts by timestamp
    res.render(("editform.ejs"), { blogDataList });  // Render the edit page with the sorted posts
});

app.get("/edit/:id", (req, res) => {
    const postId = req.params.id;
    const post = blogDataList.find(p => p.id == postId); // Find the post by its ID
    if (post) {
        res.render("newform.ejs", { post } ); // Pass the post data to the form for editing
    } else {
        res.status(404).send("Post not found");
    }
});

app.post("/delete/:id", (req, res) => {
  const postId = req.params.id;
  const postIndex = blogDataList.findIndex(post => post.id == postId);
  
  if (postIndex !== -1) {
      // Remove the post from the list
      blogDataList.splice(postIndex, 1);
  }
  
  // Redirect back to the management page
  res.redirect("/editform");
});

app.get("/single/:id", (req, res) => {
  const postId = req.params.id;
  const post = blogDataList.find(p => p.id == postId);
  if (post) {
      res.render("blogtemplate.ejs", {
          image: post.image,
          title: post.title,
          hashtags: post.hashtags,
          fullname: post.fullname,
          date: post.date,
          message: post.message
      });
  } else {
      res.status(404).send("Post not found");
  }
});


app.listen(port, ()=> {
    console.log(`Server running on port ${port}.`);
})