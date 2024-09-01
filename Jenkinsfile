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
                    // sh 'npm install' // npm install을 실행하고 
                    // sh 'CI=false npm run build' // npm run build를 실행한다.
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

        stage('docker initialize1') {
            steps {
                // dir('/cicd/docker') {
                //     echo '########## docker initialize using script in other folder ##########'
                //     sh './reset-all.sh'
                // }
                echo '########## docker initialize using script in other folder ##########'
                sh '/cicd/docker/reset-all.sh'
            }
        }

        stage('docker initialize2') {
            steps {
                echo '########## docker initialize on CI/CD Server ##########'
                // def ret = sh(script: 'docker ps -qa', returnStdout: true)
                // echo ret
                // sh "docker stop ${ret}"
                // sh 'docker stop \$(docker ps -qa)'
                // sh "docker stop $(docker ps -qa)"
                // sh "docker stop \$(docker ps -qa)"

                echo '# 1) Stopping all of the containers (not using anymore)'
                // sh "docker stop \$(docker ps -qa)"

                echo '# 2) Deleting all of the containers (not using anymore)'
                // sh 'docker rm \$(docker ps -qa)'

                echo '# 3) Deleteing all of the images'
                // sh 'docker rmi \$(docker images -qa)'
                // sh "docker rmi $(docker images -qa)"
                // sh "docker rmi \$(docker images -qa)"
                sh 'docker rmi \$(docker images -qa)'

                echo '# 4) Deleteing all of the volumes'
                sh 'docker volume rm \$(docker volume ls -qf dangling=true)'

                echo '# 5) Deleteing all of configurations like network'
                sh 'docker system prune -f'

                echo '# 6) Check results'
                sh 'docker ps -a'
                sh 'docker images'
                sh 'docker volume ls'
                sh 'docker network ls'

                script {
                    // result = sh 'docker ps -qa'
                    // result = sh 'docker images -qa'
                    
                    if (result == null){
                        echo 'result is null'
                        echo 'Skipping initiating docker'
                    }
                    else {
                        // time="2024-08-27T09:05:40+09:00" level=warning msg="The cgroupv2 manager is set to systemd but there is no systemd user session available"
                        // time="2024-08-27T09:05:40+09:00" level=warning msg="For using systemd, you may need to log in using a user session"
                        // time="2024-08-27T09:05:40+09:00" level=warning msg="Alternatively, you can enable lingering with: `loginctl enable-linger 987` (possibly as root)"
                        // 위와 같은 에러코드가 발생하면 젠킨스 서버에 아래의 명령어 실행
                        // loginctl enable-linger 987
                        echo 'result is not null'

                        echo '# 1) Stopping all of the containers (not using anymore)'
                        // sh "docker stop \$(docker ps -qa)"

                        echo '# 2) Deleting all of the containers (not using anymore)'
                        // sh 'docker rm \$(docker ps -qa)'

                        echo '# 3) Deleteing all of the images'
                        sh 'docker rmi \$(docker images -qa)'

                        echo '# 4) Deleteing all of the volumes'
                        sh 'docker volume rm \$(docker volume ls -qf dangling=true)'

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
    }
}