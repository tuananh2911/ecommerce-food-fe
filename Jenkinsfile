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
                sh 'ssh -i key root@143.198.222.68'
                sh 'git pull origin develop'
            }
        }

        stage('Build') {
            steps {
                sh 'cd ecommerce-food-fe '
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