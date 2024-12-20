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
                        apiPipeline.runPipeline(env.BRANCH_NAME)
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
                        appPipeline.runPipeline(env.BRANCH_NAME)
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