//...............Arrays for holding all text....................
const cvContent = [
  "Core Qualities",
  "Experience",
  "Education",
  "Certificates",
  "Skills",
  "Interests",
  "Profiles",
  "Contact"
]

const coreQualities = [
  "Curious",
  "Driven",
  "Team&nbsp;Player",
  "Helping"
]

const workExperience = [
  "<p><strong>Embrace IT - Junior Software Engineer (March 2018 - present day)</strong></p><p>This traineeship started in March 2018 with a month long course in web development and software testing. The most important goals of the traineeship were learning to program in JavaScript in combination with Jquery, HTML, CSS and Bootstrap. The goal of this first month of training was learning a strong basis for various programming languages using modern code design and unit testing</p>",
  "<p><strong>PMT Groep - Junior Consultant (February 2017 - February 2018)</strong></p><p>For a year I worked as a junior consultant at the sister company of Embrace IT. During this year, I worked at the department of \"Pensioenfonds Metaal en Techniek\" (PMT) that was responsible for the payment of pensions. Some of my tasks there consisted of writing hand-made and automated letters and e-mails to our pension holders. I also worked on process descriptions and various administrative tasks.</p>",
  "<p><strong>CSV Ichthus Rotterdam - Treasurer (July 2015 - June 2016)</strong></p><p>As the treasurer of this small organisation, I was primarily responsible for all finance related activities (book keeping, collecting automated payments etc).</p>",
  "<p><strong>Wybenga Advocaten - Legal Intern (May 2015 - June 2015)</strong></p><p>During this period, I primarily worked on legal research for the various cases of the law firm. I also attended several court sessions.</p>"
]

const education = [
  "<p><strong>Embrace IT - Web development traineeship</strong></p><p>March - April 2018</p>",
  "<p><strong>Erasmus University Rotterdam - LLM Health Law</strong></p><p>September 2014 - August 2016</p>",
  "<p><strong>Erasmus University Rotterdam - LLB Dutch Law</strong></p><p>September 2011 - August 2014</p>"
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
  "Agile&nbsp;/&nbsp;Scrum",
  "Git",
  "Jira"
]

const interests = [
  "Music&nbsp;and&nbsp;guitar",
  "Audio&nbsp;production",
  "Film",
  "Video&nbsp;Games"
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
let portfolioAlreadyLoaded = false

const cvTab = document.getElementById("tab-cv")
const portfolioTab = document.getElementById("tab-portfolio")
portfolioTab.addEventListener("click", loadPortfolio)
cvTab.addEventListener("click", loadCV)

function loadPortfolio(){
  cvBody.innerHTML = ""
  if (!portfolioAlreadyLoaded){
    portfolioAlreadyLoaded = true
    portfolioBody.appendChild(portfolioBodyBackup)
  }
  else {
    portfolioBody.appendChild(portfolioBodyBackup)
  }
}

function loadCV(){
  // portfolioBodyBackup = portfolioBody.innerHTML
  portfolioBody.innerHTML = ""
  cvBody.innerHTML = cvBodyBackup
}

/* Functions for creating divs for content of CV with correct id
(respectively Work experience, skills etc and Embrace, PMT, Wybenga etc)*/
function createSections(){
const elements = []
  for (let section of cvContent){
    const sectionElement = document.createElement("div")
    const sectionTitleElement = document.createElement("div")
    
    sectionElement.setAttribute("id", section)
    // sectionElement.setAttribute("class", "section")
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
  
  //Insert Core Qualities
  for (let i = 0, leng = coreQualities.length; i < leng; i++){
  const qualDiv = document.getElementById("Core Qualities")
  const qualities = createSubSection(i,coreQualities)
  qualities.setAttribute("class", "card")
  qualities.setAttribute("id", "qualities")
  qualDiv.appendChild(qualities)
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
    interest.setAttribute("id", "interest")
    interestsDiv.appendChild(interest)
  }

  //Insert Profiles
  for (let i = 0, leng = profiles.length; i < leng; i++){
    const profilesDiv = document.getElementById("Profiles")
    const profile = createSubSection(i,profiles)
    profile.setAttribute("class", "smallCard profileCard")
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
