pipeline {
    agent any
    
    tools {
        nodejs "NodeJS-22.7.0" // 여기서 "Node18"은 위에서 설정한 Node.js의 이름입니다.
    }
    
    stages {
        stage('project build') {
            steps {
                dir('./') {
                    echo '########## project build ##########'
                    sh 'npm install' // npm install을 실행하고 
                    sh 'CI=false npm run build' // npm run build를 실행한다.
                }
            }
        }

        stage('image build') {
            steps {
                echo '########## image build ##########'
                // sh 'docker build -t dannielkil/book-frontend .'
            }
        }

        stage('image push') {
            steps {
                echo '########## image push ##########'
                // sh 'docker push dannielkil/book-frontend'
            }
        }

        stage('docker initialize') {
            steps {
                dir('/root/docker') {
                    echo '########## docker initialize using script in other folder ##########'
                    sh './reset-all.sh'
                }
            }
        }

        stage('docker initialize') {
            steps {
                echo '########## docker initialize on CI/CD Server ##########'
                echo '# 1) Stopping all of the containers'
                sh 'docker stop $(docker ps -qa)'

                echo '# 2) Deleting all of the containers'
                sh 'docker rm $(docker ps -qa)'

                echo '# 3) Deleteing all of the images'
                sh 'docker rmi $(docker images -qa)'

                echo '# 4) Deleteing all of the volumes'
                sh 'docker volume rm $(docker volume ls -qf dangling=true)'

                echo '# 5) Deleteing all of configurations like network'
                sh 'docker system prune -f'

                echo '# 6) Check results'
                sh 'docker ps -a'
                sh 'docker images'
                sh 'docker volume ls'
                sh 'docker network ls'
            }
        }
    }
}