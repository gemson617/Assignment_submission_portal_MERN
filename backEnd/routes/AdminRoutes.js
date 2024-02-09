const express = require('express')
const multer = require('multer');
const router = express.Router()
const AssignmentModel = require('../models/AssignmentModels')
const CompletedAssignmentModel = require('../models/CompletedAssignmentsModel')



// Set up multer storage
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

const storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,"./files");
  },
  filename:function(req,file,cb){
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
})

const upload = multer({ storage: storage });



//get all Friendss
router.post('/submitAssignment', upload.single('file'), async(req, res) => {


  // console.log(req.file);
  // res.send('done')
            const fileData = req.file.filename;
            const comments = req.body.comments;

            const newAssignment = new CompletedAssignmentModel({
              attachment: fileData, // Assuming you have a field named fileData in your schema
              comments: comments,
            });

            // console.log(newAssignment)
            
            try {
              const insertedAssignment = await newAssignment.save();
              res.json({ message: 'File uploaded and assignment submitted successfully!', assignment: insertedAssignment });
            } catch (error) {
              console.error('Error inserting assignment:', error);
              res.status(500).json({ message: 'Internal Server Error' });
            }


            // res.json({ message: 'File uploaded successfully!' });
  });


  router.get('/getAssignments', async(req, res) => {
    const classes = req.query.classes;
    const section = req.query.section;
  
    let assignment;
    try {

      if (classes=='all' && section=='all') {
        // Query with conditions based on both classes and section
        assignment = await AssignmentModel.find({ });
      } else if (classes === "all" && section) {
        // Query to retrieve all classes and filter by section
        assignment = await AssignmentModel.find({ section: section });
      } else if (section === "all" && classes) {
        // Query to retrieve all sections and filter by classes
        assignment = await AssignmentModel.find({ classes: classes });
      } else {
        // Default query when no specific conditions are met
        assignment = await AssignmentModel.find({});
      }
     
      res.send({data:assignment});
    } catch (error) {
      console.error('Error fetching PDF:', error);
      res.status(500).send('can\'t get assignments..sorry Admin!');
    }

  });


   // GET ASSIGNMENT BY ID - TO UPDATE
  router.get('/getAssignmentsById/:id', async(req, res) => {
    const id = req.params.id;
  
    let assignment;
    try {

        // Default query when no specific conditions are met
        assignment = await AssignmentModel.findById(id);
        console.log(assignment)
     
      res.send({data:assignment});
    } catch (error) {
      console.error('Error fetching PDF:', error);
      res.status(500).send('can\'t get assignments..sorry Admin!');
    }

  });


  router.post('/addAssignment', upload.none(), async (req, res) => {
    const newAssignment = req.body;
  
    console.log(newAssignment);
  
    try {
      const assignment = await AssignmentModel.create(newAssignment);
      res.status(201).json({success:true});
    } catch (error) {
      console.error('Error creating assignment:', error);
      res.status(500).json({ msg: 'Something went wrong on post...' });
    }
  });


  //edit Assignments
  router.put('/editAssignment', upload.none(), async (req, res) => {
    const { id, name, description, classes, section, dueDate, notes } = req.body;
  
    try {
      const updatedAssignment = await AssignmentModel.findById(id);
      if (updatedAssignment) {
        updatedAssignment.name = name;
        updatedAssignment.description = description;
        updatedAssignment.classes = classes;
        updatedAssignment.section = section;
        updatedAssignment.dueDate = dueDate;
        updatedAssignment.notes = notes;

        const savedAssignment = await updatedAssignment.save();
        console.log('Assignment updated successfully:', savedAssignment);
    
        res.send({ success: true });
      } else {
        res.status(404).send({ success: false, error: 'Assignment not found' });
      }
    } catch (error) {
      console.error('Error updating assignment:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  });

  router.get('/getAllSubmitted', async(req, res) => {

    try {
          const completedAssignments = await CompletedAssignmentModel.find({is_evaluated : 0});

          res.send({data:completedAssignments});

        } catch (error) {

          console.error('Error fetching PDF:', error);
          res.status(500).send('can\'t get assignments..sorry Admin!');
    }
  });


  router.get('/getSubmittedById/:id', async(req, res) => {

      const completedId = req.params.id;
    try {

          const completedAssignment = await CompletedAssignmentModel.findById(completedId);

          res.send({data:completedAssignment});

        } catch (error) {

          console.error('Error fetching PDF:', error);
          res.status(500).send('can\'t get assignments..sorry Admin!');

    }

  });


    //Evaluate Assignment
    router.put('/evaluate', upload.none(), async (req, res) => {
      const { completedId, marks, feedback} = req.body;
    
      try {
        const completedAssignment = await CompletedAssignmentModel.findById(completedId);
        if (completedAssignment) {

          completedAssignment.marks = marks;
          completedAssignment.feedback = feedback;
          completedAssignment.is_evaluated = 1;

          const savedAssignment = await completedAssignment.save();

          res.status(201).json({success:true});

          // res.send({ success: true });
        } else {
          res.status(404).send({ success: false, error: 'Assignment not found' });
        }
      } catch (error) {
        console.error('Error updating assignment:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
      }
    });
  
  module.exports = router