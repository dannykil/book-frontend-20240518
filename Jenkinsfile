pipeline {
    agent any
    
    tools {
        nodejs "NodeJS-22.7.0" // 여기서 "Node18"은 위에서 설정한 Node.js의 이름입니다.
    }
    
    stages {
        stage('clone') {
            steps {
                // git url: "https://github.com/dannykil/book-frontend-20240518.git",
                //     branch: "master"
                    // credentialsId: "$REPOSITORY_CREDENTIAL_ID"
            }
            // post {
            //     success {
            //         echo 'success clone project'
            //     }
            //     failure {
            //         error 'fail clone project' // exit pipeline
            //     }
            // }
        }
        stage('build') {  // react를 빌드하는 코드 적기
            steps {
                dir('./') { // gitlab의 forntend라는 branch에서
                    // sh 'npm install' // npm install을 실행하고 
                    // sh 'CI=false npm run build' // npm run build를 실행한다.
                }
            }
        }
        stage('container build and deploy') {
            steps {
                dir('./') {
                    // sh 'sudo ./deploy_container_frontend.sh'
                }
            }
        }
    }
}