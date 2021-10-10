//Creating routes for notes

var express = require("express");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

const fetchuser = require("../middleware/fetchuser");

var router = express.Router();





//adding new notes using post request;using /api/notes/addnote ,log in required

router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "title must has atleast 1 charecter").isLength({ min: 1 }),
    body("description", "description must has atleast 5 charecter").isLength({
      min: 5,
    }),
  ],
  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
    

      const { title, description, tag } = req.body;
      const note = await Notes.create({
        user: req.user.id,
        title,
        description,
        tag,
      });
      const savednote = await note.save();
      res.send(savednote);
    } catch {
      res.status(500).send({ msg: "Need to be authenticated" });

    }
  }
);






//fetching all the notes of a user using get request,using /api/notes/getallnotes ,login required

router.get("/getallnotes", fetchuser, async function (req, res) {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.send(notes);
  } catch {
    res.status(500).send({ msg: "Need to be authenticated" });
  }
});






//updating existing note using /api/notes/updatenotes/:id ,log in required


router.put('/updatenote/:id',
  fetchuser,
  async (req,res)=>{
      const noteId=req.params.id
      const note= await Notes.findById(noteId)
      if(!note){
        return res.status(404).send("Not exists")

      }
      if(note.user.toString()!=req.user.id)
        return res.status(400).send("Not allowed")

      const {title,description,tag}=req.body
      const newNote={}
      if(title)
        newNote.title=title
      if(description)
        newNote.description=description
      if(tag)
        newNote.tag=tag
      const note1=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
      res.status(200).send(note1)

  }

)




//delete existing note,using /api/notes/updatenotes/:id ,log in required
router.delete('/deletenote/:id',
  fetchuser,
  async (req,res)=>{
      const noteId=req.params.id
      const note= await Notes.findById(noteId)
      if(!note){
        return res.status(404).send("Not exists")

      }
      if(note.user.toString()!=req.user.id)
        return res.status(400).send("Not allowed")

      
      const note1=await Notes.findByIdAndDelete(noteId)
      res.status(200).send("Deleted Successfully")

  }

)
module.exports = router;
