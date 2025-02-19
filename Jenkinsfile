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
                dir('k8s/' + env.BRANCH_NAME) {
                    withCredentials([string(credentialsId: 'new_minikube_token', variable: 'api_token')]) {
                        sh 'docker run bitnami/kubectl:1.32.2 --token $api_token --server https://192.168.49.2:8443  --insecure-skip-tls-verify=true apply -f .'
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
