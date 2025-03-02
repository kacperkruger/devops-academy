def String deployStatus = 'FAILURE'

pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Execute Board Games API Pipeline') {
            when {
                changeset "BoardGamesApi/**"
            }
            steps {
                dir('BoardGamesApi') {
                    script {
                        def apiPipeline = load 'Jenkinsfile'

                        withChecks('Run API Pipeline') {
                            apiPipeline.runPipeline(env.BRANCH_NAME)
                        }
                    }
                }
            }
        }
        stage('Execute Board Games App Pipeline') {
            when {
                changeset "BoardGamesApp/**"
            }
            steps {
                dir('BoardGamesApp') {
                    script {
                        def appPipeline = load 'Jenkinsfile'
                        withChecks('Run App Pipeline') {
                            appPipeline.runPipeline(env.BRANCH_NAME)
                        }
                    }
                }
            }
        }
        stage('Execute Reverse Proxy Pipeline') {
            when {
                changeset "ReverseProxy/**"
            }
            steps {
                dir('ReverseProxy') {
                    script {
                        def reverseProxyPipeline = load 'Jenkinsfile'
                        reverseProxyPipeline.runPipeline(env.BRANCH_NAME)
                    }
                }
            }
        }
        stage('Deploy to k8s') {
            when {
                anyOf {
                    branch 'main'
                    branch 'develop'
                    branch 'staging'
                }
            }
            steps {
                dir('k8s') {
                    emailext(body: 'Deployment started on environment: ' + branchName.toUpperCase(), subject: 'Deployment started', to: 'kacper.kruger1@gmail.com')
                    catchError {
                        script {
                            def deployPipeline = load 'Jenkinsfile'
                            deployPipeline.runPipeline(env.BRANCH_NAME)
                            deployStatus = 'SUCCESS'
                        }
                    }
                    emailext(body: 'Deployment finished with ' + deployStatus + ' status on environment: ' + branchName.toUpperCase(), subject: 'Deployment finished', to: 'kacper.kruger1@gmail.com')
                }
            }
        }
    }
    post {
        always {
            cleanWs()
        }
        success {
            echo 'STATUS: Success'
        }
        failure {
            echo 'STATUS: Failure'
        }
    }
}
