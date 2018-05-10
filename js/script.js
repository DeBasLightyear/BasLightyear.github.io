/*
TODO:
- Building dynamic HTML using the fetch API's of LinkedIn and Github;
- Some sort of canvas element that interacts with the mouse cursor;
*/


//Fetch API fot Github (recycled from last version of myCV)
function getGitRepos(){
    const gitURL = "https://api.github.com/users/DeBasLightyear/repos"
    let repoArraySmall = []

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
        
        //Second, add new small object into the array that holds all repos from Github
        repoArraySmall.push(new repoObject(repo.name, repo.language, repo.url,
                            repo.description, repo.creationDate))                    
    }

}