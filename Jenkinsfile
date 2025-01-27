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
                    if (isUnix()) {
                            sh 'export DB_HOST=${DB_HOST}'
                            sh 'export DB_PORT=${DB_PORT}'
                            sh 'export DB_NAME=${DB_NAME}'
                            sh 'export DB_USER=${DB_USER}'
                            sh 'export DB_PASS=${DB_PASS}'
                        } else {
                            bat 'set DB_HOST=${DB_HOST}'
                            bat 'set DB_PORT=${DB_PORT}'
                            bat 'set DB_NAME=${DB_NAME}'
                            bat 'set DB_USER=${DB_USER}'
                            bat 'set DB_PASS=${DB_PASS}'
                        }
                }
            }
        }
        stage("Stop"){
            steps{
                script {
                    if (isUnix()) {
                        sh 'pm2 stop back'
                    } else {
                        bat 'pm2 stop back'
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
                        sh 'cp -r ./* /c/sites/IngresoEstudiantesBack/'
                    } else {
                        bat 'rmdir /s /q c:\\sites\\IngresoEstudiantesBack'
                        bat 'mkdir c:\\sites\\IngresoEstudiantesBack'
                        bat 'xcopy . c:\\sites\\IngresoEstudiantesBack /s /e'
                    }
                }
            }
        }
        stage("Start"){
            steps{
                script {
                    if (isUnix()) {
                        sh 'pm2 start /c/sites/IngresoEstudiantesBack/dist/main.js --name=back'
                    } else {
                        bat 'pm2 start /sites/IngresoEstudiantesBack/dist/main.js --name=back'
                    }
                }
            }
        }
    }
}