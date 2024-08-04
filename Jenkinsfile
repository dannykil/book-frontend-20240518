pipeline {
    agent any
    
    tools {
        nodejs "NodeJS22" // 여기서 "Node18"은 위에서 설정한 Node.js의 이름입니다.
    }
    
    stages {
        

        stage('React build') {  // react를 빌드하는 코드 적기
            steps {
                dir('frontend') { // gitlab의 forntend라는 branch에서
                    echo 'React build' // React build라 부르겠다.
                    sh 'npm install' // npm install을 실행하고 
                    sh 'CI=false npm run build' // npm run build를 실행한다.
                }
            }
        }

        // stage('Dockerimage build') {
        //     steps {
        //         dir('frontend') {
        //             sh ''' 
        //             echo 'Dockerimage build for React' // Dockerimage build for react라고 부르겠다.
        //             docker build -t docker-react:0.0.1 . // docker-react:0.0.1이라는 이름으로 빌드하겟다.
        //             '''
        //         }
        //     }
        // }

        // stage('Deploy') {
        //     steps {
        //         sh '''
        //         echo 'Deploy React' // 배포
                
        //         // 최초 처음에 터미널에서 run한번 해줘야해 그 다음부터는 빌드할때마다 자동으로 멈추고 재실행 반복해줌 
		// 		// docker run -d -p 8080:8080 --name react docker-react:0.0.1

                
        //         docker stop react
        //         docker rm react
        //         docker run -d -p 3000:3000 --name react docker-react:0.0.1 

        //         '''
        //     }
        // }
    }
}