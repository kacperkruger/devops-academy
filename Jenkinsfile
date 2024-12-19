pipeline {
    scmVars = checkout scm

    withEnv(["BRANCH_NAME=${scmVars.GIT_BRANCH}"]) {
        load("BoardGamesApi/Jenkinsfile")
        load("BoardGamesApp/Jenkinsfile")
        load("ReverseProxy/Jenkinsfile")
    }
}