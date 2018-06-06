/*
TODO:
- Some sort of canvas element that interacts with the mouse cursor;
- Pick a nice color palette;
- Assigning elements random colors of palette;
- Add subtle background image maybe;
- Implements code for uneven numbered elements in array;
- Change hyperlink in repos; it currently leads to a JSON object;
- Fix fixed scrolling;
*/
const allSections = [
    coreQualities = {
        sectionName : "coreQualities",
        sectionArray: [
            "core quality 1",
            "core quality 2",
            "core quality 3",
            "core quality 4",
        ]
    },
    workExperience = {
        sectionName : "workExperience",
        sectionArray: [
            "<p><strong>Embrace IT - Junior Software Engineer (March 2018 - present day)</strong></p><p>This traineeship started in March 2018 with a month long course in web development and software testing. The most important goals of the traineeship were learning to program in JavaScript in combination with Jquery, HTML, CSS and Bootstrap. The goal of this first month of training was learning a strong basis for various programming languages using modern code design and unit testing</p>",
            "<p><strong>PMT Groep - Junior Consultant (February 2017 - February 2018)</strong></p><p>For a year I worked as a junior consultant at the sister company of Embrace IT. During this year, I worked at the department of \"Pensioenfonds Metaal en Techniek\" (PMT) that was responsible for the payment of pensions. Some of my tasks there consisted of writing hand-made and automated letters and e-mails to our pension holders. I also worked on process descriptions and various administrative tasks.</p>",
            "<p><strong>CSV Ichthus Rotterdam - Treasurer (July 2015 - June 2016)</strong></p><p>As the treasurer of this small organisation, I was primarily responsible for all finance related activities (book keeping, collecting automated payments etc).</p>",
            "<p><strong>Wybenga Advocaten - Legal Intern (May 2015 - June 2015)</strong></p><p>During this period, I primarily worked on legal research for the various cases of the law firm. I also attended several court sessions.</p>"
        ]
    },
    education = {
        sectionName : "education",
        sectionArray: [
            "<p><strong>Embrace IT - Web development traineeship</strong></p><p>March - April 2018</p>",
            "<p><strong>Erasmus University Rotterdam - LLM Health Law</strong></p><p>September 2014 - August 2016</p>",
            "<p><strong>Erasmus University Rotterdam - LLB Dutch Law</strong></p><p>September 2011 - August 2014</p>"
        ]
    },
    certificates = {
        sectionName : "certificates",
        sectionArray: [
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
    },
    madSkills = {
        sectionName : "skills",
        sectionArray: [
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
    },
    interests = {
        sectionName : "interests",
        sectionArray: [
            "Music&nbsp;and&nbsp;guitar",
            "Audio&nbsp;production",
            "Film",
            "Video&nbsp;Games"
        ]
    },
    profiles = {
        sectionName : "profiles",
        sectionArray: [
            "<a href=\"https://www.linkedin.com/in/bas-kleisen-610614122/\" target=\"_blank\">LinkedIn</a>",
            "<a href=\"https://github.com/DeBasLightyear\" target=\"_blank\">GitHub</a>"
        ]
    },
]
const allRepos = [
    gitHubRepositories = {
        sectionName : "gitHub",
        sectionArray: []
    }
]
//Function for picking random colors out of predefined set
function pickRandomColor(){
    const palette = ['red','purple','blue','cyan'] //PICK BETTER COLORS
    const randomNumber = Math.floor(Math.random() * palette.length)
    return palette[randomNumber]
}

//Helper function for detecting uneven numbers of elements
function isSectionEven(section){
    console.log(section, section.length % 2 === 0)
    return section.length % 2 === 0
}

//Helper function for building elements
function makeNewDivElement(section){
    const newDivElement = document.createElement("div")
    const smallCard = "col-xs-12 col-sm-6 col-md-6 col-lg-6 text-center smallCard"
    const bigCard = "col-xs-12 col-sm-6 col-md-6 col-lg-6 bigCard"
    
    //When section is small or a link: make small card
    if (section.length < 50 || section.slice(0, 7) === "<a href" ){
        newDivElement.setAttribute("class", smallCard)
    }
    else{
        newDivElement.setAttribute("class", bigCard)
    }
    return newDivElement
}

//Functions for adding new sections to HTML
function addSection(sectionObject){
    const elementDiv = document.getElementById(sectionObject.sectionName)
    function makeDiv(section){
        const newSection = makeNewDivElement(section)
                const centerDiv = document.createElement("div")
                centerDiv.setAttribute("class", "centerDiv")
                centerDiv.innerHTML = section
                newSection.appendChild(centerDiv)
                elementDiv.appendChild(newSection)
    }
        if(isSectionEven(sectionObject.sectionArray)){
            for (let section of sectionObject.sectionArray){
                makeDiv(section)
            }
        }
        else{
            const leng = sectionObject.sectionArray.length
            for (let i = 0; i < leng -1; i++){
                    console.log(sectionObject.sectionArray[i])
                    makeDiv(sectionObject.sectionArray[i])
                }
            makeDiv(sectionObject.sectionArray[leng-1])
        }
}                 

//Fetch API fot Github (recycled from last version of myCV)
(function getGitRepos(){
    const gitURL = "https://api.github.com/users/DeBasLightyear/repos"

    //Fetching all repos from Github
    fetch(gitURL)
        .then(response => response.json())
        .then(repoArray => {
            for (let repo of repoArray){
                makeRepoObject(repo)
            }
        })
        .then(repoArray => addSectionsInObject(allRepos))

    //Function for adding each repo to the array in the object that holds all repos
    function makeRepoObject(repo){
    const newRepo = `<h1><a href=\"${repo.url}\" target=\"_blank\">${repo.name}</a></h1>Language: ${repo.langauge}<br>Description: ${repo.description}`
    allRepos[0].sectionArray.push(newRepo)    
    }
})()

//Function for building all HTML (except the GitHub repos)
function addSectionsInObject(object){
    for (let section of object){
        addSection(section)
    }
}
addSectionsInObject(allSections)
