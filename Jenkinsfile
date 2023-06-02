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
        stage("Copy"){
            steps{
                script {
                    if (isUnix()) {
                        sh 'rm -rf /c/sites/IngresoEstudiantesBack/*'
                        sh 'cp -r dist/* /c/sites/IngresoEstudiantesBack/'
                    } else {
                        bat 'rmdir /s /q c:\\sites\\IngresoEstudiantesBack'
                        bat 'mkdir c:\\sites\\IngresoEstudiantesBack'
                        bat 'xcopy dist c:\\sites\\IngresoEstudiantesBack /s /e'
                    }
                }
            }
        }
        stage("Start"){
            steps{
                script {
                    if (isUnix()) {
                        sh 'pm2 start /c/sites/IngresoEstudiantesBack/main.js'
                    } else {
                        bat 'pm2 start /sites/IngresoEstudiantesBack/main.js'
                    }
                }
            }
        }
    }
}