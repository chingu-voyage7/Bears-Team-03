const Business = require('./businessModel');

exports.businessCreateOne = (req, res) => {
  Business.findOne({ VAT: req.body.VAT })
    .then((business) => {
      if (business) {
        res.status(409).json({ fail: { message: 'VAT already inserted' } });
      } else {
        const newBusiness = new Business({
          companyName: req.body.companyName,
          VAT: req.body.VAT,
          localOfficeAddress: req.body.localOfficeAddress,
          localOfficeCountry: req.body.localOfficeCountry,
          mainHeadQuarter: req.body.mainHeadQuarter,
          phoneContact: req.body.phoneContact,
          workFields: req.body.workFields,
          ownerId: req.userData.id,
        });
        newBusiness
          .save()
          .then(businessCreated => res.status(201).json(businessCreated))
          .catch(err => res.status(500).json({ fail: err }));
      }
    })
    .catch(err => res.status(500).json({ fail: err }));
};

exports.businessGetAll = (req, res) => {
  Business.find({})
    .then(businesses => res.status(200).json(businesses))
    .catch(err => res.status(500).json({ fail: err }));
};

exports.businessGetByVAT = (req, res) => {
  Business.findOne({ VAT: req.query.VAT })
    .then((business) => {
      if (business) {
        res.status(200).json(business);
      } else {
        res.status(404).json({ fail: { message: 'Business not found!' } });
      }
    })
    .catch(err => res.status(500).json({ fail: err }));
};

exports.businessGetByName = (req, res) => {
  Business.find({ companyName: req.query.name })
    .then((businesses) => {
      if (businesses.length > 0) {
        res.status(200).json(businesses);
      } else {
        res.status(404).json({ fail: { message: 'Business not found!' } });
      }
    })
    .catch(err => res.status(500).json({ fail: err }));
};

/* NEED REFACTOR (pre-hook?) - FIND OPS TWICE [layer] NEEDED TO RETURN THE UPD DOC */
exports.businessUpdateById = (req, res) => {
  Business.findById(req.body.companyId)
    .then((businessToUpdate) => {
      if (businessToUpdate) {
        if (businessToUpdate.ownerId.toString() === req.userData.id) {
          Business.findByIdAndUpdate(
            req.body.companyId,
            { $set: req.body },
            { new: true, runValidators: true },
          )
            .then(updatedBusiness => res.status(200).json(updatedBusiness))
            .catch(err => res.status(500).json({ fail: err }));
        } else {
          res.status(401).json({ fail: { message: 'Unauthorized' } });
        }
      } else {
        res.status(404).json({ fail: { message: 'Business not found!' } });
      }
    })
    .catch(err => res.status(500).json({ fail: err }));
};

exports.businessDeleteById = (req, res) => {
  Business.findById(req.query.companyId)
    .then((businessToRemove) => {
      if (businessToRemove) {
        businessToRemove.remove();
        res.status(204).end();
      } else {
        res.status(404).json({ fail: { message: 'Business not found!' } });
      }
    })
    .catch(err => res.status(500).json({ fail: err }));
};
