# Bears-Team-03
Volunteer Manager App | Voyage-7 | https://chingu.io/

## 1. IDEA
**Volunteer Manager App** that helps NGOs to recruit and manage volunteers for a non-profit project

With this we want to *make the world a better place one project at a time*.

## 2. Member roles
The main roles needed to successfully complete this project are:

* **Data Steward**:
This person is in charge of data scraping, assembling, and cleaning up the data for use by the Visual Stewards.
* **Visual Steward**:
This person is in charge of creating the visual that will display the data in a meaningful manner.
* **Documentation Czar**:
This person is in charge of making sure that does any final assembling and editing of any documentation submitted to GitHub and to the meeting notes to assure that writing is coherent, clear, and technically and grammatically correct.
* **Version Control Monitor**:
This person has the most experience in git. They will be in charge of making sure that all changes made to the master branch, individual branch merges, and any other git issues are resolved. They will be sure that the master branch is ready and working for pull.
* **Architect**:
This person ensures that the multiple components of the project successfully works together. The architect also makes sure that every member understands the components.

Each team member will be assigned a main role throughout the course of this project.

* @Layer: Data Steward, Architect
* @Nick: Documentation Czar, Team Lead
* @Phrixus: Version Control Monitor, Documentation Czar
* @SeghCode: Architect, Visual Steward 

Additional roles will be assigned as needed.

## 3. The stack:
* **Front End**:
  * React
  * Bootstrap
* **Back End**:
  * NodeJS
  * ExpressJS
* **Database**:
  * MongoDB

## 4. Code standards: 
* **Linting**: 
  * AirBnB rulesheet ( https://github.com/airbnb/javascript)
* **Variable naming**:
  * use camelCase to create variable names.
  * Self-explanatory names as much as possible, balanced with the name length( < 15 chars? )
  * We can make use of few clearly defined standard: e for event, i for index etc ..
* **Accessibility**:
  * use html5 semantic tags whenever is appropriate: sections, articles, aside, …
  * HTML outliners ( something like this: https://gsnedders.html5.org/outliner/?)
* **Comments**:
  * Do not overuse them commenting each variable / function / method: on the other hand do not use them only to explain obscure code but also to create section ( i.e. into big html / css ) or to clarifiy why a particular function is created ( only for maintenance? to extract logic? etc .. )
  * Use comments not only in js files: css needs some too aswell as any config file

## 5. Git workflow: 
#### Git-master:
- create master branch
- create developer branch
- Responsible to merge into master
- Validate to merge into develop with another teammate

#### Team:

- clone repo / pull from develop branch
- create a new branch ( based on the task you're assigned to) following the naming convention
- start working on that branch until it's ended
- commit often, always with a consistent name
- the commit has to refer to a single 'kind' of change
- when the task is completed create a PR ( basically push your entire branch)

#### Git naming convention (quoted from 'Francesco Agnoletto': https://medium.com/@francesco.agnoletto/how-to-not-f-up-your-local-files-with-git-part-1-e0756c88fd3c):
* **branches**: 
  - feature/[name] :Used when creating a new feature; 
  - refactor/[name] : Used when modifying an existent feature; 
  - style/[name] : Used when styling stuff; 
  - bugfix/[name] : Used when fixing errors;
* **commits**: 
  - Capitalize first letter 
  - Keep it under 72 chars

## 6. Organization and communication tools
* **Trello** - for tracking progress and saving useful resources
* **Slack** - for getting help from teammates and random discussions
* **GitHub** - for saving code and managing the public profile of the project
* **Google Docs** - for saving meeting notes and long form content

## 7. Dispute Resolution:

**technical disagreement**:
Debate between the disagreeing parties. If they cannot agree, the architect makes the final call.
**mission displacement**:
If 3 out of 4 team members agree on that someone doesn't follow our mission we can give out a warning and if a member gets 3 warnings within 2 weeks we talk with Chance.
