/*
TODO:
- Some sort of canvas element that interacts with the mouse cursor;
- Generating all html elements with content.
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
            "<p><strong>Erasmus University Rotterdam - LLM Health Law</strong></p><p>September 2015 - August 2016</p>",
            "<p><strong>Erasmus University Rotterdam - LLB Dutch Law</strong></p><p>September 2011 - August 2015</p>"
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
            "Agile&nbsp;/&nbsp;Scrum",
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
gitHubRepositories = []

//Helper function for building elements
function makeNewDivElement(section){
    const newDivElement = document.createElement("div")
    if (section.length < 15){
        newDivElement.setAttribute("class", "col-xs-12 col-sm-6 col-md-6 col-lg-6 card")
    }
    else{
        newDivElement.setAttribute("class", "col-xs-12 col-sm-6 col-md-6 col-lg-6 card") //Change values of BS classes here!
    }
    return newDivElement
}

//Function for adding new sections to HTML
function addSection(sectionObject){
    const elementDiv = document.getElementById(sectionObject.sectionName)
        for (let section of sectionObject.sectionArray){
            const newSection = makeNewDivElement(section)
            newSection.innerHTML = section
            elementDiv.appendChild(newSection)
        }
}

//Fetch API fot Github (recycled from last version of myCV)
(function getGitRepos(){
    const gitURL = "https://api.github.com/users/DeBasLightyear/repos"
    // let gitHubRepositories = []

    //Fetching all repos from Github
    fetch(gitURL)
        .then(response => response.json())
        .then(repoArrayBig => {
            for (let repo of repoArrayBig){
                makeRepoObject(repo)
            }
        })

    //Function for building an object for each GitHub repo
    function makeRepoObject(repo){
        
        //First, extract properties from large fetched object and add those to new small object
        function repoObject(name, language, url, description, creationDate){
            this.name = name
            this.langauge = language
            this.url = url
            this.description = description
            this.creationDate = creationDate
        }
        
        //Second, add new smaller object into the array that holds all repos from Github
        gitHubRepositories.push(new repoObject(
            repo.name,
            repo.language,
            repo.url,
            repo.description,
            repo.creationDate))                    
    }
})();

//Function for building all HTML (except the GitHub repos)
(function addAllSections(){
    for (let section of allSections){
        addSection(section)
    }
})();