pipeline{
    agent any
    environment {
        DB_HOST = credentials('DB_HOST')
        DB_PORT = credentials('DB_PORT')
        DB_NAME = credentials('DB_NAME')
        DB_USER = credentials('DB_USER')
        DB_PASS = credentials('DB_PASS')
    }
    stages{
    	stage("Export secrets"){
            steps{
                script {
                    sh 'export DB_HOST=${DB_HOST}'
                    sh 'export DB_PORT=${DB_PORT}'
                    sh 'export DB_NAME=${DB_NAME}'
                    sh 'export DB_USER=${DB_USER}'
                    sh 'export DB_PASS=${DB_PASS}'
                }
            }
        }
        stage("Stop"){
            steps{
                script {
                    sh 'pm2 stop pia_backend 2> /dev/null'
                }
            }
        }
        stage("Build"){
            steps{
                script {
                    sh 'npm i'
                    sh 'npm run build'
                }
            }
        }
        stage("Copy"){
            steps{
                script {
                    sh 'cp -r ./dist/* ~/shared/nginx/api'
                }
            }
        }
        stage("Start"){
            steps{
                script {
                    sh 'pm2 start ~/shared/nginx/api/main.js --name=pia_backend'
                }
            }
        }
    }
}