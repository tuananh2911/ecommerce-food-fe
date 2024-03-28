pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Pull Code') {
            steps {
                sh 'git clone https://github.com/tuananh2911/ecommerce-food-fe.git'
            }
        }

        stage('Build') {
            steps {
                sh 'docker build -t my-react-app .'
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker compose down'
                sh 'docker compose up -d --build'
            }
        }
    }

    post {
        always {
            sh 'docker system prune -af --volumes'
        }
    }
}