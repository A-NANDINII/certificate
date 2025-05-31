pipeline {
    agent any

    environment {
        // Load credentials from Jenkins
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub-credentials')
        EMAIL_CREDENTIALS = credentials('email-credentials')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                script {
                    // Build and push Docker images
                    docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
                        dir('backend') {
                            def backendImage = docker.build("${env.DOCKER_HUB_CREDENTIALS_USR}/certificate-generator-backend:latest")
                            backendImage.push()
                        }
                        dir('frontend') {
                            def frontendImage = docker.build("${env.DOCKER_HUB_CREDENTIALS_USR}/certificate-generator-frontend:latest")
                            frontendImage.push()
                        }
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh 'docker-compose down'
                    sh 'docker-compose up -d'
                }
            }
        }
    }

    post {
        always {
            cleanWs()  // Now properly wrapped in node context
        }
    }
}