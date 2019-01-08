const Project = require('./projectModel');

exports.projectCreateOne = (req, res) => {
  Project.findOne({ projectName: req.body.projectName })
    .then((project) => {
      if (project) {
        res.status(409).json({
          fail: {
            message: 'Project name already taken',
          },
        });
      } else {
        const newProject = new Project({
          projectName: req.body.name,
          projectDescription: req.body.description,
          applicationRequirements: req.body.applicationRequirements,
          projectLocationAddress: req.body.address,
          projectLocationCountry: req.body.country,
          email: req.body.email,
          phoneContact: req.body.phone,
          workFields: req.body.workFields,
          workingHours: [req.body.from, req.body.to],
          workDays: req.body.workDays,
          startDate: req.body.startDate,
          endDate: req.body.endDate,
          ownerId: req.body.ownerId
        });
        
        newProject
          .save()
          .then(projectCreated => res.status(201).json(projectCreated))
          .catch(err => res.status(500).json({ fail: err }));
      }
    })
    .catch(err => res.status(500).json({ fail: err }));
};

exports.projectGetAll = (req, res) => {
  Project.find({})
    .then(projects => res.status(200).json(projects))
    .catch(err => res.status(500).json({ fail: err }));
};

exports.projectGetByName = (req, res) => {
  Project.find({ projectName: req.query.name })
    .then((projects) => {
      if (projects.length > 0) {
        res.status(200).json(projects);
      } else {
        res.status(404).json({
          fail: {
            message: 'Project not found!',
          },
        });
      }
    })
    .catch(err => res.status(500).json({ fail: err }));
};

/* NEED REFACTOR (pre-hook?) - FIND OPS TWICE [layer] NEEDED TO RETURN THE UPD DOC */
exports.projectUpdateById = (req, res) => {
  Project.findById(req.body.id)
    .then((projectToUpdate) => {
      if (projectToUpdate) {
          Project.findByIdAndUpdate(
            req.body.id,
            { $set: {
              projectName: req.body.name,
              projectDescription: req.body.description,
              applicationRequirements: req.body.applicationRequirements,
              projectLocationAddress: req.body.address,
              projectLocationCountry: req.body.country,
              email: req.body.email,
              phoneContact: req.body.phone,
              workFields: req.body.workFields,
              workingHours: [req.body.from, req.body.to],
              workDays: req.body.workDays,
              startDate: req.body.startDate,
              endDate: req.body.endDate,
              ownerId: req.body.ownerId
            }},
            { new: true, runValidators: true },
          )
            .then(updatedProject => res.status(200).json(updatedProject))
            .catch(err => res.status(500).json({ fail: err }));
        
      } else {
        res.status(404).json({ fail: { message: 'Project not found!' } });
      }
    })
    .catch(err => res.status(500).json({ fail: err }));
};

exports.projectDeleteById = (req, res) => {
  Project.findById(req.query.projectId)
    .then((projectToRemove) => {
      if (projectToRemove) {
        projectToRemove.remove();
        res.status(204).end();
      } else {
        res.status(404).json({ fail: { message: 'Project not found!' } });
      }
    })
    .catch(err => res.status(500).json({ fail: err }));
};
