pipeline {
    agent any

    environment {
        DOCKER_NETWORK = 'react-app-network'
        DOCKER_COMPOSE = 'docker-compose.yml'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Pull Code') {
            steps {
                sh 'git pull'
            }
        }

        stage('Build') {
            steps {
                sh 'docker build -t my-react-app .'
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker network create ${DOCKER_NETWORK} || true'
                sh 'docker compose down'
                sh 'docker compose up -d --build --force-recreate'
            }
        }
    }

    post {
        always {
            sh 'docker system prune -af --volumes'
            sh 'docker network rm ${DOCKER_NETWORK} || true'
        }
    }
}