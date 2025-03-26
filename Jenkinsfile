pipeline {
    agent any


    stages {
      
        stage('Deploy') {
            agent{
                docker{
                    image 'amazon/aws-cli'
                    reuseNode true
                    args ' --entrypoint=""'
                }
            }
            steps {
                withCredentials([usernamePassword(credentialsId: 'my-Cloud-Computing-S3', passwordVariable: 'AWS_SECRET_ACCESS_KEY', usernameVariable: 'AWS_ACCESS_KEY_ID')]) {
              
                    sh '''
                        aws --version
                        aws s3 ls 
                        echo "Hello S3" > index.html
                        aws s3 cp index.html s3://myjenkinsapp-20250325/index.html
                     '''
                }
            }
        }
    }
}
