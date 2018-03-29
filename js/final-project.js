//...............Arrays for holding all text....................
const cvContent = [
  "Experience",
  "Education",
  "Certificates",
  "Skills",
  "Interests",
  "Profiles",
  "Contact"
]

const workExperience = [
  "<p>Embrace IT - Junior Software Engineer (March 2018 - present day)</p><p>We build IT stuff</p>",
  "<p>PMT Groep - Junior Consultant (February 2017 - February 2018)</p><p>Maak die pensioenkeuze nou gewoon</p>",
  "<p>CSV Ichthus Rotterdam - Treasurer (July 2015 - June 2016)</p><p>Ka ching</p>",
  "<p>Wybenga Advocaten - Legal Intern (May 2015 - June 2015)</p><p>I've got no idea what I'm doing, but I seem to be doing OK</p>"
]

const education = [
  "<p>Embrace IT - Web development traineeship</p><p>We build IT stuff</p>",
  "<p>Erasmus University Rotterdam - LLM Health Law</p><p>Boy, I hope I'll actually be able to find a job</p>",
  "<p>Erasmus University Rotterdam - LLB Dutch Law</p><p>Wow, all these potential jobs look great!</p>"
]

const certificates = [
  "<strong>W3C</strong><br>HTML",
  "<strong>W3C</strong><br>CSS",
  "<strong>W3C</strong><br>JavaScript",
  "<strong>Coursera</strong><br>HTML/CSS/JS",
  "<strong>Coursera</strong><br>SQL",
  "<strong>Scrum.org</strong><br>Agile / Scrum",
  "<strong>Lindenhaeghe</strong><br>Wft vermogen",
  "<strong>Lindenhaeghe</strong><br>Wft inkomen",
  "<strong>Lindenhaeghe</strong><br>Wft basis"
]

const madSkillz = [
  "HTML5",
  "CSS3",
  "JavaScript",
  "Jquery",
  "Bootstrap",
  "TMap",
  "Agile / Scrum",
  "Git",
  "Jira"
]

const interests = [
  "Music and guitar",
  "Audio production",
  "Film",
  "Video Games"
]

const profiles = [
  "<a href=\"https://www.linkedin.com/in/bas-kleisen-610614122/\" target=\"_blank\">LinkedIn</a>",
  "<a href=\"https://github.com/DeBasLightyear\" target=\"_blank\">GitHub</a>"
]

const contactInfo = [
  "<a href=\"mailto:baskleisen@gmail.com\">baskleisen@gmail.com<\a>",
  "<a href=\"tel:031634331455\">+31 6 34 33 14 55</a>"
]

//--------------------------------------------------------------
//...............Behold all functions below.....................
//--------------------------------------------------------------

//Variables for element ID's and element content
const cvBody = document.getElementById("bodyCV")
const portfolioBody = document.getElementById("portfolio")
let cvBodyBackup
let portfolioBodyBackup
let portfolioAlreadyLoaded

const cvTab = document.getElementById("tab-cv")
const portfolioTab = document.getElementById("tab-portfolio")

function loadPortfolio(){
  cvBody.innerHTML = ""
  if (!portfolioAlreadyLoaded){
    portfolioAlreadyLoaded = true
    portfolioBody.appendChild(portfolioBodyBackup)
  }
  else {
    portfolioBody.innerHTML = portfolioBodyBackup
  }
}

function loadCV(){
  portfolioBodyBackup = portfolioBody.innerHTML
  portfolioBody.innerHTML = ""
  cvBody.innerHTML = cvBodyBackup
}

portfolioTab.addEventListener("click", loadPortfolio)
cvTab.addEventListener("click", loadCV)

/* Functions for creating divs for content of CV with correct id
(respectively Work experience, skills etc and Embrace, PMT, Wybenga etc)*/
function createSections(){
const elements = []
  for (let section of cvContent){
    const sectionElement = document.createElement("div")
    const sectionTitleElement = document.createElement("div")
    
    sectionElement.setAttribute("id", section)
    sectionElement.setAttribute("class", "section")
    sectionTitleElement.setAttribute("id", `titleOfSection`)
    sectionTitleElement.innerHTML = `<h1>${section}</h1>`
    sectionElement.appendChild(sectionTitleElement)
    elements.push(sectionElement)
  }
  return elements
}

function createSubSection(numberInArray, arrayName){
  const newDiv = document.createElement("div")
  const centerTextDiv = document.createElement("div")
  centerTextDiv.setAttribute("class", "centerContentInDiv")
  centerTextDiv.innerHTML = arrayName[numberInArray]
  newDiv.appendChild(centerTextDiv)
  return newDiv
}
 
// Functions for GETting my repos from Github and storing it
function gitItOn(){
  const gitInfo = []
  let gitDiv = ""
  function makeProjectSummary(project){
    const array = []
    array.push(project.name)
    array.push(project.svn_url)
    array.push(project.description)
    array.push(project.language)
    gitInfo.push(array)
  }
  function makeSectionTitle(){
    const test= document.createElement("div")
    test.innerHTML = "<h1>GitHub Repositories</h1>"
    return test
  }
  gitDiv = makeSectionTitle()
  fetch("https://api.github.com/users/DeBasLightyear/repos")
    .then(response => response.json())
    .then(repositories => {
      for (let repo of repositories){
        makeProjectSummary(repo)
      }
    })
    .then(() => {
      for (let repo of gitInfo){
        const newDiv = document.createElement("div")
        newDiv.setAttribute("id", "portfolioCard")
        for (let element of repo){
          const newP = document.createElement("p")
          newP.innerHTML = `${element}`
          newDiv.appendChild(newP)
        }
        gitDiv.appendChild(newDiv)
      }
      portfolioBodyBackup = gitDiv
    })
}

/* Function for inserting HTML generated by aforementioned functions into index.html*/
function insertSectionsIntoBodyCV(){

  //Insert main framework
  const elementsCV = createSections()
  const bodyCV = document.getElementById("bodyCV")
  for (let element of elementsCV){
    bodyCV.appendChild(element)
  }
  
  //Insert experience
  for (let i = 0, leng = workExperience.length; i < leng; i++){
    const xpDiv = document.getElementById("Experience")
    const experience = createSubSection(i,workExperience)
    experience.setAttribute("class", "xpAndEdu")
    xpDiv.appendChild(experience)
  }

  //Insert education
  for (let i = 0, leng = education.length; i < leng; i++){
    const eduDiv = document.getElementById("Education")
    const edu = createSubSection(i,education)
    edu.setAttribute("class", "xpAndEdu")
    eduDiv.appendChild(edu)
  }

  //Insert certificates
  for (let i = 0, leng = certificates.length; i < leng; i++){
    const certDiv = document.getElementById("Certificates")
    const certificate = createSubSection(i,certificates)
    certificate.setAttribute("class", "card")
    certDiv.appendChild(certificate)
  }

  //Insert mad skills
  for (let i = 0, leng = madSkillz.length; i < leng; i++){
    const skillsDiv = document.getElementById("Skills")
    const skill = createSubSection(i,madSkillz)
    skill.setAttribute("class", "card")
    skillsDiv.appendChild(skill)
  }

  //Insert interests
  for (let i = 0, leng = interests.length; i < leng; i++){
    const interestsDiv = document.getElementById("Interests")
    const interest = createSubSection(i,interests)
    interest.setAttribute("class", "card")
    interestsDiv.appendChild(interest)
  }

  //Insert Profiles
  for (let i = 0, leng = profiles.length; i < leng; i++){
    const profilesDiv = document.getElementById("Profiles")
    const profile = createSubSection(i,profiles)
    profile.setAttribute("class", "smallCard")
    profilesDiv.appendChild(profile)
  }

  //Insert contact
  for (let i = 0, leng = contactInfo.length; i < leng; i++){
    const contactDiv = document.getElementById("Contact")
    const contact = createSubSection(i,contactInfo)
    contact.setAttribute("class", "smallCard contactCard")
    contactDiv.appendChild(contact)
  }
  console.log("Lift-off!")
  cvBodyBackup = cvBody.innerHTML
}
insertSectionsIntoBodyCV()
gitItOn()