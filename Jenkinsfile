pipeline{
    agent any
    environment {
        DB_HOST = credentials('DB_HOST')
    }
    stages{
    	stage("Export secrets"){
            steps{
                script {
                    if (isUnix()) {
                        sh 'export DB_HOST=${DB_HOST}'
                    } else {
                        bat 'set DB_HOST=${DB_HOST}'
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