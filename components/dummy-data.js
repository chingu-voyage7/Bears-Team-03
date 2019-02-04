const User = require('./user/userModel');
const Project = require('./project/projectModel');

exports.prepopulate = async (req, res) => {

    await User.deleteMany({fullname: {$in: ["jhon", "debbie","frank"]}});
   // await User.deleteMany({});
    await Project.deleteMany({});

	try {
        const mockData = await User.findOne({fullname: "frank"});
		if (mockData) {
			return res.status(200).json({message: "Db was already filled with mock data"});
		}

		const frank = await User.create({
            fullname: "frank", 
            email: "frank@test.com", 
            passwordHash: "frankfrank",
            gender: 'male',
            address: '123 main street',
            city: 'Los Angeles',
            country: 'NY',
            stateOrProvince: 'Chile',
            zipCode: 'af352',
            hours: ['08:00', '12:00'],
            volunteerField: ['2','5', '10'],
            phone: '123123123123',
            days: ['thu', 'sat']

        });

        const jhon = await User.create({
            fullname: "jhon", 
            email: "jhon@jhon.com", 
            passwordHash: "jhonjhon",
            gender: 'male',
            address: '123 main street',
            city: 'Los Angeles',
            country: 'NY',
            stateOrProvince: 'Chile',
            zipCode: 'af352',
            hours: ['08:00', '12:00'],
            volunteerField: ['2','5', '10'],
            phone: '123123123123',
            days: ['mon', 'wed']

        });

        const debbie = await User.create({
            fullname: "debbie", 
            email: "debbie@debbie.com", 
            passwordHash: "debbiedebbie",
            gender: 'female',
            address: '123 main street',
            city: 'Los Angeles',
            country: 'NY',
            stateOrProvince: 'Chile',
            zipCode: 'af352',
            hours: ['08:00', '12:00'],
            volunteerField: ['2','5', '10'],
            phone: '123123123123',
            days: ['mon', 'fri']

        });

        const cleanRivers = await Project.create({
            workFields: ["sustainability","oceans"],
            workingHours: ['07:45', '08:30'],
            workDays: ['tue','thu'],
            projectName: " Clean the rivers!!",
            projectDescription: "Need someone willingly to help us clean the east side river from all the junk those bastards keep throwing around!",
            applicationRequirements: "No fussy guys allowed, thing would become dirty :P",
            projectLocationAddress: "78 Roosevelt area greenway",
            projectLocationCountry: "NY, USA",
            email: "cleanTheRiver@test.com",
            phoneContact: 456456456456,
            dueDate: "2019-01-31",
            startDate: "2019-01-20T00:00:00.000Z",
            endDate: "2019-02-20T00:00:00.000Z",
            ownerId: jhon.fullname,
            applicants: [{applicantInfo: frank._id, state: 'accept'}]
        });

        const HelpThePoors = await Project.create({
            workFields: ["poverty","hunger"],
            workingHours: ['19:45', '21:30'],
            workDays: ['mon','wed','fri'],
            projectName: "Help the poors!",
            projectDescription: "We're looking for people to distribute foods to the poors",
            applicationRequirements: "Warm and patient people are welcome!",
            projectLocationAddress: "Viale Piave 2, Milan",
            projectLocationCountry: "It",
            email: "sanFrancesco@gmail.com",
            dueDate: "2019-02-20",
            startDate: "2019-01-03T00:00:00.000Z",
            endDate: "2019-01-03T00:00:00.000Z",
            ownerId: debbie.fullname,
            applicants: [{applicantInfo: frank._id, state: 'accept'},{applicantInfo: jhon._id, state: 'reject'}]
        });

        const SitIn = await Project.create({
            workFields: ["energy","innovation", "climate"],
            workingHours: ['06:45', '08:45'],
            workDays: ['sat','sun'],
            projectName: "Sit in against the coal power station!",
            projectDescription: "Weekly meetings to protest against the most climate-damaging power plant in the European Union",
            applicationRequirements: "/",
            projectLocationAddress: "Belchatow, Lodz",
            projectLocationCountry: "Poland",
            email: "cleanair@test.com",
            phoneContact: 159159159159,
            dueDate: "2019-01-14",
            startDate: "2019-02-01T00:00:00.000Z",
            endDate: "2019-03-30T00:00:00.000Z",
            ownerId: jhon.fullname,
            applicants: [{applicantInfo: frank._id, state: 'pending'}, {applicantInfo: debbie._id, state: 'pending'}]
        });

		return res.status(200).json({message: "Db Populated"});
	} catch (error) {
		console.log(error);
		res.status(500).json(error);
	}
};