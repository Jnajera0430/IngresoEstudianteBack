pipeline{
    agent any
    environment {
        DB_NAME = credentials('DB_NAME')
    }
    stages{
    	stage("Export secrets"){
            steps{
                script {
                    if (isUnix()) {
                        sh 'export DB_NAME=${DB_NAME}'
                    } else {
                        bat 'set DB_NAME=${DB_NAME}'
                    }
                }
            }
        }
        stage("Build"){
            steps{
                script {
                    if (isUnix()) {
                        sh 'npm i'
                        sh 'npm run build'
                    } else {
                        bat 'npm i'
                        bat 'npm run build'
                    }
                }
            }
        }
    }
}