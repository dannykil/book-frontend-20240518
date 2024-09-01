pipeline {
    agent any
    
    tools {
        nodejs "NodeJS-22.7.0" // 여기서 "Node18"은 위에서 설정한 Node.js의 이름입니다.
    }
    
    stages {
        stage('project build') {
            steps {
                dir('./') {
                    echo 'project build'
                    sh 'npm install' // npm install을 실행하고 
                    sh 'CI=false npm run build' // npm run build를 실행한다.
                }
            }
        }

        stage('image build') {
            steps {
                echo 'image build'
            }
        }

        stage('image push') {
            steps {
                echo 'image push'
            }
        }
    }
}