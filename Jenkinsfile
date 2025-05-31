pipeline {
    agent any
    
    environment {
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub-credentials')
        EMAIL_CREDENTIALS = credentials('email-credentials')
    }
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/yourusername/certificate-generator.git'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }
        
        stage('Test') {
            steps {
                dir('backend') {
                    sh 'npm test'
                }
                dir('frontend') {
                    sh 'npm test'
                }
            }
        }
        
        stage('Build Docker Images') {
            steps {
                script {
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
                sh 'docker-compose down'
                sh 'docker-compose up -d'
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
    }
}